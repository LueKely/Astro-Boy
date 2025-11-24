import { useRef } from 'react';
import { FormInput } from '../composables/input';
export function RegistersForm() {
    const aRegister = useRef<HTMLInputElement>(null);

    return (
        <fieldset className="register">
            <legend>Registers</legend>
            <FormInput ref={aRegister} inputName="A"></FormInput>
            <FormInput ref={aRegister} inputName="F"></FormInput>
            <FormInput ref={aRegister} inputName="B"></FormInput>
            <FormInput ref={aRegister} inputName="C"></FormInput>
            <FormInput ref={aRegister} inputName="D"></FormInput>
            <FormInput ref={aRegister} inputName="E"></FormInput>
            <FormInput ref={aRegister} inputName="H"></FormInput>
            <FormInput ref={aRegister} inputName="L"></FormInput>
        </fieldset>
    );
}
