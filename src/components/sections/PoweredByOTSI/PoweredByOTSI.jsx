import styles from './PoweredByOTSI.module.css'
import Reveal from '../../common/Reveal.jsx'

export default function PoweredByOTSI() {
  return (
    <section className={styles.section} id="powered-by-otsi">
      <div className={styles.container}>
        <Reveal variant="up">
          <div className={styles.head}>
            <div className="eyebrow">
              <span className="dot" />
              Enterprise Technology Partner
            </div>
            <h2 className={`h2 ${styles.heading}`}>
              Powered by <span className={styles.accent}>OTSI</span>
            </h2>
            <p className={styles.sub}>
              Enterprise-grade document intelligence built on a foundation of global IT excellence, robust security, and deep domain expertise.
            </p>
          </div>
        </Reveal>

        <Reveal variant="up" delay={150}>
          <div className={styles.logoCard}>
            <div className={styles.glowRing} aria-hidden />
            <a
              href="https://otsi-global.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.logoWrapper}
              aria-label="Visit OTSI website"
            >
              <img
                src="https://otsi-global.com/wp-content/uploads/2022/02/Final-Logo-Colour-and-Proportion-1.png"
                alt="OTSI - Object Technology Solutions Inc."
                className={styles.logoImg}
              />
            </a>
          </div>
        </Reveal>

        <Reveal variant="up" delay={250}>
          <div className={styles.contentCard}>
            <div className={styles.description}>
              <p>
                <strong>OTSI (Object Technology Solutions Inc.)</strong> is a leading global technology services and solutions provider headquartered in Overland Park, Kansas. For over two decades, OTSI has delivered transformative digital, AI, cloud, and enterprise application services to Fortune 500 companies and market leaders across North America, APAC, EMEA, and LATAM.
              </p>
              <p>
                PO2PAY combines OTSI’s enterprise AI engineering, robust security governance, and scalable cloud infrastructure to deliver accurate, automated invoice and contract intelligence for global finance operations.
              </p>
            </div>

            <div className={styles.highlights}>
              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <div>
                  <strong>25+ Years of Excellence</strong>
                  <span>Global IT Leader since 1999</span>
                </div>
              </div>

              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <div>
                  <strong>CMMI Level 3 & ISO Certified</strong>
                  <span>Rigorous Quality & Security Standards</span>
                </div>
              </div>

              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </span>
                <div>
                  <strong>AI & Automation Hub</strong>
                  <span>Enterprise Document & Data Intelligence</span>
                </div>
              </div>

              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <div>
                  <strong>Global Talent Footprint</strong>
                  <span>USA, India, Costa Rica, UK & Dubai</span>
                </div>
              </div>
            </div>

            <div className={styles.actionRow}>
              <a
                href="https://otsi-global.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
              >
                <span>Learn more at otsi-global.com</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
