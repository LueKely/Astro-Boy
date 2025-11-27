import { FormButton } from '../composables/button';
import { SelectSearchInput } from '../composables/selectSearch';

export function OpCodesForm({ isDisabled }: { isDisabled: boolean }) {
    return (
        <fieldset className="opcode">
            <legend>Opcode</legend>
            <SelectSearchInput />
            <FormButton isDisabled={isDisabled} name="Execute!" />
        </fieldset>
    );
}
