import { FieldError } from "react-hook-form"

export const ErrorMessage = ({ error }: { error?: {message?: string} }) => {
    if (!error) {
        return
    }

    return <ul className="error-messages">
        <li>{error.message}</li>
    </ul>
}