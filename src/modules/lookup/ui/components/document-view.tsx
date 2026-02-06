"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUpRightIcon, Loader2 } from "lucide-react" // or any spinner component
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type DocumentViewProps = {
  data?: any
  isTyping: boolean
}
type Response = {
  content: string
  fid: string
  title: string
  keywords: string
}
const DocumentView = () => {
  const params = useSearchParams()
  const [results, setResults] = useState<Response[] | undefined>(undefined)
  const search = params.get("search")?.trim()

  useEffect(() => {
    if (search != null && search !== "") {
      const getData = async () => {
        const data = await fetch(`${process.env.NEXT_PUBLIC_MEDIBRAIN_API_BASE_URL}/api/v1/document/query`, {
          method: "POST",
          body: JSON.stringify({
            "search": params.get("search")
          })
        })
        const result = await data.json()
        setResults(result);
      }
      getData()
    }
    if (search === "") {
      setResults([])
    }
  }, [search])

  return (
    <div className="">
      <h3 className="mx-5 font-bold">Documents</h3>
      <ScrollArea className="mx-5 rounded-md h-84 border-black border">
        {!results || results.length === 0 ? (
          <h2 className="flex justify-center justify-items-center items-center font-bold">No documents found please try another search</h2>
        ) : (
          results.map((item, index) => (
            <div key={index} className="border-b my-2 p-4 rounded-lg gap-y-2 hover:bg-gray-300 hover:cursor-pointer ">
              <a target="_blank" href={`${process.env.NEXT_PUBLIC_SEAWEED_BASE_URL}/${item.fid}`} className="hover:underline">
                <div className="flex flex-row">
                  <h3>{item.title}</h3>
                  <h4>{item.keywords}</h4>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.content}</p>

              </a>
            </div>
          ))
        )}
      </ScrollArea >

    </div >
  )
}

export default DocumentView
