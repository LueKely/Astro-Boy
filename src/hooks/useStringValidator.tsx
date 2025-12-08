import { useState } from 'react';
import { $validatorStore } from '../store/validateStore';

export function useStringValidator(): [boolean, (value: string) => void] {
    const [isValid, setValid] = useState(false);
    const regex = new RegExp('^(0[xX][0-9a-fA-F]+|[0-9]+)$');

    function checkValidity(value: string) {
        if (!regex.test(value)) {
            if (isValid && $validatorStore.get()) {
                return;
            }
            setValid(true);
            $validatorStore.set(true);
        } else {
            $validatorStore.set(false);
            setValid(false);
        }
    }

    return [isValid, checkValidity];
}
