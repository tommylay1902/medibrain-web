import { Suspense } from "react"
import DocumentView from "../components/document-view"

type Props = {
  search: string
  // isTyping: string
}

const DocumentSection = async ({ search }: Props) => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <DocumentSectionSuspense search={search} />
    </Suspense>
  )
}

const DocumentSectionSuspense = async ({ search }: Props) => {
  return <DocumentView />
}

export default DocumentSection
