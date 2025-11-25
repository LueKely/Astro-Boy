import { useRef } from 'react';
import { FormInput } from '../composables/input';
export function RegistersForm() {
    const aRegister = useRef<HTMLInputElement>(null);
    const bRegister = useRef<HTMLInputElement>(null);
    const cRegister = useRef<HTMLInputElement>(null);
    const dRegister = useRef<HTMLInputElement>(null);
    const eRegister = useRef<HTMLInputElement>(null);
    const fRegister = useRef<HTMLInputElement>(null);
    const hRegister = useRef<HTMLInputElement>(null);
    const lRegister = useRef<HTMLInputElement>(null);
    return (
        <fieldset className="register">
            <legend>Registers</legend>
            <FormInput ref={aRegister} inputName="A"></FormInput>
            <FormInput ref={fRegister} inputName="F"></FormInput>
            <FormInput ref={bRegister} inputName="B"></FormInput>
            <FormInput ref={cRegister} inputName="C"></FormInput>
            <FormInput ref={dRegister} inputName="D"></FormInput>
            <FormInput ref={eRegister} inputName="E"></FormInput>
            <FormInput ref={hRegister} inputName="H"></FormInput>
            <FormInput ref={lRegister} inputName="L"></FormInput>
        </fieldset>
    );
}
