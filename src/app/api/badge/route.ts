import { makeBadge, ValidationError } from 'badge-maker';

/**
 * Badge configuration interface
 */
interface BadgeOptions {
  label: string;
  message: string;
  color: string;
  style?: 'flat' | 'flat-square' | 'plastic';
  labelColor?: string;
}

/**
 * Custom Badge Generator
 * 
 * This endpoint generates a custom SVG badge with user-specified parameters.
 * 
 * @param {Request} request - The incoming HTTP request
 * @returns {Response} SVG badge or error response
 */
export async function GET(request: Request) {
  try {
    // Parse request parameters
    const url = new URL(request.url);
    const label = url.searchParams.get('label');
    const message = url.searchParams.get('message');
    const color = url.searchParams.get('color') || 'blue';
    const style = url.searchParams.get('style') || 'flat';
    const labelColor = url.searchParams.get('labelColor');
    
    // Validate required parameters
    if (!label || !message) {
      return new Response('Missing required parameters: label and message are required', { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
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

    // Generate badge options
    const badgeOptions: BadgeOptions = {
      label,
      message,
      color,
      style: style as 'flat' | 'flat-square' | 'plastic'
    };
    
    // Add optional parameters if provided
    if (labelColor) {
      badgeOptions.labelColor = labelColor;
    }
    
    // Generate badge
    const svg = makeBadge(badgeOptions);

    // Return SVG with appropriate headers
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=604800', // Cache for 1 day, CDN cache for 1 week
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