import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from '../InvoiceIQ/Features.module.css'
import Reveal from '../../common/Reveal.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const FEATURES = [
  { id: 'extraction', number: '01', title: 'Clause-level Extraction', teaser: 'Extract 90+ clause types out of the box.',         desc: 'Payment terms, renewal notices, SLAs, liability caps, and governing law are read directly from the contract with confidence scoring.' },
  { id: 'po',         number: '02', title: 'PO Intelligence',         teaser: 'Extract and structure purchase order data.',        desc: 'Line items, quantities, units, and pricing are read from inbound POs to ensure billing alignment downstream.' },
  { id: 'validation', number: '03', title: 'Source-linked Validation', teaser: 'Trust your data with 1-click source links.',       desc: 'Every extracted value links directly back to its page and paragraph in the original document for fast human verification.' },
  { id: 'linking',    number: '04', title: 'Invoice Linking',          teaser: 'Connect the contract to the invoice.',             desc: 'Ensure every billed line item aligns with the governing contract terms and the purchase order that authorized it.' },
]

export default function ContractIQFeatures() {
  const sectionRef  = useRef(null)
  const featRefs    = useRef([])
  const visualRefs  = useRef([])
  const activeRef   = useRef(0)

  useGSAP(() => {
    const N = FEATURES.length
    featRefs.current[0]?.classList.add(styles.featActive)
    gsap.set(visualRefs.current[0], { opacity: 1, y: 0, pointerEvents: 'auto' })
    visualRefs.current.slice(1).forEach(el => gsap.set(el, { opacity: 0, y: 40, pointerEvents: 'none' }))

    function activate(nextIdx, dir) {
      const prev = activeRef.current
      if (prev === nextIdx) return
      featRefs.current[prev]?.classList.remove(styles.featActive)
      featRefs.current[nextIdx]?.classList.add(styles.featActive)
      gsap.to(visualRefs.current[prev], { opacity: 0, y: -36*dir, duration: 0.38, ease: 'power2.in', onComplete: () => gsap.set(visualRefs.current[prev], { pointerEvents: 'none' }) })
      gsap.fromTo(visualRefs.current[nextIdx], { opacity: 0, y: 48*dir }, { opacity: 1, y: 0, duration: 0.52, ease: 'power3.out', delay: 0.08, onStart: () => { visualRefs.current[nextIdx].style.pointerEvents = 'auto' } })
      activeRef.current = nextIdx
    }

    ScrollTrigger.create({
      trigger: sectionRef.current, start: 'top top', end: 'bottom bottom',
      onUpdate(self) { activate(Math.min(Math.floor(self.progress * N), N-1), self.direction) },
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
          <div className="eyebrow"><span className="dot" />ContractIQ · Features</div>
          <h2 className={`h2 ${styles.heading}`}>The bridge between <em className={styles.accent}>commercial intent and financial execution.</em></h2>
          <p className={styles.sub}>ContractIQ turns static documents into active operational controls, ensuring your finance team never misses a renewal, a discount, or a billing deviation.</p>
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
    case 'extraction': return <ExtractionVisual />
    case 'po':         return <POVisual />
    case 'validation': return <ValidationVisual />
    case 'linking':    return <LinkingVisual />
    default:           return null
  }
}

function ExtractionVisual() {
  const clauses = [
    { type: 'Payment Terms',  value: 'Net 30 days from invoice',     conf: 98 },
    { type: 'Renewal Notice', value: '60 days prior written notice', conf: 95 },
    { type: 'SLA Uptime',     value: '99.9% monthly availability',   conf: 97 },
    { type: 'Liability Cap',  value: '2× annual contract value',     conf: 91 },
    { type: 'Governing Law',  value: 'State of Delaware, USA',       conf: 99 },
  ]
  return (
    <div className={styles.exWrap}>
      <div className={styles.exHeader}>Extracted clauses · MSA-991</div>
      <div className={styles.exSection}>
        {clauses.map(c => (
          <div key={c.type} className={styles.exMatrixRow}>
            <div>
              <div className={styles.clauseType}>{c.type}</div>
              <div className={styles.clauseValue}>{c.value}</div>
            </div>
            <span className={styles.clauseConf}>{c.conf}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function POVisual() {
  const items = [
    { sku: 'SKU-4421', desc: 'Cloud Storage — 10TB',     qty: '1 unit',  price: '$8,400' },
    { sku: 'SKU-4422', desc: 'Support License — Annual', qty: '5 seats', price: '$2,250' },
    { sku: 'SKU-4423', desc: 'Data Migration Service',   qty: '1 unit',  price: '$3,800' },
  ]
  return (
    <div className={styles.exWrap}>
      <div className={styles.exHeader}>Purchase order · PO-4482</div>
      <div className={styles.poHead}>
        <span>SKU</span><span>Description</span><span>Qty</span><span>Price</span>
      </div>
      {items.map(r => (
        <div key={r.sku} className={styles.poRow}>
          <span className={styles.poCellMono}>{r.sku}</span>
          <span className={styles.poCell}>{r.desc}</span>
          <span className={styles.poCellMono}>{r.qty}</span>
          <span className={styles.poCellMono}>{r.price}</span>
        </div>
      ))}
      <div className={styles.poFooter}>
        <span>Total: <span className={styles.poTotal}>$14,450</span></span>
        <span className={styles.badgeOk}>Extracted</span>
      </div>
    </div>
  )
}

function ValidationVisual() {
  const fields = [
    { label: 'Payment Terms', page: 4,  para: 2, verified: true  },
    { label: 'Renewal Date',  page: 12, para: 1, verified: true  },
    { label: 'SLA Uptime',    page: 8,  para: 3, verified: false },
  ]
  return (
    <div className={styles.exWrap}>
      <div className={styles.exHeader}>Source-linked review · MSA-991</div>
      <div className={styles.exSection}>
        {fields.map(f => (
          <div key={f.label} className={styles.exMatrixRow}>
            <div>
              <div className={styles.clauseType}>{f.label}</div>
              <div className={styles.exMatrixValue}>p.{f.page} · ¶{f.para}</div>
            </div>
            <span className={f.verified ? styles.badgeOk : styles.badgeWarn}>
              {f.verified ? 'Verified' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LinkingVisual() {
  const docs = [
    { id: 'MSA-991',  type: 'Master Service Agreement', desc: 'Governing contract terms and pricing.' },
    { id: 'PO-4482',  type: 'Purchase Order',           desc: 'Line items issued under MSA-991.' },
    { id: 'INV-2846', type: 'Invoice',                  desc: 'Billed against PO-4482 line items.' },
  ]
  return (
    <div className={styles.erpWrap}>
      <div className={styles.erpHeader}>
        <span>Document graph</span>
        <span className={styles.routeAmt}>3 linked</span>
      </div>
      <div className={styles.erpFlow}>
        {docs.map((d, i) => (
          <div key={d.id}>
            <div className={styles.erpStage}>
              <div className={styles.erpStageIcon}>{d.id.charAt(0)}</div>
              <div className={styles.erpStageBody}>
                <div className={styles.erpStageTitle}>{d.id} · {d.type}</div>
                <div className={styles.erpStageDesc}>{d.desc}</div>
              </div>
              <span className={styles.badgeOk}>Linked</span>
            </div>
            {i < docs.length - 1 && <div className={styles.erpConnector} />}
          </div>
        ))}
      </div>
    </div>
  )
}
