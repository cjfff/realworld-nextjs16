import Link from "next/link";
import RegistrationForm from "./_components/RegistrationForm";

export default function Register() {
    return <div className="auth-page">
        <div className="container page">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h1 className="text-xs-center">Sign up</h1>
                    <p className="text-xs-center">
                        <Link href="/login">
                            Have an account?
                        </Link>
                    </p>

                    <RegistrationForm />
                </div>
            </div>
        </div>
    </div>
}