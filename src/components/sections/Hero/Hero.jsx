import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import favicon from '../../../assets/favicon.png'
import styles from './Hero.module.css'

gsap.registerPlugin(useGSAP)

/* ── Canvas tunables ─────────────────────────────── */
const GRID           = 38
const ARROW_SIZE     = 11
const LINE_WIDTH     = 1.35
const BASE_ALPHA     = 0.18
const WAVE_AMP       = 0.22
const BASE_ANGLE     = Math.PI / 4
const MOUSE_RADIUS   = 320
const MOUSE_STRENGTH = 0.92
const LERP_MOUSE     = 0.09
const LERP_WAVE      = 0.04
const SMOOTH_CURSOR  = 0.14
const ARROW_COLOR    = '#41C7FF'
const BG_COLOR       = '#07192D'

function lerpAngle(a, b, t) {
  let diff = b - a
  while (diff >  Math.PI) diff -= Math.PI * 2
  while (diff < -Math.PI) diff += Math.PI * 2
  return a + diff * t
}

/* ── Engine node icons ───────────────────────────── */
const IcoDoc = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/>
  </svg>
)
const IcoUsers = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IcoAudit = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
)
const IcoFlow = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <path d="M6 9v6M13.5 6H18M13.5 18H18"/>
  </svg>
)
const IcoChart = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
)
const IcoAlert = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)
const IcoSpark = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)
const IcoLayer = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
)

const INPUT_DOCS = [
  { label: 'Contracts',       widths: [75, 55, 85, 50] },
  { label: 'Purchase Orders', widths: [65, 80, 45, 70] },
  { label: 'Invoicing',       widths: [85, 50, 75, 60] },
]

const OUTPUT_CARDS = [
  { Icon: IcoChart, label: 'Operational Visibility',   sub: 'Real-time dashboards',    color: '#41C7FF' },
  { Icon: IcoAlert, label: 'Exceptions & Escalations', sub: 'Auto-flagged & routed',   color: '#F4B860' },
  { Icon: IcoSpark, label: 'Insights & Analytics',     sub: 'Spend intelligence',      color: '#6DE3D6' },
  { Icon: IcoLayer, label: 'ERP Integration',          sub: 'SAP · Oracle · NetSuite', color: '#6D5EF8' },
]

