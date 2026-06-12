import { Fragment } from 'react'
import styles from './ProductsIntro.module.css'
import Reveal from '../../common/Reveal.jsx'

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PRODUCTS = [
  {
    id: 'invoiceiq',
    icon: 'I',
    accentClass: '',
    name: 'InvoiceIQ',
    desc: 'AI-powered invoice extraction, validation support, exception visibility, and cleaner finance workflow movement.',
    link: { href: '#invoiceiq', label: 'Explore InvoiceIQ →' },
    steps: [
      {
        label: 'Capture Invoice',
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 11v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 3v9M6.5 9l3.5 3.5L13.5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        label: 'Extract & Validate',
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 2.5h7l3 3v12H5v-15z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M12 2.5v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M7.5 11.2l1.8 1.8L13 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        label: 'Route to Review / ERP',
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2.5" y="2.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
            <rect x="11.5" y="11.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M8.5 5.5h2.5a2 2 0 0 1 2 2v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M11 8l2 2 2-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
    ],
    pills: [
      {
        label: 'Extracts invoice data',
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 1.5h5.5L13 5v9.5H4v-13z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M9.5 1.5v3.5H13" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        label: 'Flags exceptions',
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5L1.5 13h13L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            <circle cx="8" cy="11.2" r="0.8" fill="currentColor"/>
          </svg>
        ),
      },
      {
        label: 'Routes for review',
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h10m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 2.5v11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="1.5 2.5"/>
          </svg>
        ),
      },
    ],
  },
  {
    id: 'contractiq',
    icon: 'C',
    accentClass: styles.cardContract,
    name: 'ContractIQ',
    desc: 'AI-native PO and contract intelligence with reasoning, human validation, source-linked review, and version-aware control.',
    link: { href: '#contractiq', label: 'Explore ContractIQ →' },
    steps: [
      {
        label: 'Read Contract + PO',
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 2.5h7l3 3v12H5v-15z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M12 2.5v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M7 12.2c1-1.4 2.2-2.1 3.5-2.1s2.5.7 3.5 2.1c-1 1.4-2.2 2.1-3.5 2.1S8 13.6 7 12.2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            <circle cx="10.5" cy="12.2" r="1" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
        ),
      },
      {
        label: 'Check Obligations & Mismatches',
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2.5" y="5" width="10" height="12.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <rect x="6.5" y="2" width="10" height="12.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M9.5 7l2.5 2.5M12 7l-2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        label: 'Review & Version History',
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M10 5.5v5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
    ],
    pills: [
      {
        label: 'Reads contracts & POs',
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 1.5h5.5L13 5v9.5H4v-13z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M9.5 1.5v3.5H13" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M6 9.5h4M6 11.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        label: 'Finds obligations & mismatches',
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M6 8.5l1.5 1.5L10.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        label: 'Version-aware review',
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5a6.5 6.5 0 1 1-4.6 1.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M2 1.5v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 4.5v3.5l2.2 1.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
    ],
  },
]

export default function ProductsIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <Reveal variant="up">
          <div className={styles.head}>
            <div className="eyebrow eyebrow-dark"><span className="dot" />Two products. One platform.</div>
            <h2 className={`h2 ${styles.heading}`}>
              Meet the <span className={styles.accent}>engines</span> behind PO2PAY.
            </h2>
            <p className={styles.desc}>
              InvoiceIQ brings structure to invoice processing. ContractIQ turns contracts and purchase orders into validated financial intelligence&mdash;creating clearer, faster operations.
            </p>
            <div className={styles.connector}>
              <span className={styles.connectorPill}>One platform. End-to-end PO2PAY.</span>
              <span className={styles.connectorLine} />
            </div>
          </div>
        </Reveal>

        <div className={styles.pair}>
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} variant="up" delay={i * 120}>
            <div className={`${styles.card} ${product.accentClass}`}>
              <div className={styles.cardLeft}>
                <div className={`${styles.icon} ${product.id === 'contractiq' ? styles.iconContract : ''}`}>{product.icon}</div>
                <div className={styles.name}>{product.name}</div>
                <p className={styles.cardDesc}>{product.desc}</p>
                <a className={styles.link} href={product.link.href}>{product.link.label}</a>
              </div>

              <div className={styles.cardRight}>
                <div className={styles.workflow}>
                  {product.steps.map((step, i) => (
                    <Fragment key={step.label}>
                      <div className={styles.step}>
                        <div className={styles.stepIcon}>{step.icon}</div>
                        <span className={styles.stepLabel}>{step.label}</span>
                      </div>
                      {i < product.steps.length - 1 && (
                        <span className={styles.stepArrow}>{ARROW}</span>
                      )}
                    </Fragment>
                  ))}
                </div>

                <div className={styles.pills}>
                  {product.pills.map((pill) => (
                    <div key={pill.label} className={styles.pill}>
                      <span className={styles.pillIcon}>{pill.icon}</span>
                      {pill.label}
                    </div>
                  ))}
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
