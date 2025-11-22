import fetchClient from "@/lib/api";
import { logout } from "./actions";
import { SettingsForm } from './SettingForm'

export default async function Settings() {
    const data = await fetchClient.GET('/user')

    

    return <div className="settings-page">
        <div className="container page">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h1 className="text-xs-center">Your Settings</h1>
                    <SettingsForm user={data.data?.user!} />
                    <hr />
                    <form action={logout}>
                        <button type="submit" className="btn btn-outline-danger">Or click here to logout.</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
}