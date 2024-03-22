import { ErrorMessage } from "@hookform/error-message";

type InputProps = {
  label: string;
  placeholder: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
};

const Input = ({ label, placeholder, name, errors, ...props }: InputProps) => {

  return (
    <div className="w-full flex flex-col relative mb-4">
      <label className="label">
        <span className="label-text">{label}</span>
      </label> 
      <input
        {...props}
        type="text"
        placeholder={placeholder}
        className={`input input-bordered ${errors[name] ? 'input-error' : ''}`}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="text-xs text-error w-full text-right absolute mt-[13px]">{message}</span>
        )}
      />
    </div>
  )
};

export default Input;
