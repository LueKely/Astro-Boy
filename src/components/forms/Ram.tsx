import { FormButton } from '../composables/button';
import { FormInput } from '../composables/input';

export function RamForm() {
    return (
        <fieldset className="ram">
            <legend>Ram</legend>
            {/*<FormButton name="Gaming"></FormButton>*/}
            <FormInput
                displayName="Address"
                styleName={{ width: '200px' }}
                inputName="addressPointer"></FormInput>
            <FormInput
                displayName="Value"
                styleName={{ width: '200px' }}
                inputName="addressValue"></FormInput>
        </fieldset>
    );
}
