import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import WordsPullUpMultiStyle from '../animations/WordsPullUpMultiStyle'
import { featureCards } from '../../data/features'

const FEATURES_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4'

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
      <span className="text-gray-400 text-xs sm:text-sm">{text}</span>
    </li>
  )
}

function LearnMore() {
  return (
    <a href="#" className="flex items-center gap-1 text-primary text-xs sm:text-sm hover:gap-2 transition-all duration-200 mt-auto">
      Learn more
      <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
    </a>
  )
}

interface FeatureCardWrapperProps {
  index: number
  children: React.ReactNode
  className?: string
}

function FeatureCardWrapper({ index, children, className = '' }: FeatureCardWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl overflow-hidden ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Features() {
  return (
    <section className="min-h-screen bg-black px-4 pb-16 md:pb-24 pt-8 md:pt-16 relative">
      {/* Noise overlay */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12" style={{ color: '#E1E0CC' }}>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Studio-grade workflows for visionary creators.', className: '' },
              ]}
            />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mt-1">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Built for pure vision. Powered by art.', className: 'text-gray-500' },
              ]}
            />
          </div>
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">

          {/* Card 1 — Video (static) */}
          <FeatureCardWrapper index={0} className="relative">
            <video
              src={FEATURES_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative h-full min-h-[280px] lg:min-h-0 flex items-end p-5">
              <p className="font-medium text-sm sm:text-base" style={{ color: '#E1E0CC' }}>
                Where vision takes form.
              </p>
            </div>
          </FeatureCardWrapper>

          {/* Cards 2–4 — from data */}
          {featureCards.map((card, i) => (
            <FeatureCardWrapper
              key={card.id}
              index={i + 1}
              className="bg-[#212121] p-5 flex flex-col gap-4 min-h-[280px] lg:min-h-0"
            >
              <img
                src={card.icon}
                alt={card.title}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
              />
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-primary font-medium text-sm sm:text-base leading-tight">
                  {card.title}
                </h3>
                <span className="text-gray-500 text-xs shrink-0">{card.number}</span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {card.checklist.map((item) => (
                  <CheckItem key={item} text={item} />
                ))}
              </ul>
              <LearnMore />
            </FeatureCardWrapper>
          ))}

        </div>
      </div>
    </section>
  )
}
