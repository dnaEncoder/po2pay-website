import { useState } from 'react'
import styles from './IndustryProblem.module.css'
import Reveal from '../../common/Reveal.jsx'

const CARDS = [
  {
    id: 'manual',
    title: 'Critical finance work still depends on manual handling.',
    desc: 'Teams re-enter data, chase approvals, compare files across systems, and spend high-value time on repetitive operational work.',
    visual: 'bars',
    popup: {
      heading: 'Critical finance work still depends on manual handling.',
      sub: 'Finance and procurement teams still rely on PDFs, spreadsheets, email threads, and disconnected systems to process important financial documents. That creates operational drag, slower decisions, and higher error exposure as volume grows.',
      checks: ['Reduce repetitive document handling', 'Bring structured extraction into the workflow', 'Cut cross-system rework', 'Free teams for higher-value review'],
      stats: [['60 min', 'Manual contract review can take up to this per document'], ['4 min', 'Validation can be reduced to under this in HITL workflows'], ['4%', 'Manual extraction error exposure in contract review'], ['1 system', 'Unified workflow instead of fragmented handoffs']],
    },
  },
  {
    id: 'buried',
    title: 'Important data is buried inside documents.',
    desc: 'Financial terms, obligations, mismatches, and approvals stay hidden until someone manually finds them.',
    visual: 'docs',
    popup: {
      heading: 'Important financial intelligence stays trapped inside documents.',
      sub: 'Key values, clauses, obligations, mismatches, and risk signals often remain buried across contracts, POs, and invoices. Without structured extraction and review, teams are forced into slow manual interpretation.',
      checks: ['Surface critical data faster', 'Connect extracted values to workflow actions', 'Improve exception visibility', 'Create clearer operational status'],
      stats: [['90+', 'Clause types supported in ContractIQ extraction logic'], ['100%', 'AI-led reading before validator approval'], ['0 blind spots', 'Source-linked review for key extracted fields'], ['1 flow', 'Extraction, review, and approval in one process']],
    },
  },
  {
    id: 'fragmented',
    title: 'Decisions slow down when validation is fragmented.',
    desc: 'Without structured review, version history, provenance, and approvals become harder to trust.',
    visual: 'orbit',
    popup: {
      heading: 'Weak validation and traceability create risk.',
      sub: 'When teams cannot clearly see where extracted data came from, what changed, who approved it, or which version is current, confidence drops. That affects governance, approval speed, and downstream financial control.',
      checks: ['Human-in-the-loop verification', 'Source-linked document review', 'Version tracking and reprocessing', 'Approval-ready audit trails'],
      stats: [['1 click', 'Jump from extracted value to source location'], ['V8 → V9', 'Clear version continuity for updated documents'], ['100%', 'Verified fields tied to user and timestamp'], ['3 facts', 'Page, version, and validator identity tracked']],
    },
  },
]

export default function IndustryProblem() {
  const [popup, setPopup] = useState(null)

  const openPopup = (card) => {
    setPopup(card.popup)
    document.body.style.overflow = 'hidden'
  }

  const closePopup = () => {
    setPopup(null)
    document.body.style.overflow = ''
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <Reveal variant="up">
          <div className={styles.head}>
            <div className="eyebrow eyebrow-dark"><span className="dot" />The operations problem</div>
            <h2 className={`h2 ${styles.heading}`}>
              Finance teams are still{' '}
              <em className={styles.em}>buried in documents, handoffs, and avoidable delays.</em>
            </h2>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {CARDS.map((card, i) => (
            <Reveal key={card.id} variant="up" delay={i * 100}>
              <button
                className={`${styles.card} ${i === 0 ? styles.cardWide : ''}`}
                onClick={() => openPopup(card)}
              >
                <span className={styles.expand}>↗</span>
                <p className={styles.cardTitle}>{card.title}</p>
                <p className={styles.cardDesc}>{card.desc}</p>
                <div className={styles.visual}>
                  {card.visual === 'bars' && (
                    <div className={styles.vizFlow}>
                      <img
                        src="/critical_finance_statement.png"
                        alt="Manual workflow: invoice received, re-entered into spreadsheet, ERP, cross-checked, and chased for approval — repeated by hand for every document"
                        className={styles.vizFlowImg}
                      />
                    </div>
                  )}
                  {card.visual === 'docs' && (
                    <div className={styles.vizDocsWrap}>
                      <img
                        src="/burried_document.png"
                        alt="Key financial data buried inside a document: an obligation amount, a PO mismatch, and a pending approval, only found by searching"
                        className={styles.vizDocsImg}
                      />
                    </div>
                  )}
                  {card.visual === 'orbit' && (
                    <div className={styles.vizOrbit}>
                      <img
                        src="/Validation_problem_statement.png"
                        alt="Validation fragmented across systems: ERP, banks, e-sign, CRM, and history all disconnected from the source document"
                        className={styles.vizOrbitImg}
                      />
                    </div>
                  )}
                </div>
              </button>
            </Reveal>
          ))}
        </div>

      </div>

      {/* Popup overlay */}
      {popup && (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && closePopup()}>
          <div className={styles.modal}>
            <button className={styles.close} onClick={closePopup} aria-label="Close">✕</button>
            <div className={styles.modalGrid}>
              <div>
                <h3 className={styles.modalHeading}>{popup.heading}</h3>
                <p className={styles.modalSub}>{popup.sub}</p>
                <div className={styles.modalActions}>
                  <a className="btn btn-primary" href="#">Solve this with PO2PAY →</a>
                  <a className="btn btn-ghost" href="#">Read the playbook</a>
                </div>
              </div>
              <ul className={styles.checks}>
                {popup.checks.map((c, i) => (
                  <li key={i}><span className={styles.checkMark}>✓</span>{c}</li>
                ))}
              </ul>
            </div>
            <div className={styles.stats}>
              {popup.stats.map(([num, lbl], i) => (
                <div key={i} className={styles.stat}>
                  <div className={styles.statNum}>{num}</div>
                  <div className={styles.statLbl}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
