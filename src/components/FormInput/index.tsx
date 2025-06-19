import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  id,
  placeholder,
  error,
  registration,
}) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? `${id}-error` : undefined}
      {...registration}
    />
    {error && (
      <p
        role="alert"
        tabIndex={-1}
        className="error-message"
        id={`${id}-error`}
      >
        {error.message}
      </p>
    )}
  </div>
);

export default FormInput;
