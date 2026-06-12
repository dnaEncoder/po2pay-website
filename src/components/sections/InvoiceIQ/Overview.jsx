import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from './Overview.module.css'
import Reveal from '../../common/Reveal.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ROWS = [
  { id: 'INV-2847', vendor: 'Acme Logistics',  val: '$12,480',           state: 'ok'   },
  { id: 'INV-2846', vendor: 'Bright Foods',    val: 'Review needed ⚠',  state: 'warn' },
  { id: 'INV-2845', vendor: 'Cohort Cloud',    val: '$3,200',            state: 'ok'   },
  { id: 'INV-2844', vendor: 'Dunbar Co.',      val: '$48,910',           state: 'ok'   },
  { id: 'INV-2843', vendor: 'Eos Materials',   val: 'Validation issue ✕', state: 'err' },
  { id: 'INV-2842', vendor: 'Falcon Print',    val: '$1,070',            state: 'ok'   },
]

const CARDS = [
  { slot: 'tl', label: 'Identify', title: 'Validation surfaced', desc: 'Review point identified instantly.', fn: 'validate', arg: "'INV-2846'", status: 'warn', statusText: 'Flagged' },
  { slot: 'br', label: 'Action',   title: 'Workflow moved',      desc: 'Routed to next owner with context.', fn: 'route', arg: "'review'", status: 'info', statusText: 'Routed' },
]

export default function InvoiceIQOverview() {
  const sectionRef = useRef(null)
  const visualRef  = useRef(null)

  useGSAP(() => {
    const cards   = visualRef.current?.querySelectorAll(`.${styles.card}`)
    const mockApp = visualRef.current?.querySelector(`.${styles.mock}`)

    gsap.set(cards, { opacity: 0, y: 28 })
    if (mockApp) gsap.set(mockApp, { opacity: 0, y: 20 })

    ScrollTrigger.create({
      trigger: visualRef.current,
      start: 'top 72%',
      once: true,
      onEnter() {
        if (mockApp) gsap.to(mockApp, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' })
        gsap.to(cards, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out', delay: 0.20 })
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section} id="invoiceiq">
      <div className={styles.container}>

        <Reveal variant="up">
          <div className={styles.head}>
            <div className={styles.left}>
              <div className="eyebrow"><span className="dot" />InvoiceIQ · Overview</div>
              <h2 className={`h2 ${styles.heading}`}>
                Bring control back to <em className={styles.accent}>high-volume</em> invoice operations.
              </h2>
              <div className={styles.actions}>
                <a className="btn btn-primary" href="#">Explore InvoiceIQ →</a>
                <a className="btn btn-ghost" href="#">See pricing</a>
              </div>
            </div>
            <p className={styles.desc}>
              InvoiceIQ helps finance teams reduce repetitive handling, improve validation flow, and create better visibility across invoice-heavy environments — without breaking existing systems.
            </p>
          </div>
        </Reveal>

        <div ref={visualRef} className={styles.visual}>
          <div className={styles.blob1} />
          <div className={styles.blob2} />

          {/* Mock app */}
          <div className={styles.mock}>
            <div className={styles.mockBar}>
              <div className={styles.dots}><span /><span /><span /></div>
              <span className={styles.url}>app.invoiceiq.io / invoices</span>
            </div>
            <div className={styles.mockBody}>
              <aside className={styles.sidebar}>
                <div className={styles.sidebarBrand}><span className={styles.sidebarLogo} />InvoiceIQ</div>
                <nav className={styles.sidebarNav}>
                  {['Dashboard', 'Invoices', 'Approvals', 'Vendors', 'Reports'].map(item => (
                    <div key={item} className={`${styles.navItem} ${item === 'Invoices' ? styles.navItemActive : ''}`}>{item}</div>
                  ))}
                </nav>
              </aside>
              <div className={styles.content}>
                <div className={styles.contentHeader}>
                  <span className={styles.contentTitle}>All Invoices</span>
                  <span className={styles.pendingBadge}>6 pending</span>
                </div>
                {ROWS.map(row => (
                  <div key={row.id} className={`${styles.row} ${styles[`row_${row.state}`]}`}>
                    <span className={styles.rowDot} />
                    <span className={styles.rowId}>{row.id}</span>
                    <span className={styles.rowVendor}>{row.vendor}</span>
                    <span className={styles.rowVal}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating cards */}
          {CARDS.map(c => (
            <div key={c.slot} className={`${styles.card} ${styles[`card_${c.slot}`]}`}>
              <div className={styles.cardLabel}>{c.label}</div>
              <div className={styles.cardTitle}>{c.title}</div>
              <p className={styles.cardDesc}>{c.desc}</p>
              <div className={styles.cardCode}>
                <span className={styles.fn}>{c.fn}</span>({''}
                <span className={styles.arg}>{c.arg}</span>
                {')'}
              </div>
              <div className={`${styles.cardStatus} ${styles[`status_${c.status}`]}`}>
                <span className={styles.statusDot} />
                {c.statusText}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
