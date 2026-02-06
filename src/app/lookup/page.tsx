import AudioSection from "@/modules/lookup/ui/sections/audio-section"
import DocumentSection from "@/modules/lookup/ui/sections/document-section"
import NoteSection from "@/modules/lookup/ui/sections/note-section"
import SearchSection from "@/modules/lookup/ui/sections/search-section"

type Props = {
  searchParams: Promise<{ q?: string }>
}

const Page = async ({ searchParams }: Props) => {
  const { q = "" } = await searchParams

  return (
    <div className="flex flex-col">
      <div className="m-4">
        <SearchSection />

      </div>
      <DocumentSection search={q} />
      <div className="flex flex-row justify-between mt-2 gap-x-2">
        <AudioSection />
        <NoteSection />
      </div>
    </div >
  )
}

export default Page 
