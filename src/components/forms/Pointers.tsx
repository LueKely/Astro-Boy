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
                styleName={{ textAlign: 'center', width: '230px' }}
                ref={pc}></FormInput>
            <FormInput
                inputName="Stack Pointer"
                styleName={{ textAlign: 'center', width: '230px' }}
                ref={sp}></FormInput>
        </fieldset>
    );
}
