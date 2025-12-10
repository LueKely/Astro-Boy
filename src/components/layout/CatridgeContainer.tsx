import { useRef, useState, type FormEvent } from 'react';
import { Link } from '../composables/link';
import { $toast } from '../../store/notificationStore';
import { FormButton } from '../composables/button';

export function CartridgeLayout() {
    const [disable, setDisable] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setDisable(true);
        try {
            const formdata = new FormData(e.target as HTMLFormElement);

            console.log([...formdata.entries()]);
            const response = await fetch('/api/cartridge', {
                method: 'POST',
                body: formdata,
            });
            if (response.ok) {
                const data = await response.json();
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
        <form ref={formRef} method="post" onSubmit={submit} className="cartridge--container">
            <Link name="CPU" link="cpu" />
            <Link name="Cartridge" link="cartridge" />
            <label className="file--button" htmlFor="fileInput">
                Insert Gameboy File
            </label>
            <input
                onChange={() => {
                    if (formRef.current) {
                        // read on this
                        formRef.current?.dispatchEvent(
                            new Event('submit', { cancelable: true, bubbles: true })
                        );
                    }
                }}
                name="fileInput"
                type="file"
                accept=".gb"
                id="fileInput"
            />
        </form>
    );
}
