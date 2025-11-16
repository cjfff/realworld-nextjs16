import { useEffect } from "react"
import { UseFormSetError } from "react-hook-form"

export const useErrorSync = ({ setError, state }: { setError: UseFormSetError<any>, state?: { errors?: Record<string, string[]> } }) => {
    useEffect(() => {
        if (!Object.keys(state?.errors || {}).length) {
            return
        }

        Object.keys(state?.errors!).forEach(key => {
            setError(key, {
                message: state?.errors?.[key]?.at(0)
            })
        })
    }, [state?.errors, setError])
}
