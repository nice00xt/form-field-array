/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { useFormValues } from "../hooks/useGetValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconTrash, IconPlus, IconSubmit, IconUndo } from "../Icons";

import * as z from "zod";
import TextInput from "./TextInput";
import type { FormValues } from "../types";

type ItemProps = FormValues["items"][number];

const formSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1, "* Required field"),
      last_name: z.string().min(1, "* Required field"),
      _destroy: z.boolean().optional(),
    })
  ),
});

const initialValues = {
  items: [
    {
      id: "",
      name: "",
      last_name: "",
    },
  ],
};

type FormProps = {
  data: FormValues;
};

export const Form = ({ data }: FormProps) => {
  const { handleStoreValues } = useFormValues();
  const [undoIndex, setUndo] = useState<number | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: data || initialValues,
  });
  const { control, handleSubmit, formState: { errors, touchedFields } } = form;
  
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "items",
    keyName: "form_id",
  });

  const onSubmit = (values: FormValues) => {
    handleStoreValues(fields);
    console.log(values);
  };

  const handleAddNew = () => {
    append({ id: "", name: "", last_name: "" });
  };

  const handleRemove = (itemIndex: number, itemId: string) => {
    if (!itemId || itemId === "") {
      return remove(itemIndex);
    }

    setUndo(itemIndex);
    return update(itemIndex, {
      ...fields[itemIndex],
      _destroy: true,
    } as ItemProps);
  };

  const handleUndo = (itemIndex: number) => {
    const updatedItem = { ...fields[itemIndex] };

    delete updatedItem._destroy;
    update(itemIndex, updatedItem);
    setUndo(null);
  };

  const activeFields = fields.filter(
    (item: ItemProps) => !item._destroy
  ).length;


  useEffect(() => {
    const updatedItems = fields.map((item, index) => {
      if (touchedFields.items) {
        const touched = touchedFields.items[index] !== undefined;
        return { ...item, touched };
      }
      return item;
    });

    handleStoreValues(updatedItems);
  }, [fields]);


  return (
    <FormProvider {...form}>
      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
        {undoIndex !== null && (
          <div className="toast toast-top toast-start z-50">
            <div className="flex flex-row justify-end items-center">
              <div className="btn bg-slate-600 hover:bg-slate-700" onClick={() => handleUndo(undoIndex)}>
                <span className="text-white">Undo</span>
                <IconUndo />
              </div>
              <button
                className="btn btn-sm btn-circle bg-slate-600 hover:bg-slate-700 ml-2"
                onClick={() => setUndo(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
          
        <h2>Form Field Arrays</h2>
        <div className="flex flex-col justify-between h-full">
          <div>
            {fields.map((field, index) => {
              if ((field as ItemProps)?._destroy) return null;

              return (
                <div key={field.form_id} className="card bg-neutral mt-4">
                  <h2>Form</h2>
                  {activeFields > 1 && (
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      onClick={() => handleRemove(index, field.id)}
                    >
                      <IconTrash />
                    </button>
                  )}
                  <TextInput
                    key={`name-${field.form_id}`}
                    label="Name"
                    placeholder="Name"
                    errors={errors}
                    name={`items.${index}.name`}
                  />
                  <TextInput
                    key={`last_name-${field.form_id}`}
                    label="Last Name"
                    placeholder="Last Name"
                    errors={errors}
                    name={`items.${index}.last_name`}
                  />
                </div>
              );
            })}
            <div className="w-full flex justify-center">
              <div className="p-4 bg-neutral rounded-b-2xl">
                <button
                  className="btn btn-sm btn-accent w-full lg:max-w-[120px]"
                  type="button"
                  onClick={handleAddNew}
                >
                  <span className="text-white">Add new</span>
                  <IconPlus />
                </button>
              </div>
            </div>
          </div>

          <div className="btn-group flex flex-col lg:flex-row mt-7 justify-center">
            <button className="btn btn-primary w-full text-white mb-4">
              <span>Submit</span>
              <IconSubmit />
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
export default Form;
