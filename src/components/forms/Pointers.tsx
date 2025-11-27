import { useRef } from 'react';
import { FormInput } from '../composables/input';

export function PointersForm() {
    return (
        <fieldset className="pointers">
            <legend>Pointers</legend>
            <FormInput
                inputName="Program Counter"
                styleName={{ textAlign: 'center', width: '230px' }}></FormInput>
            <FormInput
                inputName="Stack Pointer"
                styleName={{ textAlign: 'center', width: '230px' }}></FormInput>{' '}
            <FormInput
                inputName="Lower Bit"
                styleName={{ textAlign: 'center', width: '230px' }}></FormInput>
            <FormInput
                inputName="Upper Bit"
                styleName={{ textAlign: 'center', width: '230px' }}></FormInput>
        </fieldset>
    );
}
