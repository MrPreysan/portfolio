import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import WordsPullUp from '../animations/WordsPullUp'

const HERO_VIDEO = '/hero.mp4'
const PORTFOLIO_URL = 'https://drive.google.com/drive/folders/1jvU2lM8ztOQRLYYV1FZN3jABzmsSTtmj'

const NAV_ITEMS = [
  { label: 'Works',     href: '#works',     external: false },
  { label: 'About',     href: '#about',     external: false },
  { label: 'Portfolio', href: PORTFOLIO_URL, external: true },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/семен-григорович-ab092236b', external: true },
  { label: 'Contact',   href: 'mailto:mrpreysan110@gmail.com', external: false },
]

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  }),
}

export default function Hero() {
  return (
    <section className="h-screen bg-black p-4 md:p-6">
      <div className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background video */}
        <video
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Noise overlay — reduced for cleaner video */}
        <div className="noise-overlay absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" />

        {/* Gradient — bottom only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

        {/* Navbar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <nav className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
            <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                >
                  <a
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-[10px] sm:text-xs md:text-sm transition-colors duration-200"
                    style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Hero content — bottom aligned */}
        <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-12 items-end p-4 md:p-8 pb-6 md:pb-10">
          {/* Giant heading — 8 columns */}
          <div className="col-span-12 lg:col-span-8 overflow-hidden">
            <h1
              className="font-medium leading-[0.85] tracking-[-0.07em] text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] xl:text-[15vw] 2xl:text-[16vw]"
              style={{ color: '#E1E0CC' }}
            >
              <WordsPullUp text="SHIMON" />
            </h1>
          </div>

          {/* Right column — 4 columns */}
          <div className="col-span-12 lg:col-span-4 relative z-10 flex flex-col gap-4 pb-6 md:pb-8 lg:pl-4">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="bg-primary/85 backdrop-blur-sm rounded-xl px-4 py-3"
            >
              <p
                className="text-black font-medium text-xs sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
              >
                I'm Simon Hryhorovych — an AI creator and prompt engineer crafting generative visuals, cinematic video, and brand identities.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.7}
            >
              <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-primary rounded-full pl-4 pr-1 py-1 hover:gap-3 transition-all duration-300 gap-1 w-fit"
              >
                <span className="font-medium text-sm sm:text-base text-black">View my work</span>
                <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
