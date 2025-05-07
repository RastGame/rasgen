import Image from "next/image";
import Link from "next/link";
import styles from "./examples.module.css";

export default function Examples() {
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
          <Link href="/docs" className={styles.navLink}>Documentation</Link>
          <Link href="/examples" className={styles.navLinkActive}>Examples</Link>
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
        <h1 className={styles.title}>Badge Examples</h1>
        <p className={styles.description}>
          Here are some examples of badges you can create with Rasgen. Click on any example to see the code and URL.
        </p>

        <section className={styles.exampleSection}>
          <h2 className={styles.sectionTitle}>Basic Badges</h2>
          <div className={styles.examplesGrid}>
            <div className={styles.example}>
              <div className={styles.exampleBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="Version badge"
                  width={96}
                  height={20}
                />
              </div>
              <div className={styles.exampleDetails}>
                <h3 className={styles.exampleTitle}>Version Badge</h3>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/badge?label=version&message=v1.0.0&color=blue</code>
                </div>
                <div className={styles.exampleUsage}>
                  <h4>Markdown</h4>
                  <code>![version](https://rasgen.vercel.app/api/badge?label=version&message=v1.0.0&color=blue)</code>
                </div>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.exampleBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="Status badge"
                  width={96}
                  height={20}
                />
              </div>
              <div className={styles.exampleDetails}>
                <h3 className={styles.exampleTitle}>Status Badge</h3>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/badge?label=status&message=passing&color=brightgreen</code>
                </div>
                <div className={styles.exampleUsage}>
                  <h4>Markdown</h4>
                  <code>![status](https://rasgen.vercel.app/api/badge?label=status&message=passing&color=brightgreen)</code>
                </div>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.exampleBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="License badge"
                  width={96}
                  height={20}
                />
              </div>
              <div className={styles.exampleDetails}>
                <h3 className={styles.exampleTitle}>License Badge</h3>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/badge?label=license&message=MIT&color=green</code>
                </div>
                <div className={styles.exampleUsage}>
                  <h4>Markdown</h4>
                  <code>![license](https://rasgen.vercel.app/api/badge?label=license&message=MIT&color=green)</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.exampleSection}>
          <h2 className={styles.sectionTitle}>GitHub Badges</h2>
          <div className={styles.examplesGrid}>
            <div className={styles.example}>
              <div className={styles.exampleBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="GitHub stars badge"
                  width={96}
                  height={20}
                />
              </div>
              <div className={styles.exampleDetails}>
                <h3 className={styles.exampleTitle}>GitHub Stars</h3>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/github?repo=yurbaone/badgen&type=stars</code>
                </div>
                <div className={styles.exampleUsage}>
                  <h4>Markdown</h4>
                  <code>![stars](https://rasgen.vercel.app/api/github?repo=yurbaone/badgen&type=stars)</code>
                </div>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.exampleBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="GitHub forks badge"
                  width={96}
                  height={20}
                />
              </div>
              <div className={styles.exampleDetails}>
                <h3 className={styles.exampleTitle}>GitHub Forks</h3>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/github?repo=yurbaone/badgen&type=forks</code>
                </div>
                <div className={styles.exampleUsage}>
                  <h4>Markdown</h4>
                  <code>![forks](https://rasgen.vercel.app/api/github?repo=yurbaone/badgen&type=forks)</code>
                </div>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.exampleBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="GitHub issues badge"
                  width={96}
                  height={20}
                />
              </div>
              <div className={styles.exampleDetails}>
                <h3 className={styles.exampleTitle}>GitHub Issues</h3>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/github?repo=yurbaone/badgen&type=issues</code>
                </div>
                <div className={styles.exampleUsage}>
                  <h4>Markdown</h4>
                  <code>![issues](https://rasgen.vercel.app/api/github?repo=yurbaone/badgen&type=issues)</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.exampleSection}>
          <h2 className={styles.sectionTitle}>NPM Badges</h2>
          <div className={styles.examplesGrid}>
            <div className={styles.example}>
              <div className={styles.exampleBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="NPM version badge"
                  width={96}
                  height={20}
                />
              </div>
              <div className={styles.exampleDetails}>
                <h3 className={styles.exampleTitle}>NPM Version</h3>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/npm?package=react&type=version</code>
                </div>
                <div className={styles.exampleUsage}>
                  <h4>Markdown</h4>
                  <code>![npm](https://rasgen.vercel.app/api/npm?package=react&type=version)</code>
                </div>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.exampleBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="NPM downloads badge"
                  width={96}
                  height={20}
                />
              </div>
              <div className={styles.exampleDetails}>
                <h3 className={styles.exampleTitle}>NPM Downloads</h3>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/npm?package=react&type=downloads</code>
                </div>
                <div className={styles.exampleUsage}>
                  <h4>Markdown</h4>
                  <code>![downloads](https://rasgen.vercel.app/api/npm?package=react&type=downloads)</code>
                </div>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.exampleBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="NPM license badge"
                  width={96}
                  height={20}
                />
              </div>
              <div className={styles.exampleDetails}>
                <h3 className={styles.exampleTitle}>NPM License</h3>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/npm?package=react&type=license</code>
                </div>
                <div className={styles.exampleUsage}>
                  <h4>Markdown</h4>
                  <code>![license](https://rasgen.vercel.app/api/npm?package=react&type=license)</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.exampleSection}>
          <h2 className={styles.sectionTitle}>Style Variations</h2>
          <div className={styles.examplesGrid}>
            <div className={styles.example}>
              <div className={styles.exampleBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="Flat style badge"
                  width={96}
                  height={20}
                />
              </div>
              <div className={styles.exampleDetails}>
                <h3 className={styles.exampleTitle}>Flat Style (Default)</h3>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/badge?label=style&message=flat&color=blue&style=flat</code>
                </div>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.exampleBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="Flat square style badge"
                  width={96}
                  height={20}
                />
              </div>
              <div className={styles.exampleDetails}>
                <h3 className={styles.exampleTitle}>Flat Square Style</h3>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/badge?label=style&message=flat-square&color=blue&style=flat-square</code>
                </div>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.exampleBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="For the badge style"
                  width={120}
                  height={28}
                />
              </div>
              <div className={styles.exampleDetails}>
                <h3 className={styles.exampleTitle}>For The Badge Style</h3>
                <div className={styles.exampleCode}>
                  <code>https://rasgen.vercel.app/api/badge?label=style&message=for-the-badge&color=blue&style=for-the-badge</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.exampleSection}>
          <h2 className={styles.sectionTitle}>Color Variations</h2>
          <div className={styles.colorsGrid}>
            <div className={styles.colorExample}>
              <div className={styles.colorBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="Blue badge"
                  width={96}
                  height={20}
                />
              </div>
              <code>color=blue</code>
            </div>
            <div className={styles.colorExample}>
              <div className={styles.colorBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="Green badge"
                  width={96}
                  height={20}
                />
              </div>
              <code>color=green</code>
            </div>
            <div className={styles.colorExample}>
              <div className={styles.colorBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="Red badge"
                  width={96}
                  height={20}
                />
              </div>
              <code>color=red</code>
            </div>
            <div className={styles.colorExample}>
              <div className={styles.colorBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="Yellow badge"
                  width={96}
                  height={20}
                />
              </div>
              <code>color=yellow</code>
            </div>
            <div className={styles.colorExample}>
              <div className={styles.colorBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="Orange badge"
                  width={96}
                  height={20}
                />
              </div>
              <code>color=orange</code>
            </div>
            <div className={styles.colorExample}>
              <div className={styles.colorBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="Purple badge"
                  width={96}
                  height={20}
                />
              </div>
              <code>color=purple</code>
            </div>
            <div className={styles.colorExample}>
              <div className={styles.colorBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="Brightgreen badge"
                  width={96}
                  height={20}
                />
              </div>
              <code>color=brightgreen</code>
            </div>
            <div className={styles.colorExample}>
              <div className={styles.colorBadge}>
                <Image
                  src="/preview-badge.svg"
                  alt="Success badge"
                  width={96}
                  height={20}
                />
              </div>
              <code>color=success</code>
            </div>
          </div>
        </section>
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