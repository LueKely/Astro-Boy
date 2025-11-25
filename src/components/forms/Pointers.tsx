import { useRef } from 'react';
import { FormInput } from '../composables/input';

export function PointersForm() {
    const pc = useRef<HTMLInputElement>(null);
    const sp = useRef<HTMLInputElement>(null);
    return (
        <fieldset className="pointers">
            <legend>Pointers</legend>
            <FormInput
                inputName="Program Counter"
                styleName={{ textAlign: 'center' }}
                ref={pc}></FormInput>
            <FormInput
                inputName="Stack Pointer"
                styleName={{ textAlign: 'center' }}
                ref={sp}></FormInput>
        </fieldset>
    );
}
