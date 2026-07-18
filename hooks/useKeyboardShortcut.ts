"use client"

import { useCallback, useEffect } from "react"

// Computed once at module load — the OS doesn't change during a session.
const isMac = typeof navigator !== "undefined" && /mac/i.test(navigator.userAgent);

export interface ShortcutOptions {
  meta?: boolean;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  disabled?: boolean;
}

export function useKeyboardShortcut(
  onTrigger: () => void,
  isOpen: boolean,
  targetKey: string = "k",
  options: ShortcutOptions = {}
) {
  const handleShortcut = useCallback(
    (e: KeyboardEvent) => {
      if (options.disabled) return

      const key = e.key.toLowerCase()

      if (key !== targetKey.toLowerCase()) return

      const hasModifiersSet =
        options.meta !== undefined ||
        options.ctrl !== undefined ||
        options.alt !== undefined ||
        options.shift !== undefined

      let isMatch = false
      if (hasModifiersSet) {
        const matchMeta = options.meta ? e.metaKey : !e.metaKey
        const matchCtrl = options.ctrl ? e.ctrlKey : !e.ctrlKey
        const matchAlt = options.alt ? e.altKey : !e.altKey
        const matchShift = options.shift ? e.shiftKey : !e.shiftKey
        isMatch = matchMeta && matchCtrl && matchAlt && matchShift
      } else {
        const cmdK = isMac && e.metaKey
        const ctrlK = !isMac && e.ctrlKey
        const altK = e.altKey
        isMatch = cmdK || ctrlK || altK
      }

      if (isMatch && !isOpen) {
        e.preventDefault()
        onTrigger()
      }
    },
    [onTrigger, isOpen, targetKey, options.meta, options.ctrl, options.alt, options.shift, options.disabled],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleShortcut)
    return () => window.removeEventListener("keydown", handleShortcut)
  }, [handleShortcut])
}
