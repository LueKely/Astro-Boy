import type { Ref } from 'react';

export function FormInput({
    ref,
    inputName,
    styleName,
}: {
    ref: Ref<HTMLInputElement>;
    styleName?: Record<string, string>;
    inputName: string;
}) {
    return (
        <div className="input--wrapper" style={styleName}>
            <label htmlFor={inputName}> {inputName}</label>
            <input type="text" name={inputName} id={inputName} />
        </div>
    );
}
