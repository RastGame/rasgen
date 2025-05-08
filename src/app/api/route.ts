import { NextResponse } from "next/server";

/**
 * API Documentation endpoint
 *
 * This endpoint provides comprehensive documentation for the Rasgen API,
 * including all available endpoints, their parameters, and usage examples.
 *
 * @returns {NextResponse} JSON response with API documentation
 */
export async function GET() {
  const baseUrl =
    process.env.API_URL || "https://rasgen.vercel.app";

  return NextResponse.json(
    {
      name: "Rasgen Badge API",
      version: "1.1.0", 
      description:
        "API for generating SVG badges for GitHub repositories, NPM packages, and other services",
      baseUrl,
      endpoints: [
        {
          path: "/api/badge",
          description: "Generate a custom badge with specified parameters",
          method: "GET",
          parameters: [
            {
              name: "label",
              type: "string",
              required: true,
              description: "The text on the left side of the badge",
            },
            {
              name: "message",
              type: "string",
              required: true,
              description: "The text on the right side of the badge",
            },
            {
              name: "color",
              type: "string",
              required: false,
              default: "blue",
              description:
                'The color of the right side of the badge (e.g., "blue", "green", "red", "orange", "yellow", "purple", "pink", "grey")',
            },
            {
              name: "style",
              type: "string",
              required: false,
              default: "flat",
              description:
                'The style of the badge (e.g., "flat", "flat-square", "plastic")',
            },
          ],
          example: `${baseUrl}/api/badge?label=build&message=passing&color=green`,
        },
        {
          path: "/api/github",
          description: "Generate badges based on GitHub repository data",
          method: "GET",
          parameters: [
            {
              name: "repo",
              type: "string",
              required: true,
              description: 'GitHub repository in format "username/repo"',
            },
            {
              name: "type",
              type: "string",
              required: false,
              default: "stars",
              description: "Type of badge to generate",
              options: ["stars", "forks", "issues", "license"],
            },
          ],
          example: `${baseUrl}/api/github?repo=facebook/react&type=stars`,
        },
        {
          path: "/api/npm",
          description: "Generate badges for NPM packages",
          method: "GET",
          parameters: [
            {
              name: "package",
              type: "string",
              required: true,
              description: "NPM package name",
            },
            {
              name: "type",
              type: "string",
              required: false,
              default: "version",
              description: "Type of badge to generate",
              options: ["version", "downloads", "license"],
            },
          ],
          example: `${baseUrl}/api/npm?package=react&type=version`,
        },
        {
          path: "/api/yurba",
          description: "Generate badges showing online users in Yurba dialogs",
          method: "GET",
          parameters: [
            {
              name: "dialog_id",
              type: "string",
              required: true,
              description: "Yurba dialog ID",
            },
          ],
          example: `${baseUrl}/api/yurba?dialog_id=123456`,
          note: "Requires YURBA_TOKEN environment variable to be set",
        },
      ],
      usage: {
        markdown:
          "![Badge Example](https://rasgen.vercel.app/api/badge?label=example&message=badge)",
        html: '<img src="https://rasgen.vercel.app/api/badge?label=example&message=badge" alt="Badge Example">',
        shields: "Compatible with shields.io URL format",
      },
      rateLimit: {
        limit: "100 requests per minute",
        note: "Excessive usage may be rate-limited",
      },
      documentation: "/docs",
      repository: "https://github.com/yourusername/rasgen-badge",
      license: "MIT",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
