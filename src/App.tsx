import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "./App.css";

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
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            aria-invalid={errors.firstName ? "true" : "false"}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            {...register("firstName", {
              required: "First Name is required",
              validate: isValidName,
            })}
          />
          {errors.firstName && (
            <p
              role="alert"
              tabIndex={-1}
              className="error-message"
              id="firstName-error"
            >
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            aria-invalid={errors.lastName ? "true" : "false"}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            {...register("lastName", {
              required: "Last Name is required",
              validate: isValidName,
            })}
          />
          {errors.lastName && (
            <p
              role="alert"
              tabIndex={-1}
              className="error-message"
              id="lastName-error"
            >
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="signature">Signature</label>
          <input
            type="text"
            id="signature"
            placeholder="Signature"
            aria-invalid={errors.signature ? "true" : "false"}
            aria-describedby={errors.signature ? "signature-error" : undefined}
            {...register("signature", {
              required: "Signature is required",
              validate: isValidSignature,
            })}
          />
          {errors.signature && (
            <p
              role="alert"
              tabIndex={-1}
              className="error-message"
              id="signature-error"
            >
              {errors.signature.message}
            </p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <DevTool control={control} />
    </main>
  );
}

export default App;