export default function Hero() {
  const heroRef      = useRef(null)
  const canvasRef    = useRef(null)
  const ringRef      = useRef(null)
  const scrollCueRef = useRef(null)
  const mouseRef     = useRef({ x: -9999, y: -9999, active: false, sx: -9999, sy: -9999 })
  const glowRef      = useRef({ c1x: 0.22, c1y: 0.20, c2x: 0.82, c2y: 0.16, c3x: 0.10, c3y: 0.78 })
  const sizeRef      = useRef({ W: 0, H: 0 })
  const cellsRef     = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const hero   = heroRef.current
    const ring   = ringRef.current
    if (!canvas || !hero) return

    const ctx = canvas.getContext('2d')
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    function buildGrid() {
      const { W, H } = sizeRef.current
      const prev = {}
      cellsRef.current.forEach(c => { prev[c.id] = c.angle })
      const next = []
      const cols = Math.ceil(W / GRID) + 2
      const rows = Math.ceil(H / GRID) + 2
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const id = `${r}_${c}`
          next.push({
            id,
            x:     c * GRID + GRID / 2,
            y:     r * GRID + GRID / 2,
            ox:    (Math.random() - 0.5) * GRID * 0.30,
            oy:    (Math.random() - 0.5) * GRID * 0.30,
            size:  0.82 + Math.random() * 0.36,
            angle: prev[id] ?? BASE_ANGLE,
          })
        }
      }
      cellsRef.current = next
    }

    function resize() {
      const W = hero.offsetWidth  || window.innerWidth
      const H = hero.offsetHeight || window.innerHeight
      sizeRef.current = { W, H }
      canvas.width  = W * DPR
      canvas.height = H * DPR
      canvas.style.width  = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(DPR, DPR)
      buildGrid()
    }

    function getAlpha(x, y, t) {
      const { W, H } = sizeRef.current
      const m = mouseRef.current
      const d    = Math.sqrt((x - W * 0.5) ** 2 + (y - H * 0.46) ** 2)
      const maxD = Math.sqrt((W * 0.5) ** 2 + (H * 0.5) ** 2)
      const df   = 1 - Math.pow(d / maxD, 1.1) * 0.58
      const w1   = Math.sin(d * 0.016 - t * 0.88) * 0.50
      const w2   = Math.sin((x + y) * 0.0085 - t * 0.52) * 0.32
      const w3   = Math.sin((x - y) * 0.0070 + t * 0.38) * 0.22
      const wave = (w1 + w2 + w3) / 3
      const edge = Math.min(1, Math.min(x, y, W - x, H - y) / 110)
      let cursorBoost = 0
      if (m.active) {
        const cd = Math.sqrt((x - m.sx) ** 2 + (y - m.sy) ** 2)
        cursorBoost = Math.max(0, 1 - cd / MOUSE_RADIUS) * 0.20
      }
      return Math.max(0.04, Math.min(0.72, (BASE_ALPHA * df + WAVE_AMP * wave * df + cursorBoost) * edge))
    }

    function getWaveAngle(x, y, t) {
      return BASE_ANGLE + Math.sin((x + y) * 0.0072 - t * 0.55) * 0.055
    }

    function mouseInfluence(ax, ay) {
      const m = mouseRef.current
      if (!m.active) return 0
      const d = Math.sqrt((ax - m.sx) ** 2 + (ay - m.sy) ** 2)
      if (d > MOUSE_RADIUS) return 0
      const t = 1 - d / MOUSE_RADIUS
      return MOUSE_STRENGTH * t * t
    }

    function drawArrow(cx, cy, size, angle, alpha) {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)
      ctx.globalAlpha = alpha
      const h = size * 0.5, head = size * 0.40
      ctx.beginPath()
      ctx.moveTo(-h,  h); ctx.lineTo( h, -h)
      ctx.moveTo( h, -h); ctx.lineTo( h - head, -h)
      ctx.moveTo( h, -h); ctx.lineTo( h, -h + head)
      ctx.stroke()
      ctx.restore()
    }

    function drawBackground() {
      const { W, H } = sizeRef.current
      const g = glowRef.current
      const m = mouseRef.current
      ctx.fillStyle = BG_COLOR
      ctx.fillRect(0, 0, W, H)
      const addGlow = (cx, cy, r, c0, c1) => {
        const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        gr.addColorStop(0, c0); gr.addColorStop(0.4, c1); gr.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H)
      }
      addGlow(W * g.c1x, H * g.c1y, W * 0.58, 'rgba(65,199,255,0.20)',  'rgba(65,199,255,0.07)')
      addGlow(W * g.c2x, H * g.c2y, W * 0.52, 'rgba(109,94,248,0.18)',  'rgba(109,94,248,0.06)')
      addGlow(W * g.c3x, H * g.c3y, W * 0.40, 'rgba(109,227,214,0.12)', 'rgba(109,227,214,0.04)')
      if (m.active && m.sx > -100)
        addGlow(m.sx, m.sy, 220, 'rgba(65,199,255,0.12)', 'rgba(33,107,255,0.05)')
    }

    function drawFrame(time) {
      const m = mouseRef.current
      if (m.active) {
        m.sx = m.sx < -100 ? m.x : m.sx + (m.x - m.sx) * SMOOTH_CURSOR
        m.sy = m.sy < -100 ? m.y : m.sy + (m.y - m.sy) * SMOOTH_CURSOR
      } else {
        m.sx += (-9999 - m.sx) * 0.03
        m.sy += (-9999 - m.sy) * 0.03
      }
      if (ring && m.active) { ring.style.left = m.sx + 'px'; ring.style.top = m.sy + 'px' }

      const { W, H } = sizeRef.current
      ctx.clearRect(0, 0, W, H)
      drawBackground()
      ctx.strokeStyle = ARROW_COLOR; ctx.lineWidth = LINE_WIDTH
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'

      for (const cell of cellsRef.current) {
        const ax = cell.x + cell.ox, ay = cell.y + cell.oy
        if (ax < -GRID * 2 || ax > W + GRID * 2 || ay < -GRID * 2 || ay > H + GRID * 2) continue
        const wave = getWaveAngle(ax, ay, time)
        const influence = mouseInfluence(ax, ay)
        let target = wave
        if (influence > 0) {
          const toward = Math.atan2(m.sy - ay, m.sx - ax)
          target = lerpAngle(wave, toward, influence)
        }
        cell.angle = lerpAngle(cell.angle, target, influence > 0.05 ? LERP_MOUSE : LERP_WAVE)
        drawArrow(ax, ay, ARROW_SIZE * cell.size, cell.angle, getAlpha(ax, ay, time))
      }
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true
      if (ring) ring.style.opacity = '1'
    }
    const onMouseLeave = () => {
      mouseRef.current.active = false
      if (ring) ring.style.opacity = '0'
    }
    hero.addEventListener('mousemove', onMouseMove)
    hero.addEventListener('mouseleave', onMouseLeave)

    const tw1 = gsap.to(glowRef.current, { c1x: 0.38, c1y: 0.30, duration: 11, ease: 'sine.inOut', repeat: -1, yoyo: true })
    const tw2 = gsap.to(glowRef.current, { c2x: 0.72, c2y: 0.28, duration: 14, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.8 })
    const tw3 = gsap.to(glowRef.current, { c3x: 0.18, c3y: 0.84, duration: 12, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 4.0 })

    gsap.ticker.fps(60)
    const onTick = (time) => drawFrame(time)
    gsap.ticker.add(onTick)

    const rafId = requestAnimationFrame(() => { resize(); requestAnimationFrame(resize) })
    let resizeTimer
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 80) }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
      gsap.ticker.remove(onTick)
      tw1.kill(); tw2.kill(); tw3.kill()
    }
  }, [])

  /* Entrance animations */
  useGSAP(() => {
    const hero = heroRef.current
    if (!hero) return
    const q  = (sel) => hero.querySelector(sel)
    const qa = (sel) => Array.from(hero.querySelectorAll(sel))
    const tl = gsap.timeline({ delay: 0.20 })
    if (q('.hero-pill'))   tl.from(q('.hero-pill'),          { opacity: 0, y: 20, duration: 0.80, ease: 'power3.out' })
    if (q('.hero-h1'))     tl.from(q('.hero-h1'),            { opacity: 0, y: 32, duration: 0.90, ease: 'power3.out' }, '-=0.55')
    if (q('.hero-sub'))    tl.from(q('.hero-sub'),           { opacity: 0, y: 22, duration: 0.80, ease: 'power3.out' }, '-=0.60')
    if (qa('.hero-btn').length) tl.from(qa('.hero-btn'),     { opacity: 0, y: 18, duration: 0.70, stagger: 0.14, ease: 'power3.out' }, '-=0.50')
    if (scrollCueRef.current)   tl.from(scrollCueRef.current, { opacity: 0, duration: 0.50 }, '-=0.20')
  }, { scope: heroRef })

  return (
    <section className={styles.hero} ref={heroRef}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vignette} />
      <div ref={ringRef} className={styles.cursor} />

      <div className={styles.body}>

        {/* Copy block */}
        <div className={styles.copy}>
          <div className={`eyebrow eyebrow-dark hero-pill ${styles.pill}`}>
            <span className={styles.pillNew}>New</span>
            Agentic financial intelligence, now live
          </div>
          <h1 className={`hero-h1 ${styles.heading}`}>
            Finance operations,<br />
            <span className="serif-accent">finally in control.</span>
          </h1>
          <p className={`hero-sub ${styles.sub}`}>
            PO2PAY is the AI-native platform for financial document intelligence — bringing structure, validation, and visibility to contracts, purchase orders, and invoices.
          </p>
          <div className={styles.cta}>
            <a href="#" className={`btn btn-primary hero-btn`}>Book a demo</a>
            <a href="#" className={`btn btn-ghost-dark hero-btn`}>See how it works</a>
          </div>
        </div>

        {/* Diagram panel */}
        <div className={styles.diagram}>

          <div className={styles.diagramTopBar}>
            <span>STREAMLINED SMART CONTRACTS</span>
            <span className={styles.barDot} />
            <span>HUMAN PURCHASE ORDERS VISIBILITY</span>
            <span className={styles.barDot} />
            <span>BUILT FOR FINANCE AND PROCUREMENT TEAMS</span>
          </div>

          <div className={styles.flow}>

            {/* Input docs */}
            <div className={styles.inputCol}>
              {INPUT_DOCS.map(({ label, widths }) => (
                <div key={label} className={styles.docCard}>
                  <div className={styles.docLines}>
                    {widths.map((w, i) => <span key={i} style={{ width: `${w}%` }} />)}
                  </div>
                  <span className={styles.docLabel}>{label}</span>
                </div>
              ))}
              <div className={styles.colTag}>MULTI-FORMAT · INGESTION</div>
            </div>

            {/* Left connector */}
            <svg className={styles.connector} viewBox="0 0 56 200" preserveAspectRatio="none" fill="none">
              <line x1="2"  y1="32"  x2="52" y2="100" stroke="rgba(65,199,255,0.28)" strokeWidth="1" strokeDasharray="4 3"/>
              <line x1="2"  y1="100" x2="52" y2="100" stroke="rgba(65,199,255,0.28)" strokeWidth="1" strokeDasharray="4 3"/>
              <line x1="2"  y1="168" x2="52" y2="100" stroke="rgba(65,199,255,0.28)" strokeWidth="1" strokeDasharray="4 3"/>
              <circle cx="52" cy="100" r="3.5" fill="rgba(65,199,255,0.50)"/>
              {[0, 0.5, 1.0].map((begin, i) => {
                const paths = ['M2,32 L52,100', 'M2,100 L52,100', 'M2,168 L52,100']
                return (
                  <circle key={i} r="2.5" fill="rgba(65,199,255,0.9)">
                    <animateMotion path={paths[i]} dur="1.8s" repeatCount="indefinite" begin={`${begin}s`}/>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="1.8s" repeatCount="indefinite" begin={`${begin}s`}/>
                  </circle>
                )
              })}
            </svg>

            {/* Engine hub */}
            <div className={styles.engineWrap}>
              <span className={styles.engineTag}>PO2PAY INTELLIGENCE ENGINE</span>
              <div className={styles.engineHub}>
                <svg className={styles.engineSvg} viewBox="0 0 320 240" fill="none">
                  <line x1="138" y1="94"  x2="72"  y2="18"  stroke="rgba(65,199,255,0.22)" strokeWidth="1" strokeDasharray="3 3"/>
                  <line x1="182" y1="94"  x2="248" y2="18"  stroke="rgba(65,199,255,0.22)" strokeWidth="1" strokeDasharray="3 3"/>
                  <line x1="138" y1="146" x2="72"  y2="222" stroke="rgba(65,199,255,0.22)" strokeWidth="1" strokeDasharray="3 3"/>
                  <line x1="182" y1="146" x2="248" y2="222" stroke="rgba(65,199,255,0.22)" strokeWidth="1" strokeDasharray="3 3"/>
                </svg>
                <div className={styles.engineCenter}>
                  <img className={styles.engineLogo} src={favicon} alt="PO2PAY" />
                </div>
                <div className={`${styles.node} ${styles.nodeTL}`}><IcoDoc /><span>Document<br/>Intelligence</span></div>
                <div className={`${styles.node} ${styles.nodeTR}`}><IcoUsers /><span>Human-in-<br/>the-loop</span></div>
                <div className={`${styles.node} ${styles.nodeBL}`}><IcoAudit /><span>Traceability<br/>&amp; Audit Trail</span></div>
                <div className={`${styles.node} ${styles.nodeBR}`}><IcoFlow /><span>Workflow<br/>Routing</span></div>
              </div>
            </div>

            {/* Right connector */}
            <svg className={styles.connector} viewBox="0 0 56 220" preserveAspectRatio="none" fill="none">
              <circle cx="4" cy="110" r="3.5" fill="rgba(65,199,255,0.50)"/>
              <line x1="4" y1="110" x2="54" y2="26"  stroke="rgba(65,199,255,0.28)" strokeWidth="1" strokeDasharray="4 3"/>
              <line x1="4" y1="110" x2="54" y2="82"  stroke="rgba(65,199,255,0.28)" strokeWidth="1" strokeDasharray="4 3"/>
              <line x1="4" y1="110" x2="54" y2="138" stroke="rgba(65,199,255,0.28)" strokeWidth="1" strokeDasharray="4 3"/>
              <line x1="4" y1="110" x2="54" y2="194" stroke="rgba(65,199,255,0.28)" strokeWidth="1" strokeDasharray="4 3"/>
              {[0.3, 0.75, 1.2, 1.65].map((begin, i) => {
                const paths = ['M4,110 L54,26', 'M4,110 L54,82', 'M4,110 L54,138', 'M4,110 L54,194']
                return (
                  <circle key={i} r="2.5" fill="rgba(65,199,255,0.9)">
                    <animateMotion path={paths[i]} dur="1.8s" repeatCount="indefinite" begin={`${begin}s`}/>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="1.8s" repeatCount="indefinite" begin={`${begin}s`}/>
                  </circle>
                )
              })}
            </svg>

            {/* Output cards */}
            <div className={styles.outputCol}>
              {OUTPUT_CARDS.map(({ Icon, label, sub, color }) => (
                <div key={label} className={styles.outputCard}>
                  <span className={styles.outputIcon} style={{ color, borderColor: `${color}40` }}>
                    <Icon />
                  </span>
                  <div>
                    <div className={styles.outputLabel}>{label}</div>
                    <div className={styles.outputSub}>{sub}</div>
                  </div>
                </div>
              ))}
              <div className={styles.colTag}>OUTPUTS · &amp; · CONTROLS</div>
            </div>

          </div>

          <div className={styles.diagramBottomBar}>
            <span>ENTERPRISE SECURITY</span>
            <span className={styles.barDot} />
            <span>REAL-TIME ACCESS</span>
            <span className={styles.barDot} />
            <span>MULTI-INTEGRATION</span>
          </div>

        </div>
      </div>

      <div ref={scrollCueRef} className={styles.scrollCue}>
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
