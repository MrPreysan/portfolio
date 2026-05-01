import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { type Work } from '../data/works'
import { useDriveFolder } from '../hooks/useDriveFolder'

type Props = {
  work: Work | null
  onClose: () => void
}

function Skeleton() {
  return (
    <div className="w-full aspect-video rounded-lg bg-white/10 animate-pulse" />
  )
}

export default function WorksLightbox({ work, onClose }: Props) {
  const { files, loading, error } = useDriveFolder(work?.folderId ?? '')

  useEffect(() => {
    if (!work) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [work, onClose])

  const isEmpty = !loading && !error && files.length === 0
  const noFolder = work && !work.folderId

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6"
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-[#E1E0CC] text-2xl md:text-3xl font-medium">
                {work.title}
              </h2>
              <button
                onClick={onClose}
                className="text-[#E1E0CC]/60 hover:text-[#E1E0CC] transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Content grid */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
              </div>
            )}

            {(error || noFolder || isEmpty) && !loading && (
              <div className="flex items-center justify-center py-24">
                <p className="text-[#E1E0CC]/40 text-lg">No works yet</p>
              </div>
            )}

            {!loading && files.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((file) =>
                  file.mimeType.startsWith('video/') ? (
                    <iframe
                      key={file.id}
                      src={`https://drive.google.com/file/d/${file.id}/preview`}
                      allow="autoplay"
                      allowFullScreen
                      className="w-full aspect-video rounded-lg border-0"
                      title={file.name}
                    />
                  ) : (
                    <img
                      key={file.id}
                      src={`https://drive.google.com/thumbnail?id=${file.id}&sz=w1600`}
                      alt={file.name}
                      className="w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  )
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
