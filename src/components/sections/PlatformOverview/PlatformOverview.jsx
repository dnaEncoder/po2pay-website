import styles from './PlatformOverview.module.css'
import Reveal from '../../common/Reveal.jsx'

export default function PlatformOverview() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <Reveal variant="up">
          <div className={styles.head}>
            <div className="eyebrow">
              <span className="dot" />
              Overview
            </div>
            <h2 className={`h2 ${styles.heading}`}>
              See how PO2PAY transforms your{' '}
              <span className="serif-accent">financial document workflow.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal variant="scale" delay={120}>
          <div className={styles.ipad}>
            {/* Screen */}
            <div className={styles.screen}>
              <iframe
                className={styles.iframe}
                src="https://www.youtube.com/embed/M-cK1zhDgTk?controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1"
                title="PO2PAY Platform Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Device frame */}
            <img src="/ipad_outline.png" alt="" className={styles.frame} />
          </div>
        </Reveal>

      </div>
    </section>
  )
}
