import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "./App.css";
import FormInput from "./components/FormInput";

type FormValue = {
  firstName: string;
  lastName: string;
  signature: string;
};

function App() {
  const { register, control, handleSubmit, formState, watch, reset } =
    useForm<FormValue>({
      mode: "onChange",
    });

  const { errors } = formState;

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  const normalizeName = (name: string) => {
    return name.replace(/\s+/g, " ").trim();
  };
  const isValidName = (value: string) => {
    if (!value || value.trim().length < 2)
      return "Must be at least 2 characters";
    if (/^\s/.test(value)) return "Cannot start with a space";
    if (/\s$/.test(value)) return "Cannot end with a space";
    if (value.trim().length === 0) return "Cannot be only spaces";
    if (!/[A-Za-z]/.test(value)) return "Must contain letters";
    if (!/^[A-Z]/.test(value.trim()))
      return "First letter must be capital case";
    if (/\d/.test(value)) return "Numbers are not allowed";

    const allowedCharactersRegex = /^[A-Za-z .'\-_]+$/;
    if (!allowedCharactersRegex.test(value)) {
      return "Only letters, spaces, ., ', -, and _ are allowed";
    }

    return true;
  };

  const isValidSignature = (signature: string) => {
    if (!signature) return "Consent Signature is required";

    const firstPart = firstName?.slice(0, 3) || "";
    const expected = normalizeName(
      `${firstPart} ${lastName}`.toLowerCase().trim()
    );
    const actual = signature.toLowerCase().trim();

    if (actual !== expected) {
      return `Consent Signature must match "${firstPart} ${lastName}"`;
    }

    return true;
  };

  const onSubmit = (data: FormValue) => {
    alert(
      `The data entered is: ${normalizeName(data.firstName)}, ${normalizeName(
        data.lastName
      )}, ${data.signature}`
    );
    console.log(data);
    reset();
  };

  return (
    <main tabIndex={0} className="form-container">
      <h1 tabIndex={0}>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="First Name"
          id="firstName"
          placeholder="First Name"
          error={errors.firstName}
          registration={register("firstName", {
            required: "First Name is required",
            validate: isValidName,
          })}
        />

        <FormInput
          label="Last Name"
          id="lastName"
          placeholder="Last Name"
          error={errors.lastName}
          registration={register("lastName", {
            required: "Last Name is required",
            validate: isValidName,
          })}
        />

        <FormInput
          label="Signature"
          id="signature"
          placeholder="Signature"
          error={errors.signature}
          registration={register("signature", {
            required: "Signature is required",
            validate: isValidSignature,
          })}
        />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <DevTool control={control} />
    </main>
  );
}

export default App;
