import { useRef } from 'react';
import { FormInput } from '../composables/input';

export function PointersForm() {
    return (
        <fieldset className="pointers">
            <legend>Pointers</legend>
            <FormInput
                displayName="PC"
                inputName="pc"
                styleName={{ textAlign: 'center', width: '230px' }}></FormInput>
            <FormInput
                displayName="SP"
                inputName="sp"
                styleName={{ textAlign: 'center', width: '230px' }}></FormInput>{' '}
            <FormInput
                displayName="Lower Bit"
                inputName="lb"
                styleName={{ textAlign: 'center', width: '230px' }}></FormInput>
            <FormInput
                displayName="Upper Bit"
                inputName="ub"
                styleName={{ textAlign: 'center', width: '230px' }}></FormInput>
        </fieldset>
    );
}
