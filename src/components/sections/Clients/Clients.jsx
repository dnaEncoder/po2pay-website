import styles from './Clients.module.css'

const CLIENTS = [
  { name: 'Aurelia',      style: 'serif'  },
  { name: 'NORTHWIND',    style: 'mono'   },
  { name: '◆ Helix',      style: 'normal' },
  { name: 'Bramble & Co', style: 'serif'  },
  { name: 'CIRRUS/9',     style: 'mono'   },
  { name: '⬢ Quanta',     style: 'normal' },
  { name: 'FRAME—07',     style: 'mono'   },
  { name: 'Marlowe',      style: 'serif'  },
  { name: '▲ Vanta Labs', style: 'normal' },
  { name: 'Pemberton',    style: 'serif'  },
  { name: 'SOLVENT.IO',   style: 'mono'   },
  { name: '◉ Ridgeline',  style: 'normal' },
]

export default function Clients() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.head}>
          <div className="eyebrow"><span className="dot" />The standard for enterprise</div>
          <h2 className={`h2 ${styles.heading}`}>
            Trusted by <span className={styles.accent}>high-volume</span> financial environments.
          </h2>
        </div>

        <div className={styles.grid}>
          {CLIENTS.map((c) => (
            <div key={c.name} className={`${styles.cell} ${styles[c.style]}`}>
              {c.name}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
