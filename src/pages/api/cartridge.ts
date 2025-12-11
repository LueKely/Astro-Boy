import type { APIRoute } from 'astro';
import { fileToArrayBuffer, loadFile } from '../../lib/utils/File_Utils';
import { GameBoyCatridge } from '../../lib/Cartridge/Cartridge';

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const file = data.get('fileInput') as File;
    const buffer = file.arrayBuffer();
    const cartridge = new GameBoyCatridge(await buffer);
    console.log(cartridge.inferCartridgeHeader());

    return new Response(
        JSON.stringify({
            message: 'Success!',
            payload: cartridge.inferCartridgeHeader(),
        }),
        { status: 200 }
    );
};

export const GET: APIRoute = ({ params, request }) => {
    return new Response(
        JSON.stringify({
            path: new URL(request.url).pathname,
        })
    );
};
