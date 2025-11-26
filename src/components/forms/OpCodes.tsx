import { FormButton } from '../composables/button';
import { SelectSearchInput } from '../composables/selectSearch';

export function OpCodesForm() {
    return (
        <fieldset className="opcode">
            <legend>Opcode</legend>
            <SelectSearchInput />
            <FormButton isDisabled={true} name="Execute!" />
        </fieldset>
    );
}
