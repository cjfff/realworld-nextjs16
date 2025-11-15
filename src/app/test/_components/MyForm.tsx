"use client";

import Form from "next/form";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { User, schema } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
type ActionState = {
    errors: Record<string, { message: string }>;
    values: User;
};
const resolver = zodResolver(schema);
export const MyForm = ({
    action,
    values,
}: {
    action: (
        initialState: ActionState,
        formData: FormData
    ) => Promise<ActionState>;
    values: User;
}) => {
    const [state, formAction, isPending] = useActionState(action, {
        values,
        errors: {},
    });

    const { formState, register } = useForm({
        resolver,
        // Initialize the form with server-side errors
        errors: state.errors,
        // Make sure to use `onBlur`, `onChange`, or `onTouched` NOT `onSubmit`!
        mode: "onBlur",
        // Initialize the form with server-side values
        values: state.values,
    });

    console.log(formState.errors, formState, 'formState')

    return (
        <Form action={formAction}>
            <label>
                First Name
                <input
                    {...register("firstName", {value: state.values?.firstName})}
                />
                {formState.errors.firstName ? (
                    <p role="alert">{formState.errors.firstName.message}</p>
                ) : null}
            </label>

            <label>
                Last Name
                <input
                    {...register("lastName", { value: state.values?.lastName })}
                />
                {formState.errors.lastName ? (
                    <p role="alert">{formState.errors.lastName.message}</p>
                ) : null}
            </label>

            <button disabled={isPending}>Submit</button>
        </Form>
    );
};