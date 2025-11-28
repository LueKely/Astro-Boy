import { useEffect, useRef, type RefObject } from 'react';
import { FormInput } from '../composables/input';

export function RegistersForm() {
    return (
        <fieldset className="register">
            <legend>Registers</legend>
            <FormInput displayName="Register A" inputName="A"></FormInput>
            <FormInput displayName="Register F" inputName="F"></FormInput>
            <FormInput displayName="Register B" inputName="B"></FormInput>
            <FormInput displayName="Register C" inputName="C"></FormInput>
            <FormInput displayName="Register D" inputName="D"></FormInput>
            <FormInput displayName="Register E" inputName="E"></FormInput>
            <FormInput displayName="Register H" inputName="H"></FormInput>
            <FormInput displayName="Register L" inputName="L"></FormInput>
        </fieldset>
    );
}
