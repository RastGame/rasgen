import { makeBadge, ValidationError } from 'badge-maker';

/**
 * GitHub repository data interface
 */
interface GitHubRepoData {
  stargazers_count?: number;
  forks_count?: number;
  open_issues_count?: number;
  license?: {
    spdx_id?: string;
    name?: string;
  };
  watchers_count?: number;
  subscribers_count?: number;
  default_branch?: string;
  language?: string;
  [key: string]: unknown;
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
 * GitHub Badge Generator
 * 
 * This endpoint generates badges based on GitHub repository data.
 * 
 * @param {Request} request - The incoming HTTP request
 * @returns {Response} SVG badge or error response
 */
export async function GET(request: Request) {
  try {
    // Parse request parameters
    const url = new URL(request.url);
    const repo = url.searchParams.get('repo');
    const type = url.searchParams.get('type') || 'stars';
    const style = url.searchParams.get('style') || 'flat';
    
    // Validate required parameters
    if (!repo) {
      return new Response('Missing required parameter: repo', { 
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
    
    // Fetch data from GitHub API
    const apiUrl = `https://api.github.com/repos/${repo}`;
    
    try {
      // Get GitHub token from environment if available
      const githubToken = process.env.GITHUB_TOKEN;
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Rasgen-Badge-Generator'
      };
      
      // Add authorization if token is available
      if (githubToken) {
        headers['Authorization'] = `token ${githubToken}`;
      }
      
      const res = await fetch(apiUrl, {
        headers,
        signal: AbortSignal.timeout(5000),
        next: { revalidate: 3600 } // Revalidate cache every hour
      });
      
      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        console.error(`GitHub API error (${res.status}): ${errorText}`);
        return new Response(`GitHub API error: ${res.status}`, { 
          status: res.status,
          headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-store'
          }
        });
      }
      
      const data: GitHubRepoData = await res.json();
      
      // Determine badge content based on type
      let label = '';
      let message = '';
      let color = 'blue';
      
      switch (type) {
        case 'stars':
          label = 'stars';
          message = formatNumber(data.stargazers_count || 0);
          color = 'blue';
          break;
        case 'forks':
          label = 'forks';
          message = formatNumber(data.forks_count || 0);
          color = 'green';
          break;
        case 'issues':
          label = 'issues';
          message = formatNumber(data.open_issues_count || 0);
          color = data.open_issues_count && data.open_issues_count > 0 ? 'yellow' : 'brightgreen';
          break;
        case 'license':
          label = 'license';
          message = data.license?.spdx_id || data.license?.name || 'unknown';
          color = 'purple';
          break;
        case 'watchers':
          label = 'watchers';
          message = formatNumber(data.watchers_count || 0);
          color = 'orange';
          break;
        case 'subscribers':
          label = 'subscribers';
          message = formatNumber(data.subscribers_count || 0);
          color = 'yellowgreen';
          break;
        case 'language':
          label = 'language';
          message = data.language || 'unknown';
          color = 'informational';
          break;
        case 'branch':
          label = 'default branch';
          message = data.default_branch || 'main';
          color = 'grey';
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
      console.error('Error fetching GitHub data:', error);
      return new Response('Failed to fetch GitHub data', { 
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