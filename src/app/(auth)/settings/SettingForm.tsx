"use client"

import { useRef, useTransition } from "react"
import { updateAction } from './actions'
import { useForm } from "react-hook-form"
import { resolver } from "@/lib/schemas/settings"
import { ErrorMessage } from "@/components/ErrorMessage"
import { useResettableActionState } from "@/hooks/useResetActionState"
import { useErrorSync } from "@/hooks/useSyncError"
import { components } from "@/consts/schema"
import { Container } from "@/context/user"

export function SettingsForm() {

    const [state, disaptch, isPending, reset] = useResettableActionState(updateAction, undefined)

    const {user} = Container.useContainer()

    const formRef = useRef<HTMLFormElement>(null)


    const { register, formState: { errors }, handleSubmit, setError } = useForm({
        resolver,
        errors: {},
        defaultValues: {
            ...user,
            image: user?.image || '',
            bio: user?.bio || '',
            password: null
        }
    })

    useErrorSync({
        state,
        setError, 
    })

    const handleFormSubmit = async () => {
        await disaptch(new FormData(formRef.current!))
    }

    const [, startTransition] = useTransition()

    return <>

        {state?.formErrors?.length ? <ul className="error-messages">
            {
                state.formErrors.map(error => {

                    return <li key={error}>{error}</li>
                })
            }
        </ul> : null}

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
            <fieldset>
                <fieldset className="form-group">
                    <input {...register('image')} className="form-control" type="text" placeholder="URL of profile picture" />
                </fieldset>
                <ErrorMessage error={errors.image} />

                <fieldset className="form-group">
                    <input {...register('username')} className="form-control form-control-lg" type="text" placeholder="Your Name" />
                </fieldset>
                <ErrorMessage error={errors.username} />

                <fieldset className="form-group">
                    <textarea
                        {...register('bio')}
                        className="form-control form-control-lg"
                        rows={8}
                        placeholder="Short bio about you"
                    ></textarea>
                </fieldset>
                <ErrorMessage error={errors.bio} />

                <fieldset className="form-group">
                    <input {...register('email')} className="form-control form-control-lg" type="text" placeholder="Email" />
                </fieldset>
                <ErrorMessage error={errors.email} />

                <fieldset className="form-group">
                    <input
                        {...register('password')}
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="New Password"
                    />
                </fieldset>
                <ErrorMessage error={errors.password} />

                <button className="btn btn-lg btn-primary pull-xs-right" disabled={isPending}>{isPending ? 'pending' : "Update Settings"}</button>
            </fieldset>
        </form>
    </>
}