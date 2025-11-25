import { FormButton } from '../composables/button';
import { FormInput } from '../composables/input';

export function RamForm() {
    return (
        <fieldset className="ram">
            <legend>Ram</legend>
            {/*<FormButton name="Gaming"></FormButton>*/}
            <FormInput ref={null} styleName={{ width: '200px' }} inputName="Address"></FormInput>
            <FormInput ref={null} styleName={{ width: '200px' }} inputName="Value"></FormInput>
        </fieldset>
    );
}
