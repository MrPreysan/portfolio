import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import WordsPullUpMultiStyle from '../animations/WordsPullUpMultiStyle'
import { works, type Work } from '../../data/works'
import WorksLightbox from '../WorksLightbox'
import { useDriveFolder } from '../../hooks/useDriveFolder'

function WorkCard({
  work,
  index,
  onClick,
}: {
  work: Work
  index: number
  onClick: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const { files, loading } = useDriveFolder(work.folderId)
  const latest = files[0]
  const thumbnailUrl = !loading && latest
    ? `https://drive.google.com/thumbnail?id=${latest.id}&sz=w1920`
    : null

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer h-[60vh] sm:h-[520px] md:h-[640px] lg:h-[760px] w-full text-left"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 0.97 }}
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={work.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <video
          src={work.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between min-h-[80px]">
        <span className="text-[#E1E0CC] text-lg sm:text-xl md:text-2xl font-medium">
          {work.title}
        </span>
        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#E1E0CC]/70" />
      </div>
    </motion.button>
  )
}

export default function Works() {
  const [activeWork, setActiveWork] = useState<Work | null>(null)

  return (
    <section id="works" className="min-h-screen bg-black px-4 pb-16 md:pb-24 pt-8 md:pt-16 relative">
      {/* Noise overlay */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight" style={{ color: '#E1E0CC' }}>
            <WordsPullUpMultiStyle
              segments={[{ text: 'My Works.', className: 'text-primary' }]}
            />
          </div>
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {works.map((work, i) => (
            <WorkCard
              key={work.title}
              work={work}
              index={i}
              onClick={() => setActiveWork(work)}
            />
          ))}
        </div>
      </div>

      <WorksLightbox work={activeWork} onClose={() => setActiveWork(null)} />
    </section>
  )
}
