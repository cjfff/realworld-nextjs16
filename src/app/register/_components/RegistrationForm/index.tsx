"use client"

import { useActionState, useRef, useTransition } from "react"
import { signUpAction } from './action'
import { FieldError, useForm } from "react-hook-form"
import { resolver } from "./types"

const ErrorMessage = ({ error }: { error?: FieldError }) => {
    if (!error) {
        return
    }

    return <ul className="error-messages">
        <li>{error.message}</li>
    </ul>
}

export default function RegistrationForm() {
    const [state, disaptch, isPending] = useActionState(signUpAction, undefined)

    const formRef = useRef<HTMLFormElement>(null)

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver,
        errors: {}
    })

    const handleFormSubmit = async () => {
        await disaptch(new FormData(formRef.current!))
    }

    const [, startTransition] = useTransition()

    return (
        <>
            {
                state?.errors?.length ? <ul className="error-messages">

                    {
                        state.errors.map(error => {
                            return <li>{error}</li>
                        })
                    }
                </ul>
                    : null
            }


            <form 
            ref={formRef}
            onSubmit={e => {
                e.preventDefault()
                handleSubmit(() => {
                    startTransition(() => {
                        handleFormSubmit()
                    })
                })(e)
            }} >
                <fieldset className="form-group">
                    <input {...register('username')} className="form-control form-control-lg" type="text" placeholder="Username" />
                </fieldset>
                <ErrorMessage error={errors.username} />
                <fieldset className="form-group">
                    <input  {...register('email')} className="form-control form-control-lg" type="text" placeholder="Email" />
                </fieldset>
                <ErrorMessage error={errors.email} />

                <fieldset className="form-group">
                    <input  {...register('password')} className="form-control form-control-lg" type="password" placeholder="Password" />
                </fieldset>
                <ErrorMessage error={errors.password} />

                <button type="submit" className="btn btn-lg btn-primary pull-xs-right" disabled={isPending}>{isPending ? 'pending' : "Sign up"}</button>
            </form>

        </>
    )
}