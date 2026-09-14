import { cn } from "@/lib/utils/styles";

interface EmptyStateProps {
    title?: string
    message: string
    variant?: "default" | "error"
}

export function EmptyState({
    title,
    message,
    variant = "default",
}: EmptyStateProps) {
    const isError = variant === "error"
    return (
        <div className="px-6 py-8 text-center">
            {title && (
                <div className={cn("font-medium mb-2", isError && "text-destructive text-sm")}>
                    {title}
                </div>
            )}
            <p className={cn("text-sm", isError && "text-xs text-muted-foreground")}>
                {message}
            </p>
        </div>
    )
}
