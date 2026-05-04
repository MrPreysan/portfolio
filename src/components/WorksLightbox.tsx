import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Play } from 'lucide-react'
import { type Work } from '../data/works'
import { useDriveFolder, type DriveFile } from '../hooks/useDriveFolder'
import { VideoPlayer } from './VideoPlayer'

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
  const [activeVideo, setActiveVideo] = useState<DriveFile | null>(null)

  useEffect(() => {
    if (!work) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [work, onClose])

  const isEmpty = !loading && !error && files.length === 0
  const noFolder = work && !work.folderId

  return (
    <>
      <AnimatePresence>
        {work && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-xl overflow-y-auto py-6 sm:py-12 md:py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-[1600px] mx-auto px-3 sm:px-6 md:px-12 flex flex-col gap-6"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-[#E1E0CC] text-2xl sm:text-3xl md:text-4xl font-medium">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
                </div>
              )}

              {(error || noFolder || isEmpty) && !loading && (
                <div className="flex items-center justify-center py-24">
                  <p className="text-[#E1E0CC]/40 text-lg">No works yet</p>
                </div>
              )}

              {!loading && files.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {files.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => setActiveVideo(file)}
                      className="relative w-full aspect-video bg-black/40 rounded-lg overflow-hidden group"
                    >
                      <img
                        src={`https://drive.google.com/thumbnail?id=${file.id}&sz=w1920`}
                        alt={file.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-14 h-14 text-white/90 drop-shadow-lg" fill="currentColor" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <VideoPlayer file={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  )
}
