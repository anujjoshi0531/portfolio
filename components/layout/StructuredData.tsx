import JsonLd from "@/components/global/JsonLd";
import { clientConfig } from "@/lib/config/client";

export function StructuredData() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Anuj Joshi",
          url: clientConfig.BASE_URL,
          jobTitle: "Full Stack Developer",
          sameAs: [
            "https://github.com/anujjoshi0531",
            "https://www.linkedin.com/in/anujjoshi0531",
            "https://x.com/anujjoshi3105",
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: clientConfig.BASE_URL,
          potentialAction: {
            "@type": "SearchAction",
            target: `${clientConfig.BASE_URL}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: clientConfig.BASE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "About",
              item: `${clientConfig.BASE_URL}/about`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Project",
              item: `${clientConfig.BASE_URL}/project`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Blog",
              item: `${clientConfig.BASE_URL}/blog`,
            },
            {
              "@type": "ListItem",
              position: 5,
              name: "Contact",
              item: `${clientConfig.BASE_URL}/contact`,
            },
          ],
        }}
      />
    </>
  );
}
