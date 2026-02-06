"use client"

import { Input } from "@/components/ui/input"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "../../hooks/useDebounce"

const SearchSection = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams.get("search") || ""
  const [searchVal, setSearchVal] = useState(search)

  const debounceVal = useDebounce(searchVal, 500)

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    return params.toString()
  }, [searchParams])

  useEffect(() => {
    if (debounceVal !== search) {
      const queryString = createQueryString("search", debounceVal)
      router.push(`${pathname}?${queryString}`, { scroll: false })
    }
  }, [debounceVal, search, createQueryString, pathname, router])

  return (
    <Input
      placeholder="Search for something...."
      value={searchVal}
      onChange={(e) => {
        setSearchVal(e.currentTarget.value)
      }}
    />
  )
}

export default SearchSection
