import styles from './ExceptionIntelligence.module.css'
import Reveal from '../../common/Reveal.jsx'

const CASES = [
  {
    title: 'Tax mismatch',
    desc: 'Detects tax variance and jurisdiction mismatches.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8.5 13.5l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="8.7" cy="8.7" r="1.1" fill="currentColor"/>
        <circle cx="13.3" cy="13.3" r="1.1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Non-PO invoice',
    desc: 'Flags invoices without a matching purchase order.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M6 2.5h7l3.5 3.5V19a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M13 2.5v3.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7.5 12.5h5M7.5 15.5h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M5 5l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Split invoice',
    desc: 'Identifies invoices that span multiple POs or cost centers.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="7" height="16" rx="1.2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="12" y="3" width="7" height="16" rx="1.2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6.5 7.5h0M6.5 11h0M6.5 14.5h0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M15.5 7.5h0M15.5 11h0M15.5 14.5h0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const OUTCOMES = [
  { title: 'Auto-classified',              desc: 'Exceptions identified with AI precision.' },
  { title: 'Routed for review',            desc: 'Smart routing to the right owner or queue.' },
  { title: 'ERP-ready after validation',   desc: 'Clean, structured data flows back to your ERP.' },
]

const CHECK_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6.5 10.2l2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function InvoiceIQExceptionIntelligence() {
  return (
    <section className={styles.section}>
      <div className={styles.dark}>
        <div className={styles.container}>

          <Reveal variant="up">
            <div className={styles.head}>
              <div className={styles.eyebrow}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <path d="M5 2.5h7l3.5 3.5V17a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  <path d="M7 11l1.8 1.8L13 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                InvoiceIQ Exception Intelligence
              </div>
              <h2 className={`h2 ${styles.heading}`}>
                Exception Intelligence for<br />
                <span className={styles.accent}>Real-World Invoice Workflows</span>
              </h2>
              <p className={styles.sub}>
                InvoiceIQ detects, classifies, and routes exceptions with confidence&mdash;so your team can focus on what matters.
              </p>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={120}>
            <div className={styles.workflow}>
              <div className={styles.stage}>
                <div className={styles.stageIcon}>
                  <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
                    <path d="M6 2.5h7l3.5 3.5V19a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M13 2.5v3.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M7.5 12h5M7.5 15h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.stageLabel}>Invoice Intake</div>
              </div>

              <div className={`${styles.connector} ${styles.connectorLeft}`}>
                <span className={styles.connLine} />
                <span className={styles.connArrow}>→</span>
              </div>

              <div className={styles.stage}>
                <div className={styles.coreCircle}>IQ</div>
                <div className={styles.stageLabel}>Detect &bull; Classify &bull; Route</div>
              </div>

              <div className={`${styles.connector} ${styles.connectorRight}`}>
                <span className={styles.connLine} />
                <span className={styles.connArrow}>→</span>
              </div>

              <div className={styles.stage}>
                <div className={styles.stageIcon}>
                  <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3.5 19c0-3.6 3.1-6.2 7.5-6.2s7.5 2.6 7.5 6.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.stageLabel}>Review Queue</div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>

      <div className={styles.light}>
        <div className={styles.container}>

          <div className={styles.cards}>
            {CASES.map((c, i) => (
              <Reveal key={c.title} variant="up" delay={i * 100}>
                <div className={styles.card}>
                  <div className={styles.cardIcon}>{c.icon}</div>
                  <div className={styles.cardTitle}>{c.title}</div>
                  <p className={styles.cardDesc}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className={styles.outcomeStrip}>
            {OUTCOMES.map((o, i) => (
              <Reveal key={o.title} variant="up" delay={i * 100}>
                <div className={styles.outcomeCol}>
                  <span className={styles.outcomeIcon}>{CHECK_ICON}</span>
                  <div>
                    <div className={styles.outcomeTitle}>{o.title}</div>
                    <div className={styles.outcomeDesc}>{o.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
