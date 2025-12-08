import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { $formResponseStore, type TFormKey } from '../../store/formDataStore';

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
    const [input, setInputValue] = useState<string>('');
    useEffect(() => {
        setInputValue(store[inputName as TFormKey]);
    }, [store]);

    return (
        <div className="input--wrapper" style={styleName}>
            <span className="label--wrapper">
                <label htmlFor={inputName}> {displayName}</label>
                <span className="img--wrapper">
                    <img src="/warning-icon.png" width="30" height="30" />
                </span>
            </span>
            <input
                type="text"
                onChange={(e) => {
                    setInputValue(e.currentTarget.value);
                }}
                value={input}
                name={inputName}
                id={inputName}
            />
        </div>
    );
}
