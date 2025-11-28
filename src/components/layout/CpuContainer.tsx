import { OpCodesForm } from '../forms/OpCodes';
import { PointersForm } from '../forms/Pointers';
import { RamForm } from '../forms/Ram';
import { RegistersForm } from '../forms/Registers';
import { StatusWindow } from '../forms/StatusWindow';
import { Link } from '../composables/link';
import { useState, type FormEvent } from 'react';
import { $toast } from '../../store/notificationStore';
export function CpuLayout() {
    const [disable, setDisable] = useState(false);
    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setDisable(true);
        const formdata = new FormData(e.target as HTMLFormElement);
        const response = await fetch('/api/gameboy', {
            method: 'POST',
            body: formdata,
        });
        $toast.set([{ message: 'loading for result', type: 'loading' }]);
        const data = await response.json();
        if (response.ok) {
        }
        console.log(data);
    }
    return (
        // todo
        // make error when invalid format for the input
        // as well as a hover to say "hey you can't do that"

        // need global checker to see if everything is goochie
        // string value must be a legal hexadecimal
        // a regular number
        // not over 0xff
        <form method="post" onSubmit={submit} className="cpu--container">
            <Link name="CPU" link="cpu" />
            <Link name="Catridge" link="cartridge" />
            <RegistersForm />
            <StatusWindow />
            <PointersForm />
            <RamForm />
            <OpCodesForm isDisabled={disable} />
        </form>
    );
}
