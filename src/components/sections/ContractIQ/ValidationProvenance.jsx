import { Fragment } from 'react'
import styles from './ValidationProvenance.module.css'
import Reveal from '../../common/Reveal.jsx'

const STAGES = [
  {
    key: 'extract',
    label: 'Extract',
    icon: (
      <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
        <path d="M6 2.5h7l3.5 3.5V19a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M13 2.5v3.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7.5 12h5M7.5 15h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'explain',
    label: 'Explain',
    sub: 'Reasoning + confidence',
    core: 'CQ',
  },
  {
    key: 'verify',
    label: 'Verify',
    sub: 'Human approval',
    icon: (
      <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3.5 19c0-3.6 3.1-6.2 7.5-6.2s7.5 2.6 7.5 6.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14.5 12.7l1.4 1.4 2.6-2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'trace',
    label: 'Trace',
    sub: 'Source-linked output',
    icon: (
      <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
        <path d="M6 2.5h7l3.5 3.5V19a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M13 2.5v3.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="9" cy="13" r="1.3" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M10.1 13.9l2.4 1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const CARDS = [
  {
    title: 'Answer vs reasoning',
    desc: 'See extracted answers with supporting logic.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2.5a4.8 4.8 0 0 1 2.7 8.8c-.5.35-.8.9-.8 1.5v.7h-3.8v-.7c0-.6-.3-1.15-.8-1.5A4.8 4.8 0 0 1 11 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9.1 16.5h3.8M9.6 19h2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Confidence score',
    desc: 'Flag low-confidence fields for review.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 14.5a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 14.5l3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="14.5" r="1.1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Source highlighting',
    desc: 'Trace values back to exact clauses.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M5 3.5h12a1 1 0 0 1 1 1V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="6.5" y="7" width="9" height="2.4" rx="0.4" fill="currentColor" opacity="0.18"/>
        <path d="M6.5 8.2h9M6.5 11.5h9M6.5 14.5h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Version control',
    desc: 'Track changes across document revisions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 6.5V11l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const OUTCOMES = [
  { title: 'Validated',  desc: 'Critical fields reviewed before release.' },
  { title: 'Traceable',  desc: 'Every output stays linked to source.' },
  { title: 'ERP-ready',  desc: 'Structured data moves downstream cleanly.' },
]

const CHECK_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6.5 10.2l2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ContractIQValidationProvenance() {
  return (
    <section className={styles.section}>
      <div className={styles.dark}>
        <div className={styles.container}>

          <Reveal variant="up">
            <div className={styles.head}>
              <div className={styles.eyebrow}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2l6.5 2.5v4.2c0 4.3-2.7 7.6-6.5 9.3-3.8-1.7-6.5-5-6.5-9.3V4.5L10 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  <path d="M7.2 10l1.9 1.9 3.7-4.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                ContractIQ Validation &amp; Provenance
              </div>
              <h2 className={`h2 ${styles.heading}`}>
                Every extracted answer,<br />
                <span className={styles.accent}>fully traceable.</span>
              </h2>
              <p className={styles.sub}>
                ContractIQ validates extracted contract data, links every answer back to its source, and keeps human review in the loop before export.
              </p>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={120}>
            <div className={styles.workflow}>
              {STAGES.map((s, i) => (
                <Fragment key={s.key}>
                  <div className={styles.stage}>
                    {s.core ? (
                      <div className={styles.coreCircle}>{s.core}</div>
                    ) : (
                      <div className={styles.stageIcon}>{s.icon}</div>
                    )}
                    <div className={styles.stageLabel}>{s.label}</div>
                    {s.sub && <div className={styles.stageSub}>{s.sub}</div>}
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className={styles.connector}>
                      <span className={styles.connLine} />
                      <span className={styles.connArrow}>→</span>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </Reveal>

        </div>
      </div>

      <div className={styles.light}>
        <div className={styles.container}>

          <div className={styles.cards}>
            {CARDS.map((c, i) => (
              <Reveal key={c.title} variant="up" delay={i * 100}>
                <div className={styles.card}>
                  <div className={styles.cardIcon}>{c.icon}</div>
                  <div className={styles.cardTitle}>{c.title}</div>
                  <p className={styles.cardDesc}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className={styles.outcomeStrip}>
            {OUTCOMES.map((o, i) => (
              <Reveal key={o.title} variant="up" delay={i * 100}>
                <div className={styles.outcomeCol}>
                  <span className={styles.outcomeIcon}>{CHECK_ICON}</span>
                  <div>
                    <div className={styles.outcomeTitle}>{o.title}</div>
                    <div className={styles.outcomeDesc}>{o.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
