"use client"

import { Loader2 } from "lucide-react" // or any spinner component
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
    <div className="space-y-4">
      <div className="text-xl font-semibold">Search Results</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results?.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h3>{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.content}</p>
            <a target="_blank" href={`${process.env.NEXT_PUBLIC_SEAWEED_BASE_URL}/${item.fid}`}>view document</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentView
