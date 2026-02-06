'use client'

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { DocumentMeta, DocumentMetaSchema, getResetData } from "@/modules/shared/forms/document-meta-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"


const UploadFile = () => {
  const [fileProvided, setFileProvided] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { reset, control, handleSubmit, formState: { errors, isDirty, dirtyFields } } = useForm<DocumentMeta>({
    resolver: zodResolver(DocumentMetaSchema)
  })

  async function populateForm(e: ChangeEvent<HTMLInputElement>) {
    const hasFile = !!e.target.files?.[0]
    setFileProvided(hasFile)
    if (hasFile) {
      const formData = new FormData();
      formData.append("fileInput", e.target.files![0])

      setSelectedFile(e.target.files![0])
      setIsLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STIRLING_API_BASE_URL}/api/v1/analysis/document-properties`, {
          method: "POST",
          headers: {
            "X-API-KEY": `${process.env.NEXT_PUBLIC_STIRLING_API_KEY}`
          },
          body: formData
        })

        const data: DocumentMeta = await response.json()
        setIsLoading(false)
        reset(data);
      } catch (e) {
        console.log(e)
        setIsLoading(false)
      }
    }
  }


  async function onSubmit(data: DocumentMeta) {
    let endpoint = `${process.env.NEXT_PUBLIC_MEDIBRAIN_API_BASE_URL}/api/v1/document/upload`;
    const formData = new FormData();
    formData.append("fileInput", selectedFile!)

    try {
      if (isDirty) {
        endpoint = `${process.env.NEXT_PUBLIC_MEDIBRAIN_API_BASE_URL}/api/v1/document/upload-with-edit`
        const metadataBody: Partial<DocumentMeta> = {}
        Object.keys(dirtyFields).forEach((field) => {
          if (field in DocumentMetaSchema.shape) {
            const key = field as keyof DocumentMeta
            metadataBody[key] = data[key];
          }
        })
        console.table(metadataBody)
        formData.append("metadata", JSON.stringify(metadataBody))
        // const result = await editResponse.json();
      }


      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "X-API-KEY": `${process.env.NEXT_PUBLIC_STIRLING_API_KEY}`
        },
        body: formData
      })

      // const result = await uploadResponse.json();

      toast.success("Succesfully uploaded document")
      const resetData: DocumentMeta = getResetData();
      reset(resetData)

      const input = document.getElementById('fileInput') as HTMLInputElement
      if (input) input.value = ''
      setFileProvided(false)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center max-w-md mx-auto items-center text-center">
      <Field className="text-center space-y-3">
        <FieldLabel className="text-center text-lg font-semibold" htmlFor="fileInput">
          Document
        </FieldLabel>

        <Input
          id="fileInput"
          type="file"
          onChange={populateForm}
          className="flex cursor-pointer hover:bg-gray-100"
        />

        <FieldDescription className="text-sm text-muted-foreground mt-0 pt-0">
          Select a PDF, DOC, or image file to upload
        </FieldDescription>
      </Field>
      {/*TODO: prob not most efficient way to do conditional rendering look into this*/}
      <div className={fileProvided ? "block animate-in fade-in duration-300 w-[50dvw]" : "hidden"}>
        <div className={!isLoading ? "block border rounded-lg p-4 bg-card space-y-4" : "hidden"}>
          <p className="text-sm font-medium">Ready to upload?</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <FieldGroup>
              <Controller
                name="author"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="author">
                      Author
                    </FieldLabel>
                    <Input
                      {...field}
                      id="author"
                      value={field.value || ''}
                      aria-invalid={fieldState.invalid}
                      placeholder="undefined"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="creator"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="creator">
                      Creator
                    </FieldLabel>
                    <Input
                      {...field}
                      id="creator"
                      value={field.value || ''}
                      aria-invalid={fieldState.invalid}
                      placeholder="undefined"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="flex gap-x-1">
                <Controller
                  name="creationDate"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="creationDate">
                        Creation Date
                      </FieldLabel>
                      <Input
                        {...field}
                        id="creator"
                        value={field.value || ''}
                        aria-invalid={fieldState.invalid}
                        placeholder="undefined"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="modificationDate"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="modificationDate">
                        Modification Date
                      </FieldLabel>
                      <Input
                        {...field}
                        id="modificationDate"
                        value={field.value || ''}
                        aria-invalid={fieldState.invalid}
                        placeholder="undefined"
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
                name="keywords"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="keywords">
                      keywords
                    </FieldLabel>
                    <Input
                      {...field}
                      id="keywords"
                      value={field.value || ''}
                      aria-invalid={fieldState.invalid}
                      placeholder="undefined"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex justify-end gap-x-2">
              <Button
                type="submit"
                className="cursor-pointer"
              >
                Upload Document
              </Button>
              <Button
                type="button"
                className="cursor-pointer bg-red-700 hover:bg-red-500"
                onClick={() => {
                  const input = document.getElementById('fileInput') as HTMLInputElement
                  if (input) input.value = ''
                  setFileProvided(false)
                }}
              >
                Cancel
              </Button>

            </div>

          </form>
        </div>

        <div className={isLoading && fileProvided ? " flex justify-center" : "hidden"}>
          <Spinner variant="circle" size={32} />
        </div>
      </div >
    </div >
  )
}

export default UploadFile
