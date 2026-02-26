import { PageTemplate } from '@/components/global/SectionTemplate';
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <>
      <PageTemplate title="Contact Me" subtitle="Feel free to contact" />
      <div className="py-4 sm:py-12 flex md:flex-row-reverse flex-col gap-8 justify-between">
        <ContactInfo />
        <Suspense
          fallback={
            <Skeleton className="md:w-[600px] w-full h-[400px] flex items-center justify-center">
              <div className="h-20 w-20 animate-spin rounded-full border-4 border-t-theme" />
            </Skeleton>
          }>
          <ContactForm />
        </Suspense>
      </div>
    </>
  );
}
