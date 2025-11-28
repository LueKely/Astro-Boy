import { useStore } from '@nanostores/react';
import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';
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
    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInputValue] = useState<string>('');
    useEffect(() => {
        setInputValue(store[inputName as TFormKey]);
    }, [store]);

    return (
        <div className="input--wrapper" style={styleName}>
            <label htmlFor={inputName}> {displayName}</label>
            <input
                ref={inputRef}
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
