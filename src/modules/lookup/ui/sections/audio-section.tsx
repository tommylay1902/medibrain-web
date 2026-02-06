import { ScrollArea } from "@/components/ui/scroll-area"
import { Suspense } from "react"

const AudioSection = async () => {
  return (
    <Suspense>
      <AudioSectionSuspense />
    </Suspense>
  )
}

const AudioSectionSuspense = async () => {
  return <div className="flex flex-col flex-1">
    <h3 className="mx-5 font-bold text-center">Audio Logs</h3>
    <ScrollArea className="mx-5 rounded-md h-45 w-full border-black border">
      <h2 className="flex justify-center justify-items-center items-center font-bold">No Audio Logs Found</h2>
    </ScrollArea >
  </div >
}

export default AudioSection
