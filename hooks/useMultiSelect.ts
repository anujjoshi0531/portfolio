import { useCallback, useMemo } from "react"

export interface UseMultiSelectProps {
  value?: string
  logic: "and" | "or"
  onChange: (value: string) => void
}

export const useMultiSelect = ({
  value,
  logic,
  onChange,
}: UseMultiSelectProps) => {
  const operator = logic === "and" ? "," : "|"
  const selection = useMemo(() => (value ? value.split(operator) : []), [value, operator])

  const removeSelection = useCallback(
    (id: string) => {
      return selection.filter((item) => item !== id).join(operator)
    },
    [selection, operator],
  )

  const addSelection = useCallback(
    (id: string) => {
      return [...selection, id].join(operator)
    },
    [selection, operator],
  )

  const clearSelection = useCallback(() => {
    onChange("")
  }, [onChange])

  const add = useCallback(
    (id: string) => {
      if (!selection.includes(id)) {
        onChange(addSelection(id))
      }
    },
    [selection, addSelection, onChange],
  )

  const remove = useCallback(
    (id: string) => {
      if (selection.includes(id)) {
        onChange(removeSelection(id))
      }
    },
    [selection, removeSelection, onChange],
  )

  const toggleSelection = useCallback(
    (id: string) => {
      onChange(selection.includes(id) ? removeSelection(id) : addSelection(id))
    },
    [selection, removeSelection, addSelection, onChange],
  )

  const isSelected = useCallback(
    (id: string) => selection.includes(id),
    [selection],
  )

  return {
    selection,
    clearSelection,
    toggleSelection,
    add,
    remove,
    isSelected,
  }
}
