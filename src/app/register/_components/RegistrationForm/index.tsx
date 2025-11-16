"use client"

import { useRef, useTransition } from "react"
import { signUpAction } from './action'
import { useForm } from "react-hook-form"
import { resolver } from "@/lib/schemas/register"
import { ErrorMessage } from "@/components/ErrorMessage"
import { useResettableActionState } from "@/hooks/useResetActionState"
import { useErrorSync } from "@/hooks/useSyncError"



export default function RegistrationForm() {
    const [state, disaptch, isPending, reset] = useResettableActionState(signUpAction, undefined)

    const formRef = useRef<HTMLFormElement>(null)

    const { register, formState: { errors }, handleSubmit, setError } = useForm({
        resolver,
        errors: {}
    })

    useErrorSync({ state, setError })


    const handleFormSubmit = async () => {
        await disaptch(new FormData(formRef.current!))
    }

    const [, startTransition] = useTransition()

    return (
        <>

            <ErrorMessage errors={state?.formErrors} />

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
            onChange={reset}
            >
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