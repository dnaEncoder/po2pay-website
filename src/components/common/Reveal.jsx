import { cloneElement, useEffect, useRef, useState } from 'react'

/**
 * Wraps a single element and fades/slides it into view when it enters
 * the viewport. Attaches a ref + className to the child instead of
 * rendering an extra wrapper node, so it's safe inside CSS grids/flex rows.
 *
 * variant: 'up' | 'fade' | 'left' | 'right' | 'scale'
 * delay: stagger delay in ms
 */
export default function Reveal({ children, variant = 'up', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const existingClassName = children.props.className || ''
  const className = `${existingClassName} reveal reveal-${variant}${visible ? ' is-visible' : ''}`.trim()
  const style = { ...(children.props.style || {}), '--reveal-delay': `${delay}ms` }

  return cloneElement(children, { ref, className, style })
}
