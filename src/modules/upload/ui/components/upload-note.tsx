"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Note, NoteSchema } from "@/modules/shared/forms/note-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import AddTagSelector from "./add-tag-selector";
import { useEffect, useState } from "react";
import { Tag } from "@/modules/shared/forms/add-tags-form";
import { toast } from "sonner";
import { GetToday } from "@/lib/utils";

const UploadNote = () => {
  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<Note>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      note: {
        title: "",
        content: "",
        creationDate: GetToday(),
        modificationDate: GetToday(),
      },
      tags: [],
    },
  });

  const [tags, setTags] = useState<Tag[]>([]);
  const addTagHandler = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  useEffect(() => {
    const getTags = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDIBRAIN_API_BASE_URL}/note/tag`,
      );
      const resultTags = await response.json();
      setTags(resultTags ? resultTags : []);
    };
    getTags();
  }, []);

  async function onSubmit(data: Note) {
    const cdTimeStr = `${data.note.creationDate}`;
    const formattedCD = new Date(cdTimeStr);

    const mdTimeStr = `${data.note.creationDate}`;
    const formattedMD = new Date(mdTimeStr);

    data.note.creationDate = formattedCD.toISOString();
    data.note.modificationDate = formattedMD.toISOString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIBRAIN_API_BASE_URL}/note`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
    if (response.status != 201) {
      toast.error("something went wrong... try again later");
      return;
    }
    const { id } = await response.json();
    const uploadRes = await fetch("http://localhost:8080/api/v1/note/chunk", {
      method: "POST",
      body: JSON.stringify({ ...data.note, id }),
    });

    toast.success("successfully added note");
    reset();
  }
  return (
    <div className="flex flex-col justify-center items-center justify-items-center mx-auto w-[50dvw]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full">
        <FieldGroup className="w-full">
          <div className="flex gap-x-2">
            <Controller
              name="note.title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    className="w-full max-h-30"
                    {...field}
                    id="title"
                    value={field.value || ""}
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
              name="note.creationDate"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="creationDate">Creation Date</FieldLabel>
                  <Input
                    type="date"
                    className="w-full"
                    {...field}
                    id="creationDate"
                    value={field.value || ""}
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

          <Controller
            name="note.content"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="content">Content</FieldLabel>
                <Textarea
                  className="w-full max-h-30"
                  {...field}
                  id="content"
                  value={field.value || ""}
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
          <AddTagSelector
            addTagHandler={addTagHandler}
            tags={tags}
            onTagsChange={(tags) => setValue("tags", tags)}
          />
        </FieldGroup>
        <div className="flex justify-end">
          <Button type="submit" className="cursor-pointer">
            Add Note
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadNote;
