import { useRef, type FormEventHandler } from 'react';
import { FormButton } from '../composables/button';
import { FormInput } from '../composables/input';
export function RegistersForm() {
    const aRegister = useRef<HTMLInputElement>(null);

    return (
        <form
            className="register"
            onSubmit={(e) => {
                e.preventDefault();
            }}>
            <fieldset>
                <legend>Registers</legend>
                <FormInput ref={aRegister} inputName="A"></FormInput>

            </fieldset>
        </form>
    );
}
