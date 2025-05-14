import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-brand-blue to-brand-teal text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:opacity-90 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </>
  )
}

export default ScrollToTop 