import { GetToday } from "@/lib/utils";
import z from "zod";

export const NoteSchema = z.object({
  creationDate: z.nullable(z.string()),
  modificationDate: z.nullable(z.string()),
  content: z.nullable(z.string()),
  title: z.nullable(z.string()),
  tags: z.nullable(z.array(z.string())),
});

export type Note = z.infer<typeof NoteSchema>;

export const getResetData = () => {
  const resetData: Note = {
    creationDate: GetToday(),
    modificationDate: GetToday(),
    content: null,
    title: null,
    tags: [],
  };
  return resetData;
};
