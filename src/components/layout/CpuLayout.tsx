import { OpCodesForm } from '../forms/OpCodes';
import { PointersForm } from '../forms/Pointers';
import { RamForm } from '../forms/Ram';
import { RegistersForm } from '../forms/Registers';
import { StatusWindow } from '../forms/StatusWindow';
import { Link } from '../composables/link';
import type { FormEvent } from 'react';
export function CpuLayout() {
    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formdata = new FormData(e.target as HTMLFormElement);
        const response = await fetch('/api/gameboy', {
            method: 'POST',
            body: formdata,
        });

        const data = await response.json();
        console.log(data);
    }
    return (
        // make context thingy mabob
        <form method="post" onSubmit={submit} className="cpu--container">
            <Link name="CPU" link="cpu" />
            <Link name="Catridge" link="cartridge" />
            <RegistersForm />
            <StatusWindow />
            <PointersForm />
            <RamForm />
            <OpCodesForm />
        </form>
    );
}
