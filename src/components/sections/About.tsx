import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send } from 'lucide-react'
import WordsPullUpMultiStyle from '../animations/WordsPullUpMultiStyle'

const BODY_TEXT = 'Based in Barcelona. I work with generative AI tools — Midjourney, Flux, Stable Diffusion, Runway, Kling — and a professional post-production stack: Photoshop, Illustrator, Premiere Pro, After Effects. I build visual pipelines that keep character, style, and brand identity consistent across every frame, and finish everything with hands-on compositing and motion design. Currently focused on personal creative series alongside freelance work.'

export default function About() {
  const labelRef = useRef(null)
  const isLabelInView = useInView(labelRef, { once: true, margin: '-50px' })

  const bodyRef = useRef(null)
  const bodyInView = useInView(bodyRef, { once: true, amount: 0.1 })
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (!bodyInView) return
    const id = setInterval(() => {
      setVisible((v) => {
        if (v >= BODY_TEXT.length) { clearInterval(id); return v }
        return v + 1
      })
    }, 18)
    return () => clearInterval(id)
  }, [bodyInView])

  return (
    <section id="about" className="bg-black py-24 md:py-32 px-4">
      <div className="bg-[#101010] max-w-6xl mx-auto rounded-2xl md:rounded-3xl px-6 md:px-12 lg:px-20 py-12 md:py-20 text-center">
        {/* Label */}
        <motion.p
          ref={labelRef}
          className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-6 md:mb-8"
          initial={{ y: 10, opacity: 0 }}
          animate={isLabelInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          CREATIVE TECHNOLOGIST
        </motion.p>

        {/* Main heading */}
        <div
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-5xl mx-auto leading-[0.95] sm:leading-[0.9] mb-12 md:mb-20"
          style={{ color: '#E1E0CC' }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: 'I am SHIMON,', className: 'font-normal' },
              { text: 'a creative technologist building AI-native visual pipelines.', className: 'font-normal' },
              { text: 'From a single prompt to a finished cinematic frame — generative imagery, video, and brand identities made end to end.', className: 'font-normal' },
            ]}
          />
        </div>

        {/* Typewriter paragraph */}
        <p
          ref={bodyRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed"
          style={{ color: '#E1E0CC' }}
        >
          {BODY_TEXT.slice(0, visible)}
        </p>

        {/* Telegram link */}
        <div className="text-center mt-12 md:mt-16">
          <a
            href="https://t.me/shimon_1111"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-base sm:text-lg"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            @shimon_1111
          </a>
        </div>
      </div>
    </section>
  )
}
