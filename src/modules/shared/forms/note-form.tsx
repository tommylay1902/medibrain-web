import z from "zod"

export const NoteSchema = z.object({
  creationDate: z.nullable(z.string()),
  modificationDate: z.nullable(z.string()),
  content: z.nullable(z.string()),
  tags: z.nullable(z.array(z.string()))
})

export type Note = z.infer<typeof NoteSchema>

export const getResetData = () => {
  const resetData: Note = {
    creationDate: null,
    modificationDate: null,
    content: null,
    tags: []
  }
  return resetData
}
