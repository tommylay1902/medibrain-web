import z from "zod"

const dateTimeRegex = /^20\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]) (0\d|1\d|2[0-3]):[0-5]\d:[0-5]\d$/

export const DocumentMetaSchema = z.object({
  author: z.nullable(z.string()),
  creator: z.nullable(z.string()),
  creationDate: z.nullable(z.string()
    .regex(dateTimeRegex, "Required format: yyyy/MM/dd HH:mm:ss")
    .refine(val => {
      const [year, month, day] = val.split(/[\/ ]/).map(Number);
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;
    }, { message: "Invalid calendar date" })),
  modificationDate: z.nullable(z.string()
    .regex(dateTimeRegex, "Required format: yyyy/MM/dd HH:mm:ss")
    .refine(val => {
      const [year, month, day] = val.split(/[\/ ]/).map(Number);
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;
    }, { message: "Invalid calendar date" })),
  keywords: z.nullable(z.string()),
  producer: z.nullable(z.string()),
  subject: z.nullable(z.string()),
  title: z.nullable(z.string())
})

export type DocumentMeta = z.infer<typeof DocumentMetaSchema>;

export const getResetData = () => {
  const resetData: DocumentMeta = {
    title: null,
    subject: null,
    author: null,
    creator: null,
    creationDate: null,
    modificationDate: null,
    keywords: null,
    producer: null,
  };
  return resetData;
}
