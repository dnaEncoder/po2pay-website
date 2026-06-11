import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from './PlatformROI.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STATS = [
  { label: 'Average recovery',                       final: 11.0, format: (v) => `$${v.toFixed(1)}M+` },
  { label: 'Faster cycle completion',                final: 14,   format: (v) => `${Math.round(v)}×`   },
  { label: 'Reduction in manual exception handling', final: 82,   format: (v) => `${Math.round(v)}%`   },
  { label: 'Accuracy across extracted attributes',   final: 99.4, format: (v) => `${v.toFixed(1)}%`    },
]

const CURVE = 'M -10 400 C 160 398 380 340 910 18'
const GRID_X = [100, 200, 300, 400, 500, 600, 700, 800]
const GRID_Y = [70, 140, 210, 280, 350]

export default function PlatformROI() {
  const sectionRef = useRef(null)
  const pathRef    = useRef(null)
  const dotRef     = useRef(null)
  const glowRef    = useRef(null)
  const clipRef    = useRef(null)
  const statRefs   = useRef([])

  useGSAP(() => {
    const path = pathRef.current
    if (!path) return

    const len = path.getTotalLength()
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })

    const origin = path.getPointAtLength(0)
    dotRef.current.setAttribute('cx', origin.x)
    dotRef.current.setAttribute('cy', origin.y)
    glowRef.current.setAttribute('cx', origin.x)
    glowRef.current.setAttribute('cy', origin.y)
    gsap.set([dotRef.current, glowRef.current], { opacity: 0 })

    ScrollTrigger.create({
      trigger: sectionRef.current, start: 'top 68%', once: true,
      onEnter() {
        gsap.to([dotRef.current, glowRef.current], { opacity: 1, duration: 0.3 })
        const proxy = { p: 0 }
        gsap.to(proxy, {
          p: 1,
          duration: 2.6,
          ease: 'power1.inOut',
          onUpdate() {
            const dist = len * proxy.p
            path.style.strokeDashoffset = len - dist
            const pt = path.getPointAtLength(dist)
            dotRef.current.setAttribute('cx', pt.x)
            dotRef.current.setAttribute('cy', pt.y)
            glowRef.current.setAttribute('cx', pt.x)
            glowRef.current.setAttribute('cy', pt.y)
            if (clipRef.current) clipRef.current.setAttribute('width', Math.max(0, pt.x + 20))
            statRefs.current.forEach((el, i) => {
              if (!el) return
              el.textContent = STATS[i].format(STATS[i].final * proxy.p)
            })
          },
          onComplete() {
            gsap.to(glowRef.current, { attr: { r: 28 }, opacity: 0, duration: 0.7, ease: 'power2.out' })
          },
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section} id="roi">
      <div className={styles.container}>

        <div className="eyebrow"><span className="dot" />Platform-wide impact</div>

        <div className={styles.card}>

          <svg className={styles.svg} viewBox="0 0 900 420" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="roiLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#216BFF" stopOpacity="0.55" />
                <stop offset="65%"  stopColor="#216BFF" stopOpacity="0.90" />
                <stop offset="100%" stopColor="#41C7FF" stopOpacity="1.00" />
              </linearGradient>
              <linearGradient id="roiArea" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#216BFF" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#216BFF" stopOpacity="0.00" />
              </linearGradient>
              <filter id="roiGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <clipPath id="roiClip">
                <rect ref={clipRef} x="-20" y="-20" width="0" height="500" />
              </clipPath>
            </defs>
            {GRID_X.map(x => <line key={x} x1={x} y1="0" x2={x} y2="420" stroke="rgba(33,107,255,0.05)" strokeWidth="1" />)}
            {GRID_Y.map(y => <line key={y} x1="0" y1={y} x2="900" y2={y} stroke="rgba(33,107,255,0.05)" strokeWidth="1" />)}
            <g clipPath="url(#roiClip)">
              <path d={`${CURVE} L 910 420 L -10 420 Z`} fill="url(#roiArea)" />
            </g>
            <path ref={pathRef} d={CURVE} fill="none" stroke="url(#roiLine)" strokeWidth="2.5" strokeLinecap="round" />
            <circle ref={glowRef} r="14" fill="rgba(65,199,255,0.22)" filter="url(#roiGlow)" />
            <circle ref={dotRef}  r="5.5" fill="#41C7FF" stroke="#ffffff" strokeWidth="2.5" />
          </svg>

          <div className={styles.content}>
            <h2 className={styles.heading}>
              When documents become<br />
              <strong>active financial intelligence.</strong>
            </h2>
            <p className={styles.sub}>
              PO2PAY customers see compounding value when contracts, POs, and invoices are finally managed in one connected system.
            </p>
            <div className={styles.stats}>
              {STATS.map((stat, i) => (
                <div key={stat.label} className={styles.stat}>
                  <div ref={el => { statRefs.current[i] = el }} className={styles.statNum}>
                    {stat.format(0)}
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
