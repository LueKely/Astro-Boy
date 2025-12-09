import type { APIRoute } from 'astro';
import type { TFormKey } from '../../store/formDataStore';

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.entries();
    const test: Partial<Record<TFormKey, FormDataEntryValue>> = {};

    try {
        for (const pair of name) {
            test[pair[0] as TFormKey] = pair[1];
        }
        return new Response(
            JSON.stringify({
                message: 'Success!',
                payload: test,
            }),
            { status: 200 }
        );
    } catch {
        return new Response(
            JSON.stringify({
                message: 'Missing required fields',
            }),
            { status: 400 }
        );
    }
};
