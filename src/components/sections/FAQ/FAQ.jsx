import { useState } from 'react'
import styles from './FAQ.module.css'
import Reveal from '../../common/Reveal.jsx'

const FAQS = [
  {
    q: 'How does PO2PAY handle document extraction accuracy?',
    a: 'PO2PAY uses a multi-layer extraction pipeline — structured parsing, layout-aware models, and cross-reference validation against existing POs and contracts. For invoices, we achieve a 99.4% touchless extraction rate in production. Confidence scores are surfaced per-field, and every extracted value links back to its source location in the original document.',
  },
  {
    q: 'Does PO2PAY work with our existing ERP and procurement systems?',
    a: 'Yes. PO2PAY connects to SAP, Oracle NetSuite, Microsoft Dynamics, Coupa, Ariba, and 40+ other systems via native integrations and REST APIs. We operate as an intelligent middleware layer — documents flow in, structured data flows out — so your existing financial systems remain authoritative without disruption.',
  },
  {
    q: 'What types of documents does ContractIQ support?',
    a: 'ContractIQ processes MSAs, SOWs, NDAs, purchase orders, amendments, addenda, and custom contract formats. It extracts 90+ clause types out of the box and can be configured to track custom obligations specific to your business. Multi-language support covers 18 languages, and scanned documents are handled via OCR before extraction.',
  },
  {
    q: 'How long does onboarding and deployment take?',
    a: 'Most customers are fully operational within 2–4 weeks. The first week covers system integration and document ingestion. Week two runs historical backfill and exception tuning. Weeks three and four are live operation with a dedicated success engineer. We have no multi-month implementation projects — PO2PAY is designed to go live fast.',
  },
  {
    q: 'Is our financial document data secure?',
    a: 'PO2PAY is SOC 2 Type II certified and supports GDPR and CCPA compliance requirements. Documents are encrypted at rest (AES-256) and in transit (TLS 1.3). We offer single-tenant private cloud deployments and on-premise options for regulated industries. No document data is used to train external models.',
  },
  {
    q: 'What makes PO2PAY different from a standard OCR or document processing tool?',
    a: 'OCR tools digitize documents. PO2PAY understands them. The difference is that our models reason about what a clause means, whether a line item is consistent with a PO, and whether an obligation has been triggered — not just what the text says. Our system integrates document intelligence with financial workflow, so outcomes are automated, not just data.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  function toggle(i) {
    setOpen(prev => prev === i ? null : i)
  }

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>

        <Reveal variant="up">
          <div className={styles.head}>
            <div className="eyebrow"><span className="dot" />FAQ</div>
            <h2 className={`h2 ${styles.heading}`}>
              Questions we get asked.
            </h2>
            <p className={styles.sub}>
              Everything you need to evaluate whether PO2PAY is the right fit for your team.
            </p>
          </div>
        </Reveal>

        <div className={styles.list}>
          {FAQS.map((faq, i) => (
            <Reveal key={i} variant="up" delay={i * 60}>
              <div
                className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}
              >
                <button
                  className={styles.trigger}
                  onClick={() => toggle(i)}
                  aria-expanded={open === i}
                >
                  <span className={styles.q}>{faq.q}</span>
                  <span className={styles.icon} aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M5 7.5l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                <div className={styles.answer}>
                  <div className={styles.answerInner}>
                    <p>{faq.a}</p>
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
