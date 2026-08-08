import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Client-side navigation keeps the old scroll position. Reset it on every route
// change — unless the URL carries a hash, in which case scroll to that section.
// The browser won't do this itself: the target only exists after React renders.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Otherwise the browser restores the previous scroll offset after we've
    // already scrolled, cancelling the jump to the anchor.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // 'instant' rather than 'smooth': arriving from another page, the target can be
    // thousands of pixels down, and animating that far reads as a slow drift. It also
    // overrides the global `scroll-behavior: smooth`, which would otherwise apply here.
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}
