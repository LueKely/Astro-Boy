import type { APIRoute } from 'astro';
import type { TFormKey } from '../../store/formDataStore';
import { Gameboy } from '../../lib/Gameboy';
import { Ram } from '../../lib/Ram/Ram';
import { GameBoyCatridge } from '../../lib/Cartridge/Cartridge';
import { Register_File } from '../../lib/Cpu/Register_File';

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.entries();
    const registerRecord: Partial<Record<TFormKey, FormDataEntryValue>> = {};
    const outcome: Record<TFormKey, FormDataEntryValue> = {
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        H: '',
        L: '',
        pc: '',
        sp: '',
        addressValue: '',
        lb: '',
        opcode: '',
        addressPointer: '',
        ub: '',
    };
    for (const pair of name) {
        registerRecord[pair[0] as TFormKey] = pair[1];
    }
    try {
        // console.log(JSON.parse(registerRecord.opcodeName as string));
        const rom = new ArrayBuffer(1024);
        const ram = new Ram();
        const cart = new GameBoyCatridge(rom, registerRecord as Record<TFormKey, string>);
        const registerFile = new Register_File(registerRecord as Record<TFormKey, string>);
        const gameboy = new Gameboy(ram, cart, registerFile);
        console.log(gameboy.ram.memory[0x100]);
        gameboy.run();
        console.log(gameboy.scheduler.currentOpcode);
        // i could probably made a class for this but i'm too lazy man
        outcome.A = '0x' + registerFile.A.getRegister().toString(16);
        outcome.B = '0x' + registerFile.B.getRegister().toString(16);
        outcome.C = '0x' + registerFile.C.getRegister().toString(16);
        outcome.D = '0x' + registerFile.D.getRegister().toString(16);
        outcome.E = '0x' + registerFile.E.getRegister().toString(16);
        outcome.F = '0x' + registerFile.F.getRegister().toString(16);
        outcome.H = '0x' + registerFile.H.getRegister().toString(16);
        outcome.L = '0x' + registerFile.L.getRegister().toString(16);
        outcome.pc = '0x' + registerFile.pointers.PC.getRegister().toString(16);
        outcome.sp = '0x' + registerFile.pointers.SP.getRegister().toString(16);
        outcome.addressPointer = registerRecord.addressPointer as string;
        outcome.addressValue =
            '0x' +
            ram.memory[parseInt(registerRecord['addressPointer'] as string, 16)].toString(16);
        outcome.opcode = registerRecord.opcode as string;
        outcome.ub = registerRecord.ub as string;
        outcome.lb = registerRecord.lb as string;

        return new Response(
            JSON.stringify({
                message: 'Success!',
                payload: outcome,
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
