"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib"

interface ErrorCardProps {
  error?: Error | string
  errorCode?: string | number
  title?: string
  description?: string
  showHomeButton?: boolean
  showBackButton?: boolean
  onReset?: () => void
  className?: string
}

export default function ErrorCard({
  error,
  errorCode,
  title = "Oops! Something went wrong",
  description = "We encountered an error while processing your request.",
  onReset,
  className = "",
}: ErrorCardProps) {
  const errorMessage = error instanceof Error ? error.message : error

  const handleReset = () => {
    if (onReset) {
      onReset()
    } else {
      window.location.reload()
    }
  }


  return (
    <Card className={cn("bg-destructive/5 border hover:scale-[1.02] duration-300 border-destructive/20 rounded-2xl w-full max-w-md mx-auto shadow-lg", className)}> 
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="size-5 text-destructive" />
          <CardTitle className="text-destructive text-xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {errorCode && (
          <div className="flex items-center justify-between rounded-md bg-destructive/10 px-3 py-2">
            <span className="text-sm font-medium">Error Code</span>
            <span className="text-sm font-mono">{errorCode}</span>
          </div>
        )}
        {errorMessage && (
          <div className="space-y-2">
            <Separator />
            <div className="rounded-md bg-background p-3">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words font-mono">{errorMessage}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button variant="destructive" size="md" className="flex mx-auto" onClick={handleReset} aria-label="Try again to resolve the error">
          <RefreshCw className="mr-2 size-4" />
          Try Again
        </Button>
      </CardFooter>
    </Card>
  )
}
