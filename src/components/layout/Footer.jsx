import styles from './Footer.module.css'

const NAV = [
  {
    title: 'Platform',
    links: [
      { label: 'InvoiceIQ',    href: '#invoiceiq' },
      { label: 'ContractIQ',   href: '#contractiq' },
      { label: 'Platform ROI', href: '#roi' },
      { label: 'Integrations', href: '#' },
    ],
  },
]

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.75"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="/" className={styles.logo} aria-label="PO2PAY home">
              <img src="/po2pay_dark_theme_horizontal_logo.png" alt="PO2PAY" />
            </a>
            <p className={styles.tagline}>
              Document intelligence for enterprise finance.
            </p>
            <div className={styles.socials}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} className={styles.social} aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {NAV.map(col => (
            <div key={col.title} className={styles.col}>
              <div className={styles.colTitle}>{col.title}</div>
              <ul className={styles.colLinks}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className={styles.link}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>© {new Date().getFullYear()} PO2PAY, Inc. All rights reserved.</span>

          <div className={styles.poweredBy}>
            <span className={styles.poweredText}>Powered by</span>
            <a href="https://otsi-global.com/" target="_blank" rel="noopener noreferrer" className={styles.otsiLink} aria-label="OTSI website">
              <img 
                src="https://otsi-global.com/wp-content/uploads/2022/02/Final-Logo-Colour-and-Proportion-1.png" 
                alt="OTSI" 
                className={styles.otsiLogo} 
              />
            </a>
          </div>

          <span className={styles.cert}>SOC 2 Type II · GDPR · CCPA</span>
        </div>

      </div>
    </footer>
  )
}
