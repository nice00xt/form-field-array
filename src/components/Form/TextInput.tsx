import { forwardRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext, Controller } from 'react-hook-form';

type InputProps = {
  label: string;
  placeholder: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
};

const TextInput = ({ label, placeholder, name, errors, ...rest }: InputProps) => {
  const { control } = useFormContext();

  return (
    <div className="w-full flex flex-col relative mb-4">
      <label className="label">
        <span className="label-text">{label}</span>
      </label> 
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder={placeholder}
            className="input input-bordered"
            {...rest}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="text-xs text-error w-full text-right absolute mt-[13px]">{message}</span>
        )}
      />
    </div>
  );
};

export default TextInput;