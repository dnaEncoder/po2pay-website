import { useState } from 'react'
import styles from './CaseStudy.module.css'

const CASES = [
  {
    id: 'hertz',
    company: 'Hertz Logistics',
    industry: 'Freight & Logistics',
    challenge: 'Processing 40,000+ invoices monthly across 12 carrier partners with a 3-person AP team. Discrepancy resolution averaged 6 days per dispute.',
    solution: 'Deployed InvoiceIQ across all carrier invoice inflows. Automated 3-way match against POs and rate cards, routing only true exceptions to humans.',
    results: [
      { label: 'Invoice cycle time', from: '6 days', to: '11 hours' },
      { label: 'Touchless rate',     from: '12%',    to: '94%'      },
      { label: 'AP headcount',       from: '3',      to: '1.5'      },
      { label: 'Annual savings',     from: '—',      to: '$1.8M'    },
    ],
    quote: 'PO2PAY turned our AP backlog from a recurring fire drill into a background process. The team now handles exceptions by exception, not by default.',
    author: 'Sarah K., Director of Finance Operations',
    tag: 'InvoiceIQ',
  },
  {
    id: 'brightfoods',
    company: 'Bright Foods Co.',
    industry: 'Consumer Packaged Goods',
    challenge: 'A 3-year MSA with a tier-1 retailer included $2.4M in rebate provisions buried across 14 contract amendments. Finance had no system to track them.',
    solution: 'ContractIQ extracted all rebate clauses, created obligation timelines, and linked each obligation to invoiced transactions in real time.',
    results: [
      { label: 'Rebates recovered (yr 1)', from: '$0',   to: '$2.1M'  },
      { label: 'Contract review time',     from: '4 hrs', to: '18 min' },
      { label: 'Renewal miss rate',        from: '28%',   to: '0%'     },
      { label: 'Visibility into amendments', from: '0%',  to: '100%'   },
    ],
    quote: 'We were sitting on millions we were owed and didn\'t know it. ContractIQ surfaced every provision we had buried and turned them into actual cash recovered.',
    author: 'Marcus T., CFO',
    tag: 'ContractIQ',
  },
  {
    id: 'dunbar',
    company: 'Dunbar Property Group',
    industry: 'Real Estate & Construction',
    challenge: 'Managing 200+ active vendor contracts and 1,500 monthly invoices across a fragmented tool stack. Audit prep took 6 weeks and manual reconciliation errors caused two regulatory findings.',
    solution: 'PO2PAY unified contract intelligence and invoice processing, creating a single ledger of obligations, payments, and discrepancies with complete audit trail.',
    results: [
      { label: 'Audit prep time',   from: '6 weeks', to: '3 days' },
      { label: 'Regulatory findings', from: '2',    to: '0'       },
      { label: 'Vendor disputes',   from: '~40/mo', to: '4/mo'    },
      { label: 'Platform ROI',      from: '—',      to: '11×'     },
    ],
    quote: 'Having contracts and invoices finally in one place — with traceability between them — eliminated an entire category of risk for our finance team.',
    author: 'Rachel O., VP Finance',
    tag: 'Full Platform',
  },
]

export default function CaseStudy() {
  const [open, setOpen] = useState(0)

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.head}>
          <div className="eyebrow"><span className="dot" />Customer outcomes</div>
          <h2 className={`h2 ${styles.heading}`}>
            Results that show up<br />
            <span className={styles.accent}>on the P&amp;L.</span>
          </h2>
          <p className={styles.sub}>
            Real deployments. Measured outcomes. No pilot programs, no custom integrations.
          </p>
        </div>

        <div className={styles.accordion}>
          {CASES.map((c, idx) => (
            <div
              key={c.id}
              className={`${styles.item} ${open === idx ? styles.itemOpen : ''}`}
            >
              <button
                className={styles.trigger}
                onClick={() => setOpen(open === idx ? -1 : idx)}
                aria-expanded={open === idx}
              >
                <div className={styles.triggerLeft}>
                  <span className={`${styles.tag} ${styles[`tag_${c.id}`]}`}>{c.tag}</span>
                  <span className={styles.company}>{c.company}</span>
                  <span className={styles.industry}>{c.industry}</span>
                </div>
                <span className={styles.chevron} aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              <div className={styles.body}>
                <div className={styles.bodyInner}>

                  <div className={styles.cols}>
                    <div className={styles.narrative}>
                      <div className={styles.block}>
                        <div className={styles.blockLabel}>Challenge</div>
                        <p className={styles.blockText}>{c.challenge}</p>
                      </div>
                      <div className={styles.block}>
                        <div className={styles.blockLabel}>How PO2PAY helped</div>
                        <p className={styles.blockText}>{c.solution}</p>
                      </div>
                      <blockquote className={styles.quote}>
                        <span className={styles.quoteText}>"{c.quote}"</span>
                        <cite className={styles.author}>— {c.author}</cite>
                      </blockquote>
                    </div>

                    <div className={styles.results}>
                      <div className={styles.resultsLabel}>Measured outcomes</div>
                      <div className={styles.grid}>
                        {c.results.map(r => (
                          <div key={r.label} className={styles.result}>
                            <div className={styles.resultLabel}>{r.label}</div>
                            <div className={styles.resultNums}>
                              {r.from !== '—' && (
                                <>
                                  <span className={styles.from}>{r.from}</span>
                                  <span className={styles.arrow}>→</span>
                                </>
                              )}
                              <span className={styles.to}>{r.to}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
