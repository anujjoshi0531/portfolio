export function SearchFooter({ count }: { count: number }) {
  return (
    <div className="border-t px-6 py-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium">
          {count} {count === 1 ? "result" : "results"}
        </span>
        <span>ESC to close</span>
      </div>
    </div>
  )
}