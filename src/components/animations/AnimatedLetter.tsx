import { motion, MotionValue, useTransform } from 'framer-motion'

interface AnimatedLetterProps {
  char: string
  index: number
  total: number
  scrollProgress: MotionValue<number>
}

export default function AnimatedLetter({ char, index, total, scrollProgress }: AnimatedLetterProps) {
  const charProgress = index / total
  const opacity = useTransform(
    scrollProgress,
    [charProgress, charProgress + 0.0005],
    [0, 1]
  )

  if (char === ' ') {
    return <motion.span style={{ opacity }}>&nbsp;</motion.span>
  }

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
  )
}
