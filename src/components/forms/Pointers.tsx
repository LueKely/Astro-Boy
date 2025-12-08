import { useRef } from 'react';
import { FormInput } from '../composables/input';

export function PointersForm() {
    return (
        <fieldset className="pointers">
            <legend>Pointers</legend>
            <FormInput displayName="PC" inputName="pc"></FormInput>
            <FormInput displayName="SP" inputName="sp"></FormInput>{' '}
            <FormInput displayName="Lower Bit" inputName="lb"></FormInput>
            <FormInput displayName="Upper Bit" inputName="ub"></FormInput>
        </fieldset>
    );
}
