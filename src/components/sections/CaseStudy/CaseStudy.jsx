import { useState } from 'react'
import styles from './CaseStudy.module.css'
import Reveal from '../../common/Reveal.jsx'

const ARTICLES = [
  {
    id: 'manual-workflows',
    tag: 'Operations',
    title: 'Why Manual Finance Workflows Still Break at Scale',
    excerpt: 'Manual finance work doesn’t fail from a lack of software — it fails because the work itself is fragmented.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5h4l3 4 3-4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 15h4l3-4 3 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 3l2 2-2 2M15 13l2 2-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    intro: 'Finance teams don’t usually break because they lack software — they break because the work itself is fragmented. Teams juggle PDFs, spreadsheets, email threads, ERP screens, and manual approvals, and every extra system in a workflow makes it less reliable.',
    highlights: [
      { title: '"Alt-Tab fatigue"', text: 'Constant switching between documents, spreadsheets, and ERP screens slows review and increases the chance of missed details.' },
      { title: 'Complexity, not just volume', text: 'Contracts with multiple clauses and conditions buckle manual review processes built around human stamina.' },
      { title: 'Hidden error exposure', text: 'Manual "fat-finger" mistakes move silently into approvals, postings, and downstream systems.' },
      { title: 'No real visibility', text: 'Work sits "with finance" with no record of what’s blocked, corrected, or current.' },
    ],
    close: 'The fix isn’t removing every human — it’s removing unnecessary manual burden. InvoiceIQ and ContractIQ keep humans in the loop while giving teams structure, traceability, and one coherent system instead of fragmented tools.',
  },
  {
    id: 'document-intelligence',
    tag: 'Platform',
    title: 'What Is Financial Document Intelligence?',
    excerpt: 'Documents aren’t passive records — they contain operational truth. Here’s the layered model behind turning them into usable input.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l8 4-8 4-8-4 8-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M2 10l8 4 8-4M2 14l8 4 8-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    intro: 'Documents aren’t passive records — they carry operational truth: values, terms, clauses, and obligations. Financial document intelligence is the discipline of turning that into structured, reviewable, usable input, and it goes well beyond OCR.',
    highlights: [
      { title: 'Ingestion', text: 'Receiving financial documents from PDFs, scans, and workflow channels in a way that supports downstream structure.' },
      { title: 'Extraction', text: 'Pulling structured fields — line items, clauses, dates, vendors — out of unstructured files.' },
      { title: 'Interpretation', text: 'Applying logic, reasoning, and confidence scoring instead of just copying text.' },
      { title: 'Validation', text: 'Human review before anything moves downstream — trust, not just throughput.' },
      { title: 'Routing', text: 'Moving validated data into approvals, exports, and ERP systems.' },
      { title: 'Provenance', text: 'Tracing every answer back to its source, version, and verifier.' },
    ],
    list: {
      heading: 'Questions worth asking',
      items: [
        'Does it structure the fields that matter to us?',
        'Can it show its reasoning and confidence?',
        'Does it preserve provenance and fit our ERP and workflows?',
      ],
    },
    close: 'Financial document intelligence isn’t one feature — it’s a layered operating model that turns financial documents into trustworthy workflow inputs, not just readable files.',
  },
  {
    id: 'ocr-validation',
    tag: 'Validation',
    title: 'OCR Is Not Enough: Why Validation Matters in Enterprise Finance',
    excerpt: 'Reading text off a page was never the hard part. The real complexity begins after the document becomes machine-readable.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="4" y="2" width="12" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M7 10l2.2 2.2L14 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    intro: 'OCR turns scanned documents into machine-readable text — but reading text is only the beginning. In enterprise finance, the real complexity starts after the document becomes readable.',
    highlights: [
      { title: 'Text isn’t meaning', text: 'OCR tells you what characters exist, not what they mean — semantic parsing, validation, and review have to do the rest.' },
      { title: 'Financial data is relational', text: 'A total can look correct but still fail on tax treatment, PO matching, or charge codes.' },
      { title: 'Governed confidence', text: 'Reasoning, confidence scores, and source citations let reviewers verify an answer instead of just trusting it.' },
      { title: 'Versioning matters', text: 'Addendums and contract revisions need traceable, version-aware review, not one-time extraction.' },
    ],
    list: {
      heading: 'Questions worth asking',
      items: [
        'What happens after the OCR — how is structure applied?',
        'Where is confidence shown, and where does human review happen?',
        'Can the output be traced back to its source?',
      ],
    },
    close: 'OCR is table stakes, not the finish line. The real value is in how a platform validates, explains, routes, and preserves provenance for what it extracts.',
  },
  {
    id: 'review-first-ai',
    tag: 'Human-in-the-Loop',
    title: 'Review-First AI: Why Human-in-the-Loop Still Matters in Finance Operations',
    excerpt: 'The right goal isn’t “no humans.” It’s less unnecessary manual work, with stronger control where judgment matters.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M3.5 17c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M14.5 12.5l1.8 1.8 3.2-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    intro: 'A lot of AI messaging chases the same promise: remove the human, automate everything. In finance, the better goal is less unnecessary manual work, with stronger control where judgment matters.',
    highlights: [
      { title: 'Machines do the repetition', text: 'Reading documents, extracting fields, comparing values, and routing exceptions.' },
      { title: 'Humans hold accountability', text: 'Approving postings, verifying clauses, and signing off before anything goes live.' },
      { title: 'Builds trust and adoption', text: 'Teams can see reasoning, confidence, and sources — and keep override authority.' },
      { title: 'Aligns with governance', text: 'Audit trails, approval gates, and provenance fit how enterprises already operate.' },
    ],
    close: 'The future of finance AI isn’t "remove the reviewer" — it’s "upgrade the reviewer." Let the platform structure, route, and prepare; let humans decide where it matters.',
  },
]

