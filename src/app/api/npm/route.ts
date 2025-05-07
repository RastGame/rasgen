import { makeBadge, ValidationError } from 'badge-maker';

/**
 * NPM package data interface
 */
interface NPMPackageData {
  'dist-tags'?: {
    latest?: string;
    [key: string]: string | undefined;
  };
  license?: string;
  name?: string;
  description?: string;
  version?: string;
  homepage?: string;
  repository?: {
    type?: string;
    url?: string;
  };
  [key: string]: any;
}

/**
 * NPM downloads data interface
 */
interface NPMDownloadsData {
  downloads: number;
  start: string;
  end: string;
  package: string;
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
 * NPM Badge Generator
 * 
 * This endpoint generates badges based on NPM package data.
 * 
 * @param {Request} request - The incoming HTTP request
 * @returns {Response} SVG badge or error response
 */
export async function GET(request: Request) {
  try {
    // Parse request parameters
    const url = new URL(request.url);
    const packageName = url.searchParams.get('package');
    const type = url.searchParams.get('type') || 'version';
    const style = url.searchParams.get('style') || 'flat';
    const period = url.searchParams.get('period') || 'month'; // For downloads: day, week, month, year
    
    // Validate required parameters
    if (!packageName) {
      return new Response('Missing required parameter: package', { 
        status: 400,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
    
    // Validate style parameter
    const validStyles = ['flat', 'flat-square', 'plastic'];
    if (!validStyles.includes(style)) {
      return new Response(`Invalid style parameter. Must be one of: ${validStyles.join(', ')}`, { 
        status: 400,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
    
    // Validate period parameter for downloads
    if (type === 'downloads') {
      const validPeriods = ['day', 'week', 'month', 'year'];
      if (!validPeriods.includes(period)) {
        return new Response(`Invalid period parameter. Must be one of: ${validPeriods.join(', ')}`, { 
          status: 400,
          headers: {
            'Content-Type': 'text/plain'
          }
        });
      }
    }
    
    // Fetch data from NPM registry
    const apiUrl = `https://registry.npmjs.org/${encodeURIComponent(packageName)}`;
    
    try {
      const res = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Rasgen-Badge-Generator'
        },
        signal: AbortSignal.timeout(5000),
        next: { revalidate: 3600 } // Revalidate cache every hour
      });
      
      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        console.error(`NPM API error (${res.status}): ${errorText}`);
        return new Response(`NPM API error: ${res.status}`, { 
          status: res.status,
          headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-store'
          }
        });
      }
      
      const data: NPMPackageData = await res.json();
      
      // Determine badge content based on type
      let label = '';
      let message = '';
      let color = 'blue';
      
      switch (type) {
        case 'version':
          label = 'npm';
          message = data['dist-tags']?.latest || data.version || 'unknown';
          color = 'blue';
          break;
          
        case 'license':
          label = 'license';
          message = data.license || 'unknown';
          color = 'green';
          break;
          
        case 'downloads':
          // For downloads, we need to make another API call
          const periodMap: Record<string, string> = {
            'day': 'last-day',
            'week': 'last-week',
            'month': 'last-month',
            'year': 'last-year'
          };
          
          const downloadsUrl = `https://api.npmjs.org/downloads/point/${periodMap[period]}/${encodeURIComponent(packageName)}`;
          
          try {
            const downloadsRes = await fetch(downloadsUrl, {
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'Rasgen-Badge-Generator'
              },
              signal: AbortSignal.timeout(5000),
              next: { revalidate: 3600 } // Revalidate cache every hour
            });
            
            if (downloadsRes.ok) {
              const downloadsData: NPMDownloadsData = await downloadsRes.json();
              label = `downloads/${period}`;
              message = formatNumber(downloadsData.downloads || 0);
              color = 'brightgreen';
            } else {
              label = `downloads/${period}`;
              message = 'unknown';
              color = 'gray';
            }
          } catch (error) {
            console.error('Error fetching NPM downloads:', error);
            label = `downloads/${period}`;
            message = 'error';
            color = 'red';
          }
          break;
          
        case 'node':
          // Extract Node.js version from package.json engines field
          const nodeVersion = data.engines?.node || 'unknown';
          label = 'node';
          message = nodeVersion;
          color = 'green';
          break;
          
        case 'type':
          // Check if package has TypeScript definitions
          const hasTypes = data.types || data.typings || 
                          (data.dependencies && (data.dependencies['@types/react'] || 
                                               data.dependencies['typescript'])) ||
                          (data.devDependencies && (data.devDependencies['@types/react'] || 
                                                  data.devDependencies['typescript']));
          label = 'types';
          message = hasTypes ? 'TypeScript' : 'JavaScript';
          color = hasTypes ? 'blue' : 'yellow';
          break;
          
        default:
          label = type;
          message = 'unknown';
          color = 'gray';
      }
      
      // Generate badge
      const badgeOptions: BadgeOptions = {
        label,
        message,
        color,
        style: style as 'flat' | 'flat-square' | 'plastic'
      };
      
      const svg = makeBadge(badgeOptions);
      
      // Return SVG with appropriate headers
      return new Response(svg, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400', // Cache for 1 hour, CDN cache for 1 day
          'Access-Control-Allow-Origin': '*'
        }
      });
      
    } catch (error) {
      console.error('Error fetching NPM data:', error);
      return new Response('Failed to fetch NPM data', { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-store'
        }
      });
    }
    
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

/**
 * Helper function to format large numbers
 * 
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return String(num);
}