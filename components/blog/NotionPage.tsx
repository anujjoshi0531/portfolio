"use client";

import dynamic from 'next/dynamic'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { formatDate } from 'notion-utils'
import * as React from 'react'
import {
  type NotionComponents,
  NotionRenderer,
} from 'react-notion-x'
import NotFound from '@/app/not-found'
import { useTheme } from 'next-themes';

const Code = dynamic(async () => {
  const m = await import('react-notion-x/build/third-party/code')
  await Promise.allSettled([
    import('prismjs/components/prism-markup-templating.js'),
    import('prismjs/components/prism-markup.js'),
    import('prismjs/components/prism-bash.js'),
    import('prismjs/components/prism-c.js'),
    import('prismjs/components/prism-cpp.js'),
    import('prismjs/components/prism-csharp.js'),
    import('prismjs/components/prism-docker.js'),
    import('prismjs/components/prism-java.js'),
    import('prismjs/components/prism-js-templates.js'),
    import('prismjs/components/prism-coffeescript.js'),
    import('prismjs/components/prism-diff.js'),
    import('prismjs/components/prism-git.js'),
    import('prismjs/components/prism-go.js'),
    import('prismjs/components/prism-graphql.js'),
    import('prismjs/components/prism-handlebars.js'),
    import('prismjs/components/prism-less.js'),
    import('prismjs/components/prism-makefile.js'),
    import('prismjs/components/prism-markdown.js'),
    import('prismjs/components/prism-objectivec.js'),
    import('prismjs/components/prism-ocaml.js'),
    import('prismjs/components/prism-python.js'),
    import('prismjs/components/prism-reason.js'),
    import('prismjs/components/prism-rust.js'),
    import('prismjs/components/prism-sass.js'),
    import('prismjs/components/prism-scss.js'),
    import('prismjs/components/prism-solidity.js'),
    import('prismjs/components/prism-sql.js'),
    import('prismjs/components/prism-stylus.js'),
    import('prismjs/components/prism-swift.js'),
    import('prismjs/components/prism-wasm.js'),
    import('prismjs/components/prism-yaml.js')
  ])
  return m.Code
})

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(m => m.Collection)
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then(m => m.Equation)
)
const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then(m => {
      m.Modal.setAppElement('.notion-viewport')
      return m.Modal
    }),
  { ssr: false }
)

const propertyLastEditedTimeValue = (
  { block, pageHeader }: any,
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && block?.last_edited_time) {
    return `Last updated ${formatDate(block?.last_edited_time, { month: 'long' })}`
  }
  return defaultFn()
}

const propertyDateValue = (
  { data, schema, pageHeader }: any,
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'published') {
    const publishDate = data?.[0]?.[1]?.[0]?.[1]?.start_date
    if (publishDate) {
      return `${formatDate(publishDate, { month: 'long' })}`
    }
  }
  return defaultFn()
}

const propertyTextValue = (
  { schema, pageHeader }: any,
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'author') {
    return <b>{defaultFn()}</b>
  }
  return defaultFn()
}

export function NotionPage({
  recordMap,
}: {
  recordMap: any
}) {
  const components = React.useMemo<Partial<NotionComponents>>(
    () => ({
      nextImage: Image,
      nextLink: Link,
      Code,
      Collection,
      Equation,
      Modal,
      propertyLastEditedTimeValue,
      propertyTextValue,
      propertyDateValue
    }),
    []
  )

  // Get the first block to determine page type
  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value
  const {theme} = useTheme()
  if (!block) {
    return <NotFound />
  }
  
  return (
    <NotionRenderer
      components={components}
      recordMap={recordMap}
      previewImages={!!recordMap.preview_images}
      showCollectionViewDropdown={true}
      showTableOfContents={true}
      minTableOfContentsItems={3}
      fullPage={true}
      disableHeader={true}
      isImageZoomable={true}
      darkMode={theme === 'dark'}
      isLinkCollectionToUrlProperty={true}
    />
  )
}
