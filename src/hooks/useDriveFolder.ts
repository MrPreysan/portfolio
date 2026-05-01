import { useEffect, useState } from 'react'

export type DriveFile = {
  id: string
  name: string
  mimeType: string
  thumbnailLink?: string
}

type State = {
  files: DriveFile[]
  loading: boolean
  error: string | null
}

export function useDriveFolder(folderId: string): State {
  const [state, setState] = useState<State>({ files: [], loading: false, error: null })

  useEffect(() => {
    if (!folderId) return

    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
    if (!apiKey) {
      setState({ files: [], loading: false, error: 'Missing API key' })
      return
    }

    setState({ files: [], loading: true, error: null })

    const url =
      `https://www.googleapis.com/drive/v3/files` +
      `?q=%27${folderId}%27+in+parents+and+trashed%3Dfalse` +
      `&key=${apiKey}` +
      `&fields=files(id,name,mimeType,thumbnailLink)` +
      `&pageSize=100` +
      `&orderBy=createdTime+desc`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Drive API error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const all: DriveFile[] = data.files ?? []
        const media = all.filter(
          (f) => f.mimeType.startsWith('video/') || f.mimeType.startsWith('image/')
        )
        setState({ files: media, loading: false, error: null })
      })
      .catch((err: Error) => {
        setState({ files: [], loading: false, error: err.message })
      })
  }, [folderId])

  return state
}
