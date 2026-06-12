import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from './Features.module.css'
import Reveal from '../../common/Reveal.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const FEATURES = [
  { id: 'capture',   number: '01', title: 'Touchless Capture',  teaser: 'Read invoices from any channel automatically.',          desc: 'Email, EDI, portal, paper — ingestion and structured extraction without re-keying.' },
  { id: 'exception', number: '02', title: 'Exception Handling', teaser: 'Resolve tax and coding mismatches automatically.',        desc: 'Tax validation checks rates, amounts, and codes against the tax matrix. Charge code validation runs a coding matrix lookup and suggests the right account, with manual override when needed.' },
  { id: 'review',    number: '03', title: 'User Review',        teaser: 'Give reviewers full context before they approve.',        desc: 'Side-by-side document and extracted data, inline comments, and one-click approve, reject, or request missing information.' },
  { id: 'erp',       number: '04', title: 'ERP Integration',    teaser: 'From approval to posted — fully connected.',              desc: 'Approval workflows route for sign-off, corrected data syncs to CW, and invoices post directly to your ERP with preview, failure handling, and automatic retry.' },
]

export default function InvoiceIQFeatures() {
  const sectionRef  = useRef(null)
  const featRefs    = useRef([])
  const visualRefs  = useRef([])
  const activeRef   = useRef(0)

  useGSAP(() => {
    const N = FEATURES.length

    featRefs.current[0]?.classList.add(styles.featActive)
    gsap.set(visualRefs.current[0], { opacity: 1, y: 0, pointerEvents: 'auto' })
    visualRefs.current.slice(1).forEach(el => {
      gsap.set(el, { opacity: 0, y: 40, pointerEvents: 'none' })
    })

    function activate(nextIdx, dir) {
      const prev = activeRef.current
      if (prev === nextIdx) return
      featRefs.current[prev]?.classList.remove(styles.featActive)
      featRefs.current[nextIdx]?.classList.add(styles.featActive)
      gsap.to(visualRefs.current[prev], { opacity: 0, y: -36 * dir, duration: 0.38, ease: 'power2.in', onComplete: () => { gsap.set(visualRefs.current[prev], { pointerEvents: 'none' }) } })
      gsap.fromTo(visualRefs.current[nextIdx], { opacity: 0, y: 48 * dir }, { opacity: 1, y: 0, duration: 0.52, ease: 'power3.out', delay: 0.08, onStart: () => { visualRefs.current[nextIdx].style.pointerEvents = 'auto' } })
      activeRef.current = nextIdx
    }

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate(self) {
        activate(Math.min(Math.floor(self.progress * N), N - 1), self.direction)
      },
    })
  }, { scope: sectionRef })

  const scrollToFeature = (i) => {
    const section = sectionRef.current
    if (!section) return
    const N = FEATURES.length
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    const scrollRange = section.offsetHeight - window.innerHeight
    const targetProgress = (i + 0.5) / N
    window.scrollTo({ top: sectionTop + scrollRange * targetProgress, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className={styles.section} style={{ '--n': FEATURES.length }}>

      <Reveal variant="up">
        <div className={styles.head}>
          <div className="eyebrow"><span className="dot" />InvoiceIQ · Features</div>
          <h2 className={`h2 ${styles.heading}`}>Clearer <em className={styles.accent}>invoice intelligence.</em></h2>
          <p className={styles.sub}>InvoiceIQ helps you extract, validate, and move invoices faster across your financial operations.</p>
        </div>
      </Reveal>

      <div className={styles.sticky}>
        <div className={styles.cols}>

          <div className={styles.left}>
            {FEATURES.map((f, i) => (
              <div
                key={f.id}
                ref={el => { featRefs.current[i] = el }}
                className={styles.feat}
                role="button"
                tabIndex={0}
                onClick={() => scrollToFeature(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToFeature(i) } }}
              >
                <div className={styles.featNum}>{f.number}</div>
                <div className={styles.featBody}>
                  <div className={styles.featTitle}>{f.title}</div>
                  <div className={styles.featInfo}>{f.teaser}</div>
                  <div className={styles.featDesc}>{f.desc}</div>
                  <div className={styles.featBar} />
                </div>
                <span className={styles.featShift} aria-hidden="true">→</span>
              </div>
            ))}
          </div>

          <div className={styles.right}>
            {FEATURES.map((f, i) => (
              <div key={f.id} ref={el => { visualRefs.current[i] = el }} className={styles.panel}>
                <Visual id={f.id} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ── Visuals ─────────────────────────────────────── */
function Visual({ id }) {
  switch (id) {
    case 'capture':   return <CaptureVisual />
    case 'exception': return <ExceptionVisual />
    case 'review':    return <ReviewVisual />
    case 'erp':       return <ERPVisual />
    default:          return null
  }
}

function CaptureVisual() {
  const channels = [
    { label: 'Email',  color: '#216BFF', icon: '✉' },
    { label: 'EDI',    color: '#6D5EF8', icon: '⇄' },
    { label: 'PDF',    color: '#E84B3A', icon: '⎙' },
    { label: 'Portal', color: '#087654', icon: '◉' },
  ]
  const fields = [
    { key: 'Vendor',  val: 'Acme Logistics' },
    { key: 'Invoice', val: 'INV-2847' },
    { key: 'Amount',  val: '$12,480.00' },
    { key: 'Due',     val: '14 Feb 2025' },
    { key: 'Lines',   val: '6 line items' },
    { key: 'Status',  val: 'Ready', highlight: true },
  ]
  return (
    <div className={styles.captureWrap}>
      <div className={styles.channels}>
        {channels.map(ch => (
          <div key={ch.label} className={styles.channel} style={{ '--ch': ch.color }}>
            <span className={styles.chIcon}>{ch.icon}</span>{ch.label}
          </div>
        ))}
      </div>
      <div className={styles.captureArrow}>
        <div className={styles.arrowLine} />
        <span className={styles.arrowLabel}>AI Extraction</span>
        <div className={styles.arrowTip} />
      </div>
      <div className={styles.captureOutput}>
        <div className={styles.outputHead}>Structured Invoice</div>
        {fields.map(f => (
          <div key={f.key} className={`${styles.field} ${f.highlight ? styles.fieldHighlight : ''}`}>
            <span className={styles.fieldKey}>{f.key}</span>
            <span className={styles.fieldVal}>{f.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExceptionVisual() {
  return (
    <div className={styles.exWrap}>
      <div className={styles.exHeader}>Exception queue · INV-2846</div>

      <div className={styles.exSection}>
        <div className={styles.exSectionHead}>
          <span className={styles.exSectionTitle}>Tax validation</span>
          <span className={styles.badgeOk}>Validated</span>
        </div>
        <p className={styles.exSectionDesc}>Tax rates, tax amount, and tax code checked against the tax matrix.</p>
        <div className={styles.exMatrixRow}>
          <span className={styles.exMatrixLabel}>Tax code</span>
          <span className={styles.exMatrixValue}>GST 18% → matrix match</span>
        </div>
        <div className={styles.exMatrixRow}>
          <span className={styles.exMatrixLabel}>Tax amount</span>
          <span className={styles.exMatrixValue}>$897.84 → within tolerance</span>
        </div>
      </div>

      <div className={styles.exSection}>
        <div className={styles.exSectionHead}>
          <span className={styles.exSectionTitle}>Charge code validation</span>
          <span className={styles.badgeWarn}>Suggested</span>
        </div>
        <p className={styles.exSectionDesc}>Coding matrix lookup with charge account suggestion and manual override.</p>
        <div className={styles.exMatrixRow}>
          <span className={styles.exMatrixLabel}>Charge code</span>
          <span className={styles.exMatrixValue}>6100 · Office Supplies</span>
        </div>
        <div className={styles.exActions}>
          <button className={styles.exBtn}>Override</button>
          <button className={`${styles.exBtn} ${styles.exBtnPrimary}`}>Accept suggestion</button>
        </div>
      </div>
    </div>
  )
}

function ReviewVisual() {
  const fields = [
    { key: 'Vendor',    val: 'Acme Logistics' },
    { key: 'Invoice #', val: 'INV-2847' },
    { key: 'Amount',    val: '$12,480.00' },
    { key: 'PO match',  val: 'PO-7821', highlight: true },
  ]
  return (
    <div className={styles.reviewWrap}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewDocIcon}>📄</div>
        <div>
          <div className={styles.reviewTitle}>INV-2847 · Acme Logistics</div>
          <div className={styles.reviewSub}>Assigned to Sarah K. for review</div>
        </div>
      </div>
      <div className={styles.reviewBody}>
        <div className={styles.reviewDoc}>
          <div className={styles.reviewDocLine} style={{ width: '85%' }} />
          <div className={styles.reviewDocLine} style={{ width: '60%' }} />
          <div className={styles.reviewDocLine} style={{ width: '70%' }} />
          <div className={styles.reviewDocBlock} />
          <div className={styles.reviewDocLine} style={{ width: '50%' }} />
          <div className={styles.reviewDocLine} style={{ width: '65%' }} />
        </div>
        <div className={styles.reviewFields}>
          {fields.map(f => (
            <div key={f.key} className={`${styles.field} ${f.highlight ? styles.fieldHighlight : ''}`}>
              <span className={styles.fieldKey}>{f.key}</span>
              <span className={styles.fieldVal}>{f.val}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.reviewComment}>
        <span className={styles.reviewCommentLabel}>Comment</span>
        <p>"PO match confirmed, amounts align. Approving."</p>
      </div>
      <div className={styles.exActions}>
        <button className={styles.exBtn}>Reject</button>
        <button className={styles.exBtn}>Request info</button>
        <button className={`${styles.exBtn} ${styles.exBtnPrimary}`}>Approve</button>
      </div>
    </div>
  )
}

function ERPVisual() {
  const stages = [
    { title: 'Approval workflow', desc: 'Assign, comment, approve, reject, or request missing data.' },
    { title: 'CW update',         desc: 'Corrected invoice data pushed to CW / Synthetic App.' },
    { title: 'ERP posting',       desc: 'Direct ERP posting with posting preview, failure handling, and retry.' },
  ]
  return (
    <div className={styles.erpWrap}>
      <div className={styles.erpHeader}>
        <span>INV-2847 · Acme Logistics</span>
        <span className={styles.routeAmt}>$12,480.00</span>
      </div>
      <div className={styles.erpFlow}>
        {stages.map((stage, i) => (
          <div key={stage.title}>
            <div className={styles.erpStage}>
              <div className={styles.erpStageIcon}>✓</div>
              <div className={styles.erpStageBody}>
                <div className={styles.erpStageTitle}>{stage.title}</div>
                <div className={styles.erpStageDesc}>{stage.desc}</div>
              </div>
              <span className={styles.badgeOk}>Completed</span>
            </div>
            {i < stages.length - 1 && <div className={styles.erpConnector} />}
          </div>
        ))}
      </div>
    </div>
  )
}
