import Image from "next/image";
import styles from "./page.module.css";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/rasgen-logo.svg"
          alt="Rasgen logo"
          width={180}
          height={38}
          priority
        />
        <nav className={styles.nav}>
          <a href="/docs" className={styles.navLink}>
            Documentation
          </a>
          <a href="/examples" className={styles.navLink}>
            Examples
          </a>
          <a
            href="https://github.com/rastgame/rasgen"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <Image src="/github-icon.svg" alt="GitHub" width={20} height={20} />
            GitHub
          </a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Create beautiful badges for your projects
          </h1>
          <p className={styles.subtitle}>
            Rasgen is a simple service for generating badges for your GitHub
            repositories, documentation, and websites.
          </p>

          <div className={styles.badgePreview}>
            <Image
              src="/preview-badge.svg"
              alt="Example badge"
              width={120}
              height={25}
              className={styles.previewBadge}
            />
          </div>
        </section>

        <section className={styles.badgeGenerator}>
          <h2 className={styles.sectionTitle}>Generate your badge</h2>

          <div className={styles.generatorForm}>
            <div className={styles.formGroup}>
              <label htmlFor="label" className={styles.label}>
                Label
              </label>
              <input
                type="text"
                id="label"
                className={styles.input}
                placeholder="version"
                defaultValue="version"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <input
                type="text"
                id="message"
                className={styles.input}
                placeholder="v1.0.0"
                defaultValue="v1.0.0"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="color" className={styles.label}>
                Color
              </label>
              <select id="color" className={styles.select} defaultValue="blue">
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
                <option value="purple">Purple</option>
                <option value="brightgreen">Bright Green</option>
                <option value="success">Success</option>
                <option value="important">Important</option>
                <option value="critical">Critical</option>
                <option value="informational">Informational</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="style" className={styles.label}>
                Style
              </label>
              <select id="style" className={styles.select} defaultValue="flat">
                <option value="flat">Flat</option>
                <option value="flat-square">Flat Square</option>
                <option value="plastic">Plastic</option>
                <option value="for-the-badge">For The Badge</option>
                <option value="social">Social</option>
              </select>
            </div>
          </div>

          <div className={styles.badgeResult}>
            <h3 className={styles.resultTitle}>Your Badge</h3>
            <div className={styles.badgePreviewContainer}>
              <Suspense
                fallback={
                  <div className={styles.loading}>Loading preview...</div>
                }
              >
                <Image
                  src="/preview-badge.svg"
                  alt="Generated badge preview"
                  width={120}
                  height={25}
                  className={styles.resultBadge}
                />
              </Suspense>
            </div>

            <div className={styles.codeSnippets}>
              <div className={styles.snippet}>
                <div className={styles.snippetHeader}>
                  <h4 className={styles.snippetTitle}>Markdown</h4>
                  <button className={styles.copyButton}>
                    <Image
                      src="/copy-icon.svg"
                      alt="Copy"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
                <code className={styles.snippetCode}>
                  ![version](https://rasgen.vercel.app/api/badge?label=version&message=v1.0.0&color=blue)
                </code>
              </div>

              <div className={styles.snippet}>
                <div className={styles.snippetHeader}>
                  <h4 className={styles.snippetTitle}>HTML</h4>
                  <button className={styles.copyButton}>
                    <Image
                      src="/copy-icon.svg"
                      alt="Copy"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
                <code className={styles.snippetCode}>
                  &lt;img
                  src=&ldquo;https://rasgen.vercel.app/api/badge?label=version&message=v1.0.0&color=blue&rdquo;
                  alt=&ldquo;version&rdquo; /&gt;
                </code>
              </div>

              <div className={styles.snippet}>
                <div className={styles.snippetHeader}>
                  <h4 className={styles.snippetTitle}>URL</h4>
                  <button className={styles.copyButton}>
                    <Image
                      src="/copy-icon.svg"
                      alt="Copy"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
                <code className={styles.snippetCode}>
                  https://rasgen.vercel.app/api/badge?label=version&message=v1.0.0&color=blue
                </code>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Features</h2>

          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Image
                  src="/badge-icon.svg"
                  alt="Custom badges"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className={styles.featureTitle}>Custom Badges</h3>
              <p className={styles.featureDescription}>
                Create badges with custom labels, messages, colors, and styles.
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Image
                  src="/github-icon.svg"
                  alt="GitHub integration"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className={styles.featureTitle}>GitHub Integration</h3>
              <p className={styles.featureDescription}>
                Easily integrate badges with your GitHub repositories.
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Image
                  src="/docs-icon.svg"
                  alt="Documentation"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className={styles.featureTitle}>API Documentation</h3>
              <p className={styles.featureDescription}>
                Comprehensive API documentation for advanced usage.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="/docs" className={styles.footerLink}>
            Documentation
          </a>
          <a href="/api" className={styles.footerLink}>
            API
          </a>
          <a href="/examples" className={styles.footerLink}>
            Examples
          </a>
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
