/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useForm, useFieldArray, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconTrash, IconPlus, IconSubmit } from "../Icons";
import { useGetValues } from "../hooks/useGetValues";

import * as z from "zod";
import Input from "./Input";
import type { FormValues } from "../types";

type ItemProps = FormValues["items"][number];

const formSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1, "* Required field"),
      last_name: z.string().min(1, "* Required field"),
      _destroy: z.string().optional(),
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

export const Form = () => {
  const { storedValues, setStoredValues } = useGetValues();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const { control, handleSubmit, formState: { errors } } = form;
  
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "items",
    keyName: "form_id",
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  const handleAddNew = () => {
    append({ id: "", name: "", last_name: "" });
  };

  const handleRemove = (itemIndex: number, itemId: string) => {
    if (!itemId || itemId === "") {
      remove(itemIndex);
    }

    update(itemIndex, {
      ...fields[itemIndex],
      _destroy: "1",
    } as ItemProps);
  };

  // const handleUndo = (itemIndex: number) => {
  //   update(itemIndex, {
  //     ...fields[itemIndex],
  //     _destroy: undefined,
  //   } as ItemProps);
  // };

  const activeFields = fields.filter(
    (item: ItemProps) => !item._destroy
  ).length;

  useEffect(() => {
    setStoredValues(fields, 'hila');
  }, []);

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
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
                <Input
                  key={`name-${index}`}
                  label="Name"
                  placeholder="Name"
                  name={`items[${index}].name`}
                  errors={errors}
                />


                <Input
                  key={`last_name-${index}`}
                  label="Last Name"
                  name={`items[${index}].last_name`}
                  placeholder="Last Name"
                  errors={errors}
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
  );
};
export default Form;
