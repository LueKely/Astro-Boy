import { useRef, useState, type FormEvent } from 'react';
import { Link } from '../composables/link';
import { $toast } from '../../store/notificationStore';
import type { ICartridge } from '../../lib/Cartridge/types/InferCartridge';
import { CartridgeStats } from './CartridgeStats';

export function CartridgeLayout() {
    const [disable, setDisable] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [cartridge, setCartridge] = useState<Partial<ICartridge>>();
    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setDisable(true);
        const formdata = new FormData(e.target as HTMLFormElement);

        const response = await fetch('/api/cartridge', {
            method: 'POST',
            body: formdata,
        });
        if (response.ok) {
            const data = await response.json();
            setCartridge(data.payload as ICartridge);
            $toast.set([{ message: 'Operation Successful', type: 'success' }]);
            setTimeout(() => {
                setDisable(false);
            }, 2000);
        } else {
            $toast.set([{ message: 'Error', type: 'failure' }]);
            setTimeout(() => {
                setDisable(false);
            }, 2000);
        }
    }
    return (
        <form ref={formRef} method="post" onSubmit={submit} className="cartridge--container">
            <Link name="CPU" link="cpu" />
            <Link name="Cartridge" link="cartridge" />
            {cartridge == undefined && (
                <div className="cartridge_file--wrapper">
                    <img width={300} height={300} src="/cartridge.png" />
                    <label className="file--button" htmlFor="fileInput">
                        Insert Gameboy File
                    </label>

                    <input
                        disabled={disable}
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
                </div>
            )}

            {cartridge != undefined && (
                <div className="stat--container">
                    <label className="file--button alt" htmlFor="fileInput">
                        Insert Another
                    </label>
                    <input
                        disabled={disable}
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
                    <CartridgeStats cartridge={cartridge as ICartridge}></CartridgeStats>
                </div>
            )}
        </form>
    );
}
