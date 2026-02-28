"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tag, TagSchema } from "@/modules/shared/forms/add-tags-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";

const AddTagDialog = ({
  addTagHandler,
}: {
  addTagHandler: (tag: Tag) => void;
}) => {
  async function addTag(tag: Tag) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIBRAIN_API_BASE_URL}/note/tag`,
      {
        method: "POST",
        body: JSON.stringify(tag),
      },
    );

    if (response.status == 409) {
      toast.error("Tag already exists");
      setError("name", {
        type: "manual",
        message: "tag already exists!",
      });
      return;
    } else if (response.status != 201) {
      toast.error("Something went wrong try again later");
      setError("name", {
        type: "manual",
        message: "Something went wrong try again later",
      });
      return;
    }

    const createdTag: Tag = await response.json();
    addTagHandler(createdTag);
    toast.success(`Successfully created ${createdTag.name} tag`);
    reset();
  }

  const {
    reset,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Tag>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="cursor-pointer text-center text-blue-500 block flex justify-center items-center w-full"
        >
          Add tags
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <form onSubmit={handleSubmit(addTag)}>
            <DialogHeader>
              <DialogTitle>Add A New Tag</DialogTitle>
            </DialogHeader>

            <FieldGroup>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      value={field.value || ""}
                      aria-invalid={fieldState.invalid}
                      placeholder="Add name of tag..."
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTagDialog;
