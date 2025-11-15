"use client"

import { useRef, useTransition } from "react"
import { loginAction } from './action'
import { useForm } from "react-hook-form"
import { resolver } from "@/lib/schemas/login"
import { ErrorMessage } from "@/components/ErrorMessage"
import { useResettableActionState } from "@/hooks/useResetActionState"

export default function LoginForm() {
    const [state, disaptch, isPending, reset] = useResettableActionState(loginAction, undefined)

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
                            return <li key={error}>{error}</li>
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
                }} 
                onChange={() => reset()}
                >
                <fieldset className="form-group">
                    <input  {...register('email')} className="form-control form-control-lg" type="text" placeholder="Email" />
                </fieldset>
                <ErrorMessage error={errors.email} />

                <fieldset className="form-group">
                    <input  {...register('password')} className="form-control form-control-lg" type="password" placeholder="Password" />
                </fieldset>
                <ErrorMessage error={errors.password} />

                <button type="submit" className="btn btn-lg btn-primary pull-xs-right" disabled={isPending}>{isPending ? 'pending' : "Sign in"}</button>
            </form>

        </>
    )
}