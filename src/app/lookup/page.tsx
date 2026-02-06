import { Input } from "@/components/ui/input"
import DocumentSection from "@/modules/lookup/ui/sections/document-section"
import SearchSection from "@/modules/lookup/ui/sections/search-section"

type Props = {
  searchParams: Promise<{ q?: string }>
}

const Page = async ({ searchParams }: Props) => {
  const { q = "" } = await searchParams

  return (
    <div>
      <SearchSection />
      <DocumentSection search={q} />
    </div>
  )
}

export default Page 
