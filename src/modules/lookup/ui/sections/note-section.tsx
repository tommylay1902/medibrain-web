import { ScrollArea } from "@/components/ui/scroll-area"
import { Suspense } from "react"

const NoteSection = async () => {
  return (
    <Suspense>
      <NoteSectionSuspense />
    </Suspense>
  )
}

const NoteSectionSuspense = async () => {
  return <div className="flex flex-col flex-1">
    <h3 className="mx-5 font-bold text-center">Notes</h3>
    <ScrollArea className="mx-5 rounded-md h-45 border-black border">
      <h2 className="flex justify-center justify-items-center items-center font-bold">No Notes Found</h2>
    </ScrollArea >
  </div >
}

export default NoteSection 
