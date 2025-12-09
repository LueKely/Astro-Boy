import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.entries();

    if (!true) {
        return new Response(
            JSON.stringify({
                message: 'Missing required fields',
            }),
            { status: 400 }
        );
    }
    return new Response(
        JSON.stringify({
            message: 'Success!',
            payload: 'poop',
        }),
        { status: 200 }
    );
};
