import { useEffect } from 'react'

export function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return undefined
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const passedAbove = entry.boundingClientRect.top < window.innerHeight
          if (entry.isIntersecting || passedAbove) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

export function useScrolled(offset = 12) {
  useEffect(() => {
    const node = document.querySelector('.nav-wrap')
    if (!node) return undefined
    const handle = () => node.classList.toggle('is-scrolled', window.scrollY > offset)
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [offset])
}
