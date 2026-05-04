import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { type DriveFile } from '../hooks/useDriveFolder'

type Props = {
  file: DriveFile | null
  onClose: () => void
}

export function VideoPlayer({ file, onClose }: Props) {
  useEffect(() => {
    if (!file) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [file, onClose])

  return (
    <AnimatePresence>
      {file && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6 md:p-12"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full sm:w-full sm:h-auto sm:max-w-[1600px] sm:aspect-video sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://drive.google.com/file/d/${file.id}/preview`}
              className="absolute inset-0 w-full h-full sm:rounded-lg border-0"
              allow="autoplay; fullscreen"
              allowFullScreen
              title={file.name}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
