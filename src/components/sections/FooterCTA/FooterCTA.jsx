import styles from './FooterCTA.module.css'

const STATS = [
  { label: 'Avg. cost reduction', value: '$2.4M' },
  { label: 'Touchless rate',      value: '99.4%' },
  { label: 'Cycle time reduction', value: '14×'  },
]

export default function FooterCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.glow} aria-hidden />
        <div className={styles.glow2} aria-hidden />

        <div className={styles.content}>
          <div className="eyebrow-dark"><span className="dot" />Get started today</div>

          <h2 className={styles.heading}>
            Stop managing documents.<br />
            <span className={styles.accent}>Start managing outcomes.</span>
          </h2>

          <p className={styles.sub}>
            PO2PAY turns your invoice and contract operations into a connected intelligence layer.
            Most customers are live within two weeks.
          </p>

          <div className={styles.actions}>
            <a href="#" className="btn btn-primary btn-lg">Book a demo</a>
            <a href="#" className="btn btn-ghost-dark btn-lg">Talk to sales</a>
          </div>

          <div className={styles.stats}>
            {STATS.map(s => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statVal}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mockup} aria-hidden>
          <div className={styles.mockHeader}>
            <div className={styles.mockDots}>
              <span /><span /><span />
            </div>
            <div className={styles.mockUrl}>app.po2pay.io / dashboard</div>
          </div>
          <div className={styles.mockBody}>
            <div className={styles.mockRow}>
              <div className={styles.mockLabel}>AP Cycle Status</div>
              <div className={styles.mockBar}>
                <div className={styles.mockFill} style={{ '--w': '94%' }} />
              </div>
              <span className={styles.mockBadgeGreen}>94% clean</span>
            </div>
            <div className={styles.mockRow}>
              <div className={styles.mockLabel}>Contract Coverage</div>
              <div className={styles.mockBar}>
                <div className={styles.mockFill} style={{ '--w': '100%', background: 'linear-gradient(90deg,#7C3AED,#a78bfa)' }} />
              </div>
              <span className={styles.mockBadgePurple}>100%</span>
            </div>
            <div className={styles.mockRow}>
              <div className={styles.mockLabel}>Open Exceptions</div>
              <div className={styles.mockBar}>
                <div className={styles.mockFill} style={{ '--w': '6%', background: '#F59E0B' }} />
              </div>
              <span className={styles.mockBadgeAmber}>6%</span>
            </div>
            <div className={styles.mockDivider} />
            <div className={styles.mockCards}>
              <div className={styles.mockCard}>
                <div className={styles.mockCardVal}>$11.2M</div>
                <div className={styles.mockCardLabel}>Recovered YTD</div>
              </div>
              <div className={styles.mockCard}>
                <div className={styles.mockCardVal}>4,218</div>
                <div className={styles.mockCardLabel}>Invoices processed</div>
              </div>
              <div className={styles.mockCard}>
                <div className={styles.mockCardVal}>0</div>
                <div className={styles.mockCardLabel}>Missed renewals</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
