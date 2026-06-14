import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddTagDialog from "./add-tag-dialog"
import { Tag } from "@/modules/shared/forms/add-tags-form"
import { Badge } from "@/components/ui/badge"
import { useEffect, useMemo, useState } from "react"

interface AddTagSelectorProps {
  tags: Tag[]
  selectedTags?: string[]
  onTagsChange?: (tags: string[]) => void
  addTagHandler: (tag: Tag) => void
}

const AddTagSelector = ({
  tags,
  selectedTags = [],
  onTagsChange,
  addTagHandler,
}: AddTagSelectorProps) => {
  const [selected, setSelected] = useState<string[]>(selectedTags)
  const [viewTags, setViewTags] = useState<Tag[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentFilter, setCurrentFilter] = useState<string>("All")
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  useEffect(() => {
    setViewTags(tags)
  }, [tags])

  useEffect(() => {
    let filtered = tags;

    if (searchQuery) {
      filtered = filtered.filter(t =>
        t?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (currentFilter) {
      case "Selected":
        filtered = filtered.filter(t => selectedSet.has(t?.name ?? ""));
        break;
      case "Deselected":
        filtered = filtered.filter(t => !selectedSet.has(t?.name ?? ""));
        break;
      default:
        break;
    }

    setViewTags(filtered);
  }, [searchQuery, currentFilter, tags, selectedSet]);

  const toggleTag = (tagName: string) => {
    const newSelected = selected.includes(tagName)
      ? selected.filter(t => t !== tagName)
      : [...selected, tagName]

    setSelected(newSelected)
    onTagsChange?.(newSelected)
  }

  const removeTag = (tagName: string) => {
    const newSelected = selected.filter(t => t !== tagName)
    setSelected(newSelected)
    onTagsChange?.(newSelected)
  }

  const resetTags = () => {
    setSelected([])
    onTagsChange?.([])
  }

  const filterTags = (filter: string) => {
    setCurrentFilter(filter)
  }

  const filterSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="w-full">
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1 border p-3">
          {selected.map((tagName) => (
            <Badge key={tagName} className="flex">
              <span>{tagName}</span>
              <Button
                onClick={() => removeTag(tagName)}
                className="ml-1 rounded-full p-0.5 cursor-pointer hover:bg-white h-5 w-5 hover:text-black"
                type="button"
              >
                X
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" className="flex h-auto w-full cursor-pointer">
            Add Tags {selected.length > 0 && `(${selected.length} selected)`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-[40dvh] w-[40dvw] overflow-clip">
          <div className="p-2">
            <Input type="text" placeholder="Search tags..."
              onChange={e => filterSearch(e.currentTarget.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              onKeyUp={(e) => {
                e.stopPropagation();
              }}
            />
            <Select defaultValue="All" onValueChange={e => filterTags(e)}>
              <SelectTrigger className="hover:bg-accent/50 h-8 w-full justify-center text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="flex justify-center" position="popper">
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Selected">Selected</SelectItem>
                <SelectItem value="Deselected">Deselected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <ScrollArea className="h-20" >
              <div className="text-center italic text-sm font-bold flex justify-center items-center flex-col">
                {viewTags?.length > 0 ? (
                  viewTags.map(tag => (
                    <div className="w-full" key={tag.name}>
                      <DropdownMenuCheckboxItem
                        tabIndex={-1}
                        className="cursor-pointer"
                        checked={selectedSet.has(tag.name!)}
                        onSelect={(e) => {
                          e.preventDefault();
                          toggleTag(tag.name!);
                        }}
                      >
                        <span className="ml-6 text-xs font-bold">{tag.name}</span>
                      </DropdownMenuCheckboxItem>
                    </div>
                  ))
                ) : (
                  <div className="p-4">No tags found</div>
                )}
              </div>
            </ScrollArea>
            <AddTagDialog addTagHandler={addTagHandler} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default AddTagSelector
