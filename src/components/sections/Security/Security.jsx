import styles from './Security.module.css'
import favicon from '../../../assets/favicon.png'

const CARDS = [
  {
    id: 'testing',
    area: 'tl',
    title: 'Security Testing',
    desc: 'Rigorous enterprise review readiness',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5l6 2.5v4c0 4-2.6 6.8-6 8.5-3.4-1.7-6-4.5-6-8.5V5l6-2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M7.3 9.8l1.9 1.9 3.5-3.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'privacy',
    area: 'tr',
    title: 'Data Privacy',
    desc: 'PII protection · tenant isolation',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="4" y="9" width="12" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6.5 9V6a3.5 3.5 0 0 1 7 0v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="10" cy="13" r="1.3" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'governance',
    area: 'bl',
    title: 'Access & Governance',
    desc: 'Role-based control · approvals',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="7.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2.5 17c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M13 9.5c1.4-.3 2.5-1.6 2.5-3a3 3 0 0 0-2-2.85" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M14 12.3c2 .5 3.5 2.3 3.5 4.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'audit',
    area: 'br',
    title: 'Auditability',
    desc: 'Traceable actions · source-based validation',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 2.5h7l3 3v9.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 3 15.5V4A1.5 1.5 0 0 1 4.5 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M12 2.5v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M6.5 9.5h4M6.5 12h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="13.5" cy="13" r="2.4" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M15.3 14.8L17 16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const CHIPS = [
  {
    label: 'Encryption in transit & at rest',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M5.5 7V4.8a2.5 2.5 0 0 1 5 0V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="8" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'PII masking before AI processing',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M1.5 8c1.4-2.7 3.8-4.3 6.5-4.3S13.1 5.3 14.5 8c-1.4 2.7-3.8 4.3-6.5 4.3S2.9 10.7 1.5 8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M2.5 13.5L13.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Human-in-the-loop validation',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6.5" cy="5.5" r="2.2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M2 13.5c0-2.5 2-4.3 4.5-4.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M9.5 11l1.8 1.8 3.2-3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Source-linked audit trails',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6.5 9.5l3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M7.5 4.5l1-1a2.6 2.6 0 0 1 3.7 3.7l-1 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M8.5 11.5l-1 1A2.6 2.6 0 0 1 3.8 8.8l1-1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Compliance-ready architecture',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5L1.5 4.5v3c0 4 2.7 6.6 6.5 7 3.8-.4 6.5-3 6.5-7v-3L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M5.5 8l1.8 1.8L10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Enterprise cloud security controls',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4.5 12.5a3 3 0 0 1-.5-5.96 4 4 0 0 1 7.7-1.3A3.25 3.25 0 0 1 11.5 12.5h-7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M8 7.5v4M6.3 9.2L8 7.5l1.7 1.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function Security() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.head}>
          <div className={styles.eyebrow}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5l6 2.5v4c0 4-2.6 6.8-6 8.5-3.4-1.7-6-4.5-6-8.5V5l6-2.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            Enterprise Security &amp; Data Privacy
          </div>
          <h2 className={`h2 ${styles.heading}`}>
            Security, privacy, and control —{' '}
            <span className={styles.accent}>built for enterprise review.</span>
          </h2>
          <p className={styles.sub}>
            PO2PAY is designed for rigorous enterprise security expectations with strong data privacy, access control, auditability, and secure workflow governance.
          </p>
        </div>

        <div className={styles.diagram}>
          {CARDS.map((c) => (
            <div key={c.id} className={styles.card} style={{ gridArea: c.area }}>
              <div className={styles.cardIcon}>{c.icon}</div>
              <div>
                <div className={styles.cardTitle}>{c.title}</div>
                <div className={styles.cardDesc}>{c.desc}</div>
              </div>
            </div>
          ))}

          <div className={`${styles.connector} ${styles.connTop}`}><span className={styles.node} /></div>
          <div className={`${styles.connector} ${styles.connBottom}`}><span className={styles.node} /></div>
          <div className={`${styles.connector} ${styles.connLeft}`}><span className={styles.node} /></div>
          <div className={`${styles.connector} ${styles.connRight}`}><span className={styles.node} /></div>

          <div className={styles.core}>
            <span className={styles.coreRing} />
            <span className={styles.coreRingOuter} />
            <div className={styles.shield}>
              <img src={favicon} alt="PO2PAY" className={styles.shieldLogo} />
            </div>
            <div className={styles.coreLabel}>
              <span>PO2PAY</span>
              <span>Secure Core</span>
            </div>
          </div>
        </div>

        <div className={styles.chips}>
          {CHIPS.map((chip) => (
            <div key={chip.label} className={styles.chip}>
              <span className={styles.chipIcon}>{chip.icon}</span>
              {chip.label}
            </div>
          ))}
        </div>

        <div className={styles.assurance}>
          <span className={styles.assuranceLine} />
          <span className={styles.assurancePill}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5l6 2.5v4c0 4-2.6 6.8-6 8.5-3.4-1.7-6-4.5-6-8.5V5l6-2.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M7.3 9.8l1.9 1.9 3.5-3.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Built for rigorous enterprise security review requirements
          </span>
          <span className={styles.assuranceLine} />
        </div>

      </div>
    </section>
  )
}
