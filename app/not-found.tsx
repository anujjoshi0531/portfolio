import { PageTemplate } from '@/components/global/SectionTemplate'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import GoBackButton from "@/components/site/GoBackButton"

export default function NotFound() {
  return (
    <>
      <PageTemplate />
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* 404 Illustration */}
          <div className="relative">
            <div className="text-8xl md:text-[250px] font-bold text-muted-foreground/20 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-36 md:size-48 flex items-center justify-center relative">
                <Image src="/404.svg" alt="404" fill className="object-contain" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Page Not Found</h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {
                "Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL."
              }
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="min-w-[140px]">
              <Link href="/" aria-label="Go to homepage">
                Go Home
              </Link>
            </Button>
            <GoBackButton />
          </div>

        </div>
      </div>
    </>

  )
}
