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
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const { handleStoreValues } = useFormValues();
  const [undoIndex, setUndo] = useState<number[] | []>([]);

  const [openUndo, setOpenUndo] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<ItemProps[] | []>([]);

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
    setFormValues(values);
    setOpenModal(true);
  };

  const handleAddNew = () => {
    append({ id: "", name: "", last_name: "" });
  };

  const handleRemove = (itemIndex: number, itemId: string) => {
    if (!itemId || itemId === "") {
      return remove(itemIndex);
    }

    // add item to undo array
    setOpenUndo(true);
    const addedIndex = [itemIndex, ...undoIndex];
    setUndo(addedIndex);
    
    return update(itemIndex, {
      ...fields[itemIndex],
      _destroy: true,
    } as ItemProps);
    
  };

  const handleUndo = (itemIndex: number) => {
    const updatedItem = { ...fields[itemIndex] };

    delete updatedItem._destroy;
    update(itemIndex, updatedItem);

    // Remove item from undo array
    const removedIndex = undoIndex.filter((index) => index !== itemIndex);
    setUndo(removedIndex);

    if (undoIndex.length === 1) {
      setOpenUndo(false);
    }
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
        {openUndo && (
          <div className="toast toast-top toast-start z-50">
            <div className="flex flex-row justify-end items-center">
              <div className="btn bg-slate-600 hover:bg-slate-700" onClick={() => {
                const lastItem = undoIndex[undoIndex.length - 1];
                handleUndo(lastItem)
              }}>
                <div className="text-white">
                  <span className="badge mr-2">{undoIndex.length}</span>
                  <span>Undo</span>
                </div>
                <IconUndo />
              </div>
              <span
                className="btn btn-sm btn-circle bg-slate-600 hover:bg-slate-700 ml-2"
                onClick={() => setOpenUndo(false)}
              >
                ✕
              </span>
            </div>
          </div>
        )}
          
        <h2 className="font-bold">Form Field Arrays</h2>
        <div className="flex flex-col justify-between h-full">
          <div className="form-container">
            {fields.map((field, index) => {
              if ((field as ItemProps)?._destroy) return null;

              return (
                <div key={field.form_id} className="card form-item bg-neutral mt-4">
                  <h2>Form <span className="font-bold ml-2 badge text-counter" /></h2>
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

      <dialog id="my_modal_1" className="modal" open={isModalOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-accent">Information Sent Successfully!</h3>
          <p className="py-4">(Just imagine that the information was sent; nothing is actually connected to a server 😛)</p>
          <span className="font-bold">Result:</span>
          <div className="text-left bg-slate-800 p-4 rounded-lg mt-4">
            <pre>{JSON.stringify(formValues, null, 2)}</pre>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => setOpenModal(false)}>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </FormProvider>
  );
};
export default Form;
