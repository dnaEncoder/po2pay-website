import styles from './AnalysisCTA.module.css'

const INPUTS = [
  { key: 'Monthly PO / contract volume', val: '1,200' },
  { key: 'Monthly invoice volume',       val: '2,400' },
  { key: 'Average handling time',        val: '9 days' },
  { key: 'ERP platform',                 val: 'SAP' },
  { key: 'Team size involved',           val: '6 FTEs' },
]

const METRICS = [
  { label: 'Faster review and approval cycles',       pct: 93 },
  { label: 'Lower manual handling dependency',        pct: 82 },
  { label: 'Stronger validation and traceability',    pct: 99 },
]

export default function AnalysisCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Free · 4 minutes · Your real numbers
        </div>

        <h2 className={styles.heading}>
          <strong>See exactly</strong> what process intelligence could recover across your finance operations.
        </h2>

        <p className={styles.sub}>
          Answer a few questions about your document volume, workflow complexity, and manual review effort. Get a tailored ROI snapshot across contracts, POs, and invoices.
        </p>

        <div className={styles.actions}>
          <a className="btn btn-primary" href="#">Run my free analysis →</a>
          <a className="btn btn-ghost-dark" href="#">Talk to an expert</a>
        </div>

        {/* Mockup card */}
        <div className={styles.mockCard}>

          <div className={styles.mockHead}>
            <div className={styles.mockHeadLeft}>
              <span className={styles.brand}>PO2<span className={styles.brandAccent}>PAY</span></span>
              <span className={styles.mockTitle}>Financial Operations Analysis</span>
            </div>
            <span className={styles.readyBadge}>Analysis ready</span>
          </div>

          <div className={styles.mockBody}>

            <div className={styles.inputs}>
              <div className={styles.inputsLabel}>Your inputs</div>
              {INPUTS.map(({ key, val }) => (
                <div key={key} className={styles.inputRow}>
                  <span className={styles.inputKey}>{key}</span>
                  <span className={styles.inputVal}>{val}</span>
                </div>
              ))}
            </div>

            <div className={styles.results}>
              <div className={styles.resultsLabel}>Projected impact · 12 months</div>
              <div className={styles.savingsBlock}>
                <div className={styles.savingsNum}>$1.42M</div>
                <div className={styles.savingsDesc}>Estimated annual recovery</div>
              </div>
              <div className={styles.metrics}>
                {METRICS.map(({ label, pct }) => (
                  <div key={label} className={styles.metric}>
                    <div className={styles.metricBar}>
                      <div className={styles.metricFill} style={{ width: `${pct}%` }} />
                    </div>
                    <span className={styles.metricLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className={styles.mockFoot}>
            <span className={styles.footNote}>Based on your inputs · Updated in real time</span>
            <span className={styles.footCta}>Use my real data →</span>
          </div>

        </div>
      </div>
    </section>
  )
}