export default function CaseStudy() {
  const [open, setOpen] = useState(0)

  return (
    <section className={styles.section} id="case">
      <div className={styles.container}>

        <Reveal variant="up">
          <div className={styles.head}>
            <div className="eyebrow"><span className="dot" />Insights</div>
            <h2 className={`h2 ${styles.heading}`}>
              Perspectives on{' '}
              <span className={styles.accent}>financial document intelligence.</span>
            </h2>
            <p className={styles.sub}>
              Ideas and frameworks for finance and procurement teams navigating documents, validation, and AI-assisted review.
            </p>
          </div>
        </Reveal>

        <div className={styles.accordion}>
          {ARTICLES.map((a, idx) => (
            <Reveal key={a.id} variant="up" delay={idx * 100}>
            <div
              className={`${styles.item} ${open === idx ? styles.itemOpen : ''}`}
            >
              <button
                className={styles.trigger}
                onClick={() => setOpen(open === idx ? -1 : idx)}
                aria-expanded={open === idx}
              >
                <div className={styles.triggerLeft}>
                  <span className={`${styles.triggerIcon} ${styles[`icon_${a.id}`]}`}>{a.icon}</span>
                  <span className={`${styles.tag} ${styles[`tag_${a.id}`]}`}>{a.tag}</span>
                  <span className={styles.title}>{a.title}</span>
                  <span className={styles.excerpt}>{a.excerpt}</span>
                </div>
                <span className={styles.chevron} aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              <div className={styles.body}>
                <div className={styles.bodyInner}>
                  <div className={styles.article}>
                    <p className={styles.articleIntro}>{a.intro}</p>

                    <div className={styles.highlights}>
                      {a.highlights.map(h => (
                        <div key={h.title} className={styles.highlight}>
                          <span className={styles.highlightIcon} aria-hidden>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3"/>
                              <path d="M4.5 7l1.8 1.8L10 5.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          <span className={styles.highlightText}>
                            <strong>{h.title}</strong> — {h.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {a.list && (
                      <div className={styles.listBlock}>
                        <div className={styles.listHeading}>{a.list.heading}</div>
                        <ul className={styles.articleList}>
                          {a.list.items.map(item => (
                            <li key={item} className={styles.articleListItem}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className={styles.articleClose}>{a.close}</p>
                  </div>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
