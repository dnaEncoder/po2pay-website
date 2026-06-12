import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from '../InvoiceIQ/Overview.module.css'
import Reveal from '../../common/Reveal.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ROWS = [
  { id: 'MSA-992', vendor: 'Acme Logistics', val: 'Active',              state: 'ok'   },
  { id: 'MSA-991', vendor: 'Bright Foods',   val: 'Renewal pending ⚠',  state: 'warn' },
  { id: 'PO-4482', vendor: 'Cohort Cloud',   val: 'Active',              state: 'ok'   },
  { id: 'MSA-990', vendor: 'Dunbar Co.',     val: 'Active',              state: 'ok'   },
  { id: 'SOW-112', vendor: 'Eos Materials',  val: 'Missing SLA ✕',      state: 'err'  },
  { id: 'PO-4481', vendor: 'Falcon Print',   val: 'Active',              state: 'ok'   },
]

const CARDS = [
  { slot: 'tl', label: 'Identify', title: 'Obligation tracked',   desc: 'Renewal surfaced automatically.',     fn: 'track', arg: "'MSA-991'", status: 'warn', statusText: 'Flagged' },
  { slot: 'br', label: 'Action',   title: 'Clause linked',        desc: 'Linked to invoice validation.',       fn: 'link',  arg: "'SOW-112'", status: 'info', statusText: 'Linked'  },
]

export default function ContractIQOverview() {
  const sectionRef = useRef(null)
  const visualRef  = useRef(null)

  useGSAP(() => {
    const cards   = visualRef.current?.querySelectorAll(`.${styles.card}`)
    const mockApp = visualRef.current?.querySelector(`.${styles.mock}`)
    gsap.set(cards, { opacity: 0, y: 28 })
    if (mockApp) gsap.set(mockApp, { opacity: 0, y: 20 })
    ScrollTrigger.create({
      trigger: visualRef.current, start: 'top 72%', once: true,
      onEnter() {
        if (mockApp) gsap.to(mockApp, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' })
        gsap.to(cards, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out', delay: 0.20 })
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section} id="contractiq">
      <div className={styles.container}>

        <Reveal variant="up">
          <div className={styles.head}>
            <div className={styles.left}>
              <div className="eyebrow"><span className="dot" />ContractIQ · Overview</div>
              <h2 className={`h2 ${styles.heading}`}>
                Turn static contracts into <em className={styles.accent}>active financial controls.</em>
              </h2>
              <div className={styles.actions}>
                <a className="btn btn-primary" href="#">Explore ContractIQ →</a>
                <a className="btn btn-ghost" href="#">See pricing</a>
              </div>
            </div>
            <p className={styles.desc}>
              ContractIQ extracts clauses, tracks obligations, and links POs directly to invoices — ensuring every billing event is backed by validated contract data.
            </p>
          </div>
        </Reveal>

        <div ref={visualRef} className={styles.visual}>
          <div className={styles.blob1} />
          <div className={styles.blob2} />

          <div className={styles.mock}>
            <div className={styles.mockBar}>
              <div className={styles.dots}><span /><span /><span /></div>
              <span className={styles.url}>app.po2pay.io / contracts</span>
            </div>
            <div className={styles.mockBody}>
              <aside className={styles.sidebar}>
                <div className={styles.sidebarBrand}><span className={styles.sidebarLogo} />ContractIQ</div>
                <nav className={styles.sidebarNav}>
                  {['Dashboard', 'Contracts', 'Obligations', 'Vendors', 'Reports'].map(item => (
                    <div key={item} className={`${styles.navItem} ${item === 'Contracts' ? styles.navItemActive : ''}`}>{item}</div>
                  ))}
                </nav>
              </aside>
              <div className={styles.content}>
                <div className={styles.contentHeader}>
                  <span className={styles.contentTitle}>All Contracts</span>
                  <span className={styles.pendingBadge}>2 pending</span>
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
                <span className={styles.statusDot} />{c.statusText}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
