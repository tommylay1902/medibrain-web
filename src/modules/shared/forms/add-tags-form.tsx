import z from "zod";

export const TagSchema = z.object({
  name: z.nullable(z.string().min(1, { message: "name can't be blank" }).max(15, { message: "name of tag can't exceed 15 characters" }))
})

export type Tag = z.infer<typeof TagSchema>;

export type TagStrict = {
  id: string;
  name: string;
}
