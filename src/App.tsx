import { useEffect } from "react";
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

  useEffect(() => {
    if (errors.firstName) {
      document.getElementById("firstName-error")?.focus();
    }

    if (errors.lastName) {
      document.getElementById("lastName-error")?.focus();
    }

    if (errors.signature) {
      document.getElementById("signature-error")?.focus();
    }
  }, [errors]);

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  const isValidName = (input: string) => {
    const regex = /^[A-Z][a-zA-Z ]{1,}$/;

    if (!regex.test(input))
      return "Should start with capital letter, then only letters/spaces (min 2 characters)";

    if (input !== input.trim()) return "Should not have leading/trailing space";

    if (input.trim().length === 0) return "Cannot be only spaces";

    return true;
  };

  const isValidSignature = (input: string) => {
    if (!firstName || !lastName) return "Name data missing";

    const first3 = firstName.substring(0, 3).toLowerCase();
    const last = lastName.toLowerCase();
    const userInput = input.toLowerCase();

    if (!userInput.startsWith(first3))
      return `Signature must start with first 3 letters of first name (${first3})`;

    if (userInput.slice(3) !== last)
      return `Signature must end with the last name (${last})`;

    return true;
  };

  const onSubmit = (data: FormValue) => {
    alert(
      `The data entered is: ${data.firstName}, ${data.lastName}, ${data.signature}`
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
