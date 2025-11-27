import { useEffect, useRef, type RefObject } from 'react';
import { FormInput } from '../composables/input';

export function RegistersForm() {
    return (
        <fieldset className="register">
            <legend>Registers</legend>
            <FormInput inputName="A"></FormInput>
            <FormInput inputName="F"></FormInput>
            <FormInput inputName="B"></FormInput>
            <FormInput inputName="C"></FormInput>
            <FormInput inputName="D"></FormInput>
            <FormInput inputName="E"></FormInput>
            <FormInput inputName="H"></FormInput>
            <FormInput inputName="L"></FormInput>
        </fieldset>
    );
}
