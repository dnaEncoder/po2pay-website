import styles from './Integrations.module.css'
import favicon from '../../../assets/favicon.png'
import Reveal from '../../common/Reveal.jsx'

const LEFT_SYSTEMS = [
  { name: 'SAP S/4HANA',   logo: '/sap-logo-png.png' },
  { name: 'Oracle EBS',    logo: '/oracle-ebs-logo.png' },
  { name: 'Oracle Fusion', logo: '/oracle-fusion-logo.jpg' },
  { name: 'NetSuite',      logo: '/NetSuite-Logo.png' },
]

const RIGHT_SYSTEMS = [
  { name: 'Microsoft Dynamics', logo: '/Microsoft_Dynamics_365_Logo.png' },
  { name: 'Tally',               logo: '/tally_logo.png' },
  { name: 'Zoho Books',          logo: '/ZohoBooks%20logo.png' },
  { name: 'API / Custom Backend', logo: '/api-interface.png' },
]

const CORE_BADGES = ['Document Intelligence', 'Validation', 'Workflow', 'ERP Sync']

const TALKING_POINTS = [
  {
    title: 'Two-way ERP connectivity',
    desc: 'Clean movement of validated data between PO2PAY and enterprise systems.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 8.5h6M11 8.5l-2.2-2.2M11 8.5l-2.2 2.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 11.5H9M9 11.5l2.2-2.2M9 11.5l2.2 2.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="5" width="3" height="3" rx="0.6" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="15" y="11.5" width="3" height="3" rx="0.6" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    title: 'Structured data sync',
    desc: 'Move clean, review-ready financial data into downstream workflows.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="3" width="15" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="2.5" y="8" width="15" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="2.5" y="13" width="15" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="5.5" cy="5" r="0.8" fill="currentColor"/>
        <circle cx="5.5" cy="10" r="0.8" fill="currentColor"/>
        <circle cx="5.5" cy="15" r="0.8" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Review-first workflows',
    desc: 'Human validation stays in control before data moves forward.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="8.5" cy="6.5" r="2.6" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M3 16c0-2.9 2.5-5 5.5-5s5.5 2.1 5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M12.5 11.5l1.7 1.7 3.3-3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Enterprise-ready architecture',
    desc: 'Built to fit securely into finance and procurement environments.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5l6 2.5v4c0 4-2.6 6.8-6 8.5-3.4-1.7-6-4.5-6-8.5V5l6-2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M7.3 9.8l1.9 1.9 3.5-3.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function Integrations() {
  return (
    <section className={styles.section} id="integrations">
      <div className={styles.container}>

        <Reveal variant="up">
          <div className={styles.head}>
            <div className="eyebrow"><span className="dot" />Integrations</div>
            <h2 className={`h2 ${styles.heading}`}>
              Connect PO2PAY to the systems your{' '}
              <span className={styles.accent}>finance team already uses.</span>
            </h2>
            <p className={styles.sub}>
              PO2PAY integrates with ERP platforms and backend systems to move validated financial data smoothly across your workflow.
            </p>
          </div>
        </Reveal>

        <div className={styles.diagram}>
          <Reveal variant="left">
            <div className={`${styles.side} ${styles.sideLeft}`}>
              <span className={styles.spine} />
              {LEFT_SYSTEMS.map((sys) => (
                <div key={sys.name} className={styles.sideCard}>
                  <img src={sys.logo} alt={sys.name} className={styles.sideLogo} />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="scale" delay={150}>
            <div className={styles.core}>
              <div className={styles.coreCard}>
                <img src={favicon} alt="PO2PAY" className={styles.coreLogo} />
                <div className={styles.coreName}>PO2PAY</div>
                <div className={styles.coreTag}>Financial Intelligence Platform</div>
                <div className={styles.coreBadges}>
                  {CORE_BADGES.map((b) => (
                    <span key={b} className={styles.coreBadge}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right">
            <div className={`${styles.side} ${styles.sideRight}`}>
              <span className={styles.spine} />
              {RIGHT_SYSTEMS.map((sys) => (
                <div key={sys.name} className={styles.sideCard}>
                  <img src={sys.logo} alt={sys.name} className={styles.sideLogo} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className={styles.points}>
          {TALKING_POINTS.map((p, i) => (
            <Reveal key={p.title} variant="up" delay={i * 100}>
              <div className={styles.point}>
                <div className={styles.pointIcon}>{p.icon}</div>
                <div className={styles.pointTitle}>{p.title}</div>
                <p className={styles.pointDesc}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
