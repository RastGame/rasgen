import { makeBadge, ValidationError } from 'badge-maker';

/**
 * Interface for Yurba Dialog API response
 */
interface DialogData {
  Members?: number;
  Name?: string;
  [key: string]: any;
}

/**
 * Interface for Yurba Member API response
 */
interface MemberData {
  Member?: {
    Online?: {
      Online: boolean;
      LastSeen?: string;
    };
    Name?: string;
    Id?: string;
  };
  [key: string]: any;
}

/**
 * Badge configuration interface
 */
interface BadgeOptions {
  label: string;
  message: string;
  color: string;
  style?: 'flat' | 'flat-square' | 'plastic';
}

/**
 * Yurba Online Users Badge Generator
 * 
 * This endpoint generates an SVG badge showing the number of online users
 * in a specified Yurba dialog.
 * 
 * @param {Request} request - The incoming HTTP request
 * @returns {Response} SVG badge or error response
 */
export async function GET(request: Request) {
  try {
    // Check for environment variable
    const YURBA_TOKEN = process.env.YURBA_TOKEN;
    if (!YURBA_TOKEN) {
      console.error('Environment variable YURBA_TOKEN is not set');
      return new Response('Server configuration error', { status: 500 });
    }

    // Parse request parameters
    const url = new URL(request.url);
    const dialogId = url.searchParams.get('dialog_id');
    const style = url.searchParams.get('style') || 'flat';
    const labelText = url.searchParams.get('label') || 'Online';
    
    if (!dialogId) {
      return new Response('Missing required parameter: dialog_id', { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // 1. Get total members count
    const dialogInfoUrl = `https://api.yurba.one/dialogs/${dialogId}`;
    let totalMembers = 0;
    let dialogName = '';
    
    try {
      const dialogRes = await fetch(dialogInfoUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Token': YURBA_TOKEN
        },
        signal: AbortSignal.timeout(5000)
      });
      
      if (!dialogRes.ok) {
        const errorText = await dialogRes.text().catch(() => 'Unknown error');
        console.error(`Yurba API error (${dialogRes.status}): ${errorText}`);
        return new Response(`Yurba API error: ${dialogRes.status}`, { 
          status: dialogRes.status,
          headers: {
            'Content-Type': 'text/plain'
          }
        });
      }
      
      const dialogData: DialogData = await dialogRes.json();
      totalMembers = dialogData.Members || 0;
      dialogName = dialogData.Name || '';
      
    } catch (error) {
      console.error('Error fetching dialog info:', error);
      return new Response('Failed to fetch dialog info', { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-store'
        }
      });
    }

    // 2. Paginate members with improved error handling
    const pageSize = 20; // Increased page size for efficiency
    let page = 0;
    let allMembers: MemberData[] = [];
    let retryCount = 0;
    const maxRetries = 3;
    
    while (allMembers.length < totalMembers && retryCount < maxRetries) {
      const apiUrl = `https://api.yurba.one/dialogs/${dialogId}/members?page=${page}&pageSize=${pageSize}`;
      
      try {
        const res = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Token': YURBA_TOKEN
          },
          signal: AbortSignal.timeout(5000),
        });
        
        if (!res.ok) {
          retryCount++;
          console.error(`Failed to fetch page ${page}: ${res.status}`);
          
          if (retryCount >= maxRetries) {
            break;
          }
          
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
        
        const data: MemberData[] = await res.json();
        
        if (!Array.isArray(data) || data.length === 0) {
          break;
        }
        
        allMembers = allMembers.concat(data);
        
        if (data.length < pageSize) {
          break;
        }
        
        page++;
        retryCount = 0; // Reset retry counter on success
        
      } catch (error) {
        retryCount++;
        console.error(`Error fetching page ${page}:`, error);
        
        if (retryCount >= maxRetries) {
          break;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // 3. Filter online users with improved logic
    const onlineUsers = allMembers.filter(user => user.Member?.Online?.Online === true);
    const onlineCount = onlineUsers.length;
    
    // Calculate percentage for color determination
    const onlinePercentage = totalMembers > 0 ? (onlineCount / totalMembers) * 100 : 0;
    
    // Determine color based on percentage of online users
    let color = 'brightgreen';
    if (onlinePercentage === 0) {
      color = 'red';
    } else if (onlinePercentage < 25) {
      color = 'orange';
    } else if (onlinePercentage < 50) {
      color = 'yellow';
    } else if (onlinePercentage < 75) {
      color = 'yellowgreen';
    }

    // 4. Generate badge with custom options
    const badgeOptions: BadgeOptions = {
      label: labelText,
      message: String(onlineCount),
      color,
      style: style as 'flat' | 'flat-square' | 'plastic'
    };
    
    const svg = makeBadge(badgeOptions);

    // 5. Return SVG with appropriate headers
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=60, s-maxage=300', // Reduced cache time for more up-to-date data
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.stack : error);
    
    if (error instanceof ValidationError) {
      return new Response(`Invalid badge options: ${error.message}`, { 
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-store'
        }
      });
    }
    
    return new Response('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store'
      }
    });
  }
}