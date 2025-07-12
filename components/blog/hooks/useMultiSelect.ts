interface useMultiSelectProps {
  value?: string
  logic: "and" | "or"
  onChange: (value: string) => void
}

export const useMultiSelect = ({
  value,
  logic,
  onChange,
}: useMultiSelectProps) => {
  const operator = logic === "and" ? "," : "|"
  const selection = value ? value.split(operator) : []

  const removeSelection = (id: string) => {
    return selection.filter((genre) => genre !== id).join(operator)
  }

  const addSelection = (id: string) => {
    return [...selection, id].join(operator)
  }

  const clearSelection = () => {
    onChange("")
  }

  const toggleSelection = (id: string) => {
    onChange(selection.includes(id) ? removeSelection(id) : addSelection(id))
  }

  return {
    selection,
    clearSelection,
    toggleSelection,
  }
}
