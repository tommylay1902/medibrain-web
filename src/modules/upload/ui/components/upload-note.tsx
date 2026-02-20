"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Note, NoteSchema } from "@/modules/shared/forms/note-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import AddTagSelector from "./add-tag-selector"
import { useEffect, useState } from "react"
import { Tag } from "@/modules/shared/forms/add-tags-form"
import { toast } from "sonner"

const UploadNote = () => {
  const { reset, setValue, control, handleSubmit, formState: { errors, isDirty, dirtyFields } } = useForm<Note>({
    resolver: zodResolver(NoteSchema)
  })

  const [tags, setTags] = useState<Tag[]>([])
  const addTagHandler = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  useEffect(() => {
    const getTags = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIBRAIN_API_BASE_URL}/api/v1/note/tag`)
      const resultTags = await response.json()
      setTags(resultTags ? resultTags : [])
    }
    getTags()
  }, [])

  async function onSubmit(data: Note) {
    const cdTimeStr = `${data.creationDate}`
    const formattedCD = new Date(cdTimeStr);

    const mdTimeStr = `${data.creationDate}`
    const formattedMD = new Date(mdTimeStr);

    data.creationDate = formattedCD.toISOString()
    data.modificationDate = formattedMD.toISOString()
    console.table(data)
    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIBRAIN_API_BASE_URL}/api/v1/note`, {
      method: "POST",
      body: JSON.stringify(data)
    })
    if (response.status != 201) {
      toast.error("something went wrong... try again later")
      return
    }
    toast.success("successfully added note")
    reset()
  }
  return (
    <div className="flex flex-col justify-center items-center justify-items-center mx-auto w-[50dvw]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full">
        <FieldGroup className="w-full">
          <Controller
            name="content"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="content">
                  Content
                </FieldLabel>
                <Textarea
                  className="w-full max-h-30"
                  {...field}
                  id="content"
                  value={field.value || ''}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex gap-x-2">
            <Controller
              name="modificationDate"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="modificationDate">
                    Modification Date
                  </FieldLabel>
                  <Input
                    type="date"
                    className="w-full"
                    {...field}
                    id="modificationDate"
                    value={field.value || ''}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="creationDate"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="creationDate">Creation Date</FieldLabel>
                  <Input
                    type="date"
                    className="w-full"
                    {...field}
                    id="creationDate"
                    value={field.value || ''}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <AddTagSelector addTagHandler={addTagHandler} tags={tags} onTagsChange={(tags) => setValue("tags", tags)}
          />
        </FieldGroup>
        <div className="flex justify-end">
          <Button type="submit" className="cursor-pointer">Add Note</Button>
        </div>
      </form>
    </div>
  )
}

export default UploadNote 
