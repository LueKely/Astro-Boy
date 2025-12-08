import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { $formResponseStore, type TFormKey } from '../../store/formDataStore';
import { useStringValidator } from '../../hooks/useStringValidator';

export function FormInput({
    inputName,
    styleName,
    displayName,
}: {
    styleName?: Record<string, string>;
    inputName: string;
    displayName: string;
}) {
    const store = useStore($formResponseStore);
    const [isValid, checkValidity] = useStringValidator();
    const [input, setInputValue] = useState<string>('');
    useEffect(() => {
        setInputValue(store[inputName as TFormKey]);
    }, [store]);

    return (
        <div className="input--wrapper" style={styleName}>
            <span className="label--wrapper">
                <label htmlFor={inputName}> {displayName}</label>
                {isValid && (
                    <span className="img--wrapper">
                        <img src="/warning-icon.png" width="25" height="25" />
                    </span>
                )}
            </span>
            <input
                type="text"
                onChange={(e) => {
                    setInputValue(e.currentTarget.value);
                    checkValidity(e.currentTarget.value);
                }}
                pattern="^(0[xX][0-9a-fA-F]+|[0-9]+)$"
                value={input}
                name={inputName}
                id={inputName}
            />
        </div>
    );
}
