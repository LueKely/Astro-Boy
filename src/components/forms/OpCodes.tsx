import { SelectSearchInput } from '../composables/selectSearch';

export function OpCodesForm() {
    return (
        <fieldset className="opcode">
            <legend>Opcode</legend>
            <SelectSearchInput />
        </fieldset>
    );
}
