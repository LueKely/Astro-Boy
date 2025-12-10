import { OpCodesForm } from '../forms/OpCodes';
import { PointersForm } from '../forms/Pointers';
import { RamForm } from '../forms/Ram';
import { RegistersForm } from '../forms/Registers';
import { StatusWindow } from '../forms/StatusWindow';
import { Link } from '../composables/link';
import { useState, type FormEvent } from 'react';
import { $toast } from '../../store/notificationStore';
import { $formResponseStore } from '../../store/formDataStore';
export function CpuLayout() {
    const [disable, setDisable] = useState(false);
    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setDisable(true);
        try {
            const formdata = new FormData(e.target as HTMLFormElement);
            const response = await fetch('/api/gameboy', {
                method: 'POST',
                body: formdata,
            });

            if (response.ok) {
                const data = await response.json();
                $formResponseStore.set(data.payload);
                console.log(data);
                $toast.set([{ message: 'Operation Successful', type: 'success' }]);
                setTimeout(() => {
                    setDisable(false);
                }, 2000);
            } else {
                setTimeout(() => {
                    setDisable(false);
                }, 2000);
                $toast.set([{ message: 'Error', type: 'failure' }]);
            }
        } catch {
            setTimeout(() => {
                setDisable(false);
            }, 2000);
        }
    }
    return (
        <form method="post" onSubmit={submit} className="cpu--container">
            <Link name="CPU" link="cpu" />
            <Link name="Cartridge" link="cartridge" />
            <RegistersForm />
            <StatusWindow />
            <PointersForm />
            <RamForm />
            <OpCodesForm isDisabled={disable} />
        </form>
    );
}
