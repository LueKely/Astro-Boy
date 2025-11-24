import { useRef, type FormEventHandler } from 'react';
import { FormInput } from '../composables/input';
export function RegistersForm() {
    const aRegister = useRef<HTMLInputElement>(null);

    return (
        <fieldset className="register">
            <legend>Registers</legend>
            <FormInput ref={aRegister} inputName="A"></FormInput>
        </fieldset>
    );
}
