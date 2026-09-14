"use client"

import { useCallback, useEffect } from "react"

export function useKeyboardShortcut(onTrigger: () => void, isOpen: boolean) {
  const handleShortcut = useCallback(
    (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC")
      const key = e.key.toLowerCase()
      const cmdK = isMac && e.metaKey && key === "k"
      const ctrlK = !isMac && e.ctrlKey && key === "k"
      const altK = e.altKey && key === "k"

      if ((cmdK || ctrlK || altK) && !isOpen) {
        e.preventDefault()
        onTrigger()
      }
    },
    [onTrigger, isOpen],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleShortcut)
    return () => window.removeEventListener("keydown", handleShortcut)
  }, [handleShortcut])
}
