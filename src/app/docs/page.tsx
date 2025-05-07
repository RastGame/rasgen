import Image from "next/image";
import Link from "next/link";
import styles from "./docs.module.css";

export default function Docs() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/rasgen-logo.svg"
            alt="Rasgen logo"
            width={180}
            height={38}
            priority
          />
        </Link>
        <nav className={styles.nav}>
          <Link href="/docs" className={styles.navLinkActive}>Documentation</Link>
          <Link href="/examples" className={styles.navLink}>Examples</Link>
          <a href="https://github.com/yurbaone/badgen" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
            <Image
              src="/github-icon.svg"
              alt="GitHub"
              width={20}
              height={20}
            />
            GitHub
          </a>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>Documentation</h3>
          <ul className={styles.sidebarList}>
            <li className={styles.sidebarItem}>
              <a href="#introduction" className={styles.sidebarLink}>Introduction</a>
            </li>
            <li className={styles.sidebarItem}>
              <a href="#getting-started" className={styles.sidebarLink}>Getting Started</a>
            </li>
            <li className={styles.sidebarItem}>
              <a href="#api-reference" className={styles.sidebarLink}>API Reference</a>
              <ul className={styles.sidebarSublist}>
                <li className={styles.sidebarSubitem}>
                  <a href="#badge-api" className={styles.sidebarSublink}>Badge API</a>
                </li>
                <li className={styles.sidebarSubitem}>
                  <a href="#github-api" className={styles.sidebarSublink}>GitHub API</a>
                </li>
                <li className={styles.sidebarSubitem}>
                  <a href="#npm-api" className={styles.sidebarSublink}>NPM API</a>
                </li>
              </ul>
            </li>
            <li className={styles.sidebarItem}>
              <a href="#styling" className={styles.sidebarLink}>Styling Options</a>
            </li>
            <li className={styles.sidebarItem}>
              <a href="#advanced" className={styles.sidebarLink}>Advanced Usage</a>
            </li>
          </ul>
        </div>

        <div className={styles.content}>
          <section id="introduction" className={styles.section}>
            <h1 className={styles.title}>Rasgen Documentation</h1>
            <p className={styles.description}>
              Rasgen is a simple service for generating badges for your GitHub repositories, documentation, and websites.
              This documentation will help you get started with using Rasgen and provide detailed information about its API.
            </p>
          </section>

          <section id="getting-started" className={styles.section}>
            <h2 className={styles.sectionTitle}>Getting Started</h2>
            <p>
              Using Rasgen is simple. You can create badges by making requests to our API endpoints with the appropriate parameters.
              The basic format for a badge URL is:
            </p>
            <div className={styles.codeBlock}>
              <code>https://rasgen.vercel.app/api/badge?label=LABEL&message=MESSAGE&color=COLOR</code>
            </div>
            <p>
              This will generate a badge with the specified label, message, and color. You can then use this URL in your markdown files,
              HTML pages, or anywhere else you want to display the badge.
            </p>
          </section>

          <section id="api-reference" className={styles.section}>
            <h2 className={styles.sectionTitle}>API Reference</h2>
            <p>
              Rasgen provides several API endpoints for generating different types of badges. Here&apos;s a detailed reference for each endpoint.
            </p>

            <div id="badge-api" className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Badge API</h3>
              <p>
                The Badge API allows you to create custom badges with your own text and colors.
              </p>
              <div className={styles.apiEndpoint}>
                <h4 className={styles.endpointTitle}>Endpoint</h4>
                <code className={styles.endpointUrl}>GET /api/badge</code>
              </div>
              <div className={styles.apiParameters}>
                <h4 className={styles.parametersTitle}>Parameters</h4>
                <table className={styles.parametersTable}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>label</td>
                      <td>string</td>
                      <td>The text on the left side of the badge</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>message</td>
                      <td>string</td>
                      <td>The text on the right side of the badge</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>color</td>
                      <td>string</td>
                      <td>The color of the right side of the badge (e.g., &ldquo;blue&rdquo;, &ldquo;green&rdquo;, &ldquo;red&rdquo;)</td>
                      <td>No (default: "blue")</td>
                    </tr>
                    <tr>
                      <td>style</td>
                      <td>string</td>
                      <td>The style of the badge (e.g., "flat", "flat-square", "plastic")</td>
                      <td>No (default: "flat")</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.apiExample}>
                <h4 className={styles.exampleTitle}>Example</h4>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/badge?label=version&message=v1.0.0&color=blue</code>
                </div>
                <div className={styles.exampleResult}>
                  <Image
                    src="/preview-badge.svg"
                    alt="Example badge"
                    width={96}
                    height={20}
                  />
                </div>
              </div>
            </div>

            <div id="github-api" className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>GitHub API</h3>
              <p>
                The GitHub API allows you to create badges based on GitHub repository data.
              </p>
              <div className={styles.apiEndpoint}>
                <h4 className={styles.endpointTitle}>Endpoint</h4>
                <code className={styles.endpointUrl}>GET /api/github</code>
              </div>
              <div className={styles.apiParameters}>
                <h4 className={styles.parametersTitle}>Parameters</h4>
                <table className={styles.parametersTable}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>repo</td>
                      <td>string</td>
                      <td>GitHub repository in format "username/repo"</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>type</td>
                      <td>string</td>
                      <td>Type of badge (e.g., "stars", "forks", "issues", "license")</td>
                      <td>No (default: "stars")</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.apiExample}>
                <h4 className={styles.exampleTitle}>Example</h4>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/github?repo=yurbaone/badgen&type=stars</code>
                </div>
                <div className={styles.exampleResult}>
                  <p>This will generate a badge showing the number of stars for the yurbaone/badgen repository.</p>
                </div>
              </div>
            </div>

            <div id="npm-api" className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>NPM API</h3>
              <p>
                The NPM API allows you to create badges based on NPM package data.
              </p>
              <div className={styles.apiEndpoint}>
                <h4 className={styles.endpointTitle}>Endpoint</h4>
                <code className={styles.endpointUrl}>GET /api/npm</code>
              </div>
              <div className={styles.apiParameters}>
                <h4 className={styles.parametersTitle}>Parameters</h4>
                <table className={styles.parametersTable}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>package</td>
                      <td>string</td>
                      <td>NPM package name</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>type</td>
                      <td>string</td>
                      <td>Type of badge (e.g., "version", "downloads", "license")</td>
                      <td>No (default: "version")</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.apiExample}>
                <h4 className={styles.exampleTitle}>Example</h4>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/npm?package=react&type=version</code>
                </div>
                <div className={styles.exampleResult}>
                  <p>This will generate a badge showing the latest version of the React package on NPM.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="styling" className={styles.section}>
            <h2 className={styles.sectionTitle}>Styling Options</h2>
            <p>
              Rasgen supports various styling options for badges. You can customize the appearance of your badges using the <code>style</code> parameter.
            </p>
            <div className={styles.stylesGrid}>
              <div className={styles.styleExample}>
                <h4>Flat (default)</h4>
                <Image
                  src="/preview-badge.svg"
                  alt="Flat style badge"
                  width={96}
                  height={20}
                />
                <code>style=flat</code>
              </div>
              <div className={styles.styleExample}>
                <h4>Flat Square</h4>
                <Image
                  src="/preview-badge.svg"
                  alt="Flat square style badge"
                  width={96}
                  height={20}
                />
                <code>style=flat-square</code>
              </div>
              <div className={styles.styleExample}>
                <h4>Plastic</h4>
                <Image
                  src="/preview-badge.svg"
                  alt="Plastic style badge"
                  width={96}
                  height={20}
                />
                <code>style=plastic</code>
              </div>
              <div className={styles.styleExample}>
                <h4>For The Badge</h4>
                <Image
                  src="/preview-badge.svg"
                  alt="For the badge style"
                  width={120}
                  height={28}
                />
                <code>style=for-the-badge</code>
              </div>
            </div>
          </section>

          <section id="advanced" className={styles.section}>
            <h2 className={styles.sectionTitle}>Advanced Usage</h2>
            <p>
              For advanced usage scenarios, you can combine multiple badges or create custom integrations with your own services.
            </p>
            <h3>Custom Integration Example</h3>
            <p>
              If you want to create a badge that updates based on your own API or service, you can create a serverless function
              that fetches data from your service and then redirects to the Rasgen API with the appropriate parameters.
            </p>
            <div className={styles.codeBlock}>
              <pre>
                <code>{`// Example serverless function (Node.js)
export async function handler(event) {
  // Fetch data from your service
  const data = await fetchDataFromYourService();
  
  // Construct Rasgen URL with the data
  const rasgenUrl = \`https://rasgen.vercel.app/api/badge?label=custom&message=\${data.value}&color=blue\`;
  
  // Redirect to Rasgen
  return {
    statusCode: 302,
    headers: {
      Location: rasgenUrl
    }
  };
}`}</code>
              </pre>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="/docs" className={styles.footerLink}>
            Documentation
          </Link>
          <Link href="/api" className={styles.footerLink}>
            API
          </Link>
          <Link href="/examples" className={styles.footerLink}>
            Examples
          </Link>
          <a
            href="https://github.com/yurbaone/badgen"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            GitHub
          </a>
        </div>
        <div className={styles.footerCopyright}>
          © {new Date().getFullYear()} Rasgen. All rights reserved.
        </div>
      </footer>
    </div>
  );
}