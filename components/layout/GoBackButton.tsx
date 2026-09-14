"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GoBackButton() {
    return (
        <Button
            variant="secondary"
            onClick={() => window.history.back()}
            className="min-w-[140px]"
            aria-label="Go back to previous page"
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
        </Button>
    )
}
