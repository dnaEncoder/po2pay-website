import { useState, useEffect } from 'react'
import logo from '../../assets/po2pay_horizontal_logo.png'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'InvoiceIQ',  href: '#invoiceiq' },
  { label: 'ContractIQ', href: '#contractiq' },
  { label: 'ROI',        href: '#roi' },
  { label: 'Customers',  href: '#case' },
  { label: 'Resources',  href: '#faq' },
]

const MEGA_PRODUCTS = [
  {
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    title: 'InvoiceIQ',
    desc: 'Invoice extraction, validation support, exception visibility',
    href: '#invoiceiq',
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2h6l4 4v8H3V2z" stroke="currentColor" strokeWidth="1.3"/><path d="M9 2v4h4" stroke="currentColor" strokeWidth="1.3"/></svg>,
    title: 'ContractIQ',
    desc: 'PO and contract intelligence, custom fields, source-backed validation',
    href: '#contractiq',
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    title: 'Vendor Portal',
    desc: 'Vendor onboarding, document status, operational visibility',
    href: '#',
  },
]

const MEGA_CAPABILITIES = [
  {
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Document intelligence',
    desc: 'OCR, structure, reasoning, and extraction',
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    title: 'ERP integrations',
    desc: 'SAP, Oracle, NetSuite, Tally, Zoho',
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L2 6l6 4 6-4-6-4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M2 10l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
    title: 'Human validation',
    desc: 'Review, correction, approval, and auditability',
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M5 7l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    title: 'Security & governance',
    desc: 'Traceability, tenant isolation, enterprise controls',
  },
]

export default function Header() {
  const [scrolled, setScrolled]   = useState(false)
  const [megaOpen, setMegaOpen]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mega on outside click
  useEffect(() => {
    if (!megaOpen) return
    const close = () => setMegaOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [megaOpen])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} id="siteHeader">
      <div className={styles.inner}>
      {/* Logo */}
      <a href="/" className={styles.logo}>
        <img src={logo} alt="PO2PAY" />
      </a>

      {/* Nav */}
      <nav className={`${styles.nav} ${mobileOpen ? styles.navOpen : ''}`}>
        {/* Platform with mega */}
        <div className={styles.megaTriggerWrap}>
          <button
            className={`${styles.navItem} ${megaOpen ? styles.navItemActive : ''}`}
            onClick={(e) => { e.stopPropagation(); setMegaOpen(v => !v) }}
            aria-expanded={megaOpen}
          >
            Platform
            <svg className={`${styles.chev} ${megaOpen ? styles.chevOpen : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Mega menu */}
          {megaOpen && (
            <div className={styles.mega} onClick={e => e.stopPropagation()}>
              <div className={styles.megaInner}>
                {/* Products column */}
                <div className={styles.megaCol}>
                  <p className={styles.megaColHead}>Products</p>
                  {MEGA_PRODUCTS.map(item => (
                    <a key={item.title} href={item.href} className={styles.megaLink}>
                      <span className={styles.megaIcon}>{item.icon}</span>
                      <span>
                        <span className={styles.megaLinkTitle}>{item.title}</span>
                        <span className={styles.megaLinkDesc}>{item.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>

                {/* Capabilities column */}
                <div className={styles.megaCol}>
                  <p className={styles.megaColHead}>Capabilities</p>
                  {MEGA_CAPABILITIES.map(item => (
                    <a key={item.title} href="#" className={styles.megaLink}>
                      <span className={styles.megaIcon}>{item.icon}</span>
                      <span>
                        <span className={styles.megaLinkTitle}>{item.title}</span>
                        <span className={styles.megaLinkDesc}>{item.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>

                {/* Feature callout */}
                <div className={styles.megaFeature}>
                  <span className={styles.megaBadge}>● New</span>
                  <p className={styles.megaFeatureTitle}>Agentic financial operations, end to end</p>
                  <p className={styles.megaFeatureDesc}>
                    PO2PAY helps finance teams extract, validate, and operationalize data across invoices, purchase orders, and contracts in one system.
                  </p>
                  <a href="#" className={styles.megaFeatureLink}>
                    See how it works
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 6h6m0 0L6 3m3 3L6 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Regular nav links */}
        {NAV_LINKS.map(link => (
          <a key={link.label} href={link.href} className={styles.navItem}>{link.label}</a>
        ))}
      </nav>

      {/* Right actions */}
      <div className={styles.actions}>
        <a href="#" className="btn btn-ghost btn-sm">Sign in</a>
        <a href="#" className="btn btn-primary btn-sm">Book a demo</a>
      </div>

      {/* Mobile hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMobileOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span className={`${styles.bar} ${mobileOpen ? styles.barTop : ''}`} />
        <span className={`${styles.bar} ${mobileOpen ? styles.barMid : ''}`} />
        <span className={`${styles.bar} ${mobileOpen ? styles.barBot : ''}`} />
      </button>
      </div>
    </header>
  )
}
