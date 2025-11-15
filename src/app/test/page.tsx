import { MyForm } from "./_components/MyForm";
import { schema, User } from "./_components/type";

type ActionState = {
    errors: Record<string, { message: string }>;
    values: User;
};

const submitForm = async (initialState: ActionState, formData: FormData) => {
    "use server";

    const values = {
        firstName: String(formData.get("firstName") || ""),
        lastName: String(formData.get("lastName") || ""),
        // __timestamp: String(Date.now()),
    };

    const { error: parseError } = schema.safeParse(values);
    const errors: ActionState["errors"] = {};
    for (const { path, message } of parseError?.issues || []) {
        errors[path.join(".")] = { message };
    }

    console.log(
        values,
        errors
    )

    // TODO: server-side validation
    // Save data in a database or send it to an API.

    return {
        values,
        errors,
    };
};

const getData = async () => {
    "use server";

    // Fetch data from a database or API.
    return { firstName: "John", lastName: "Doe" };
};

export default async function Home() {
    const data = await getData();
    return <MyForm action={submitForm} values={data} />;
}