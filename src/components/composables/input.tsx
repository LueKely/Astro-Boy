import { useImperativeHandle, useRef, type Ref } from 'react';

export function FormInput({
    inputName,
    styleName,
}: {
    styleName?: Record<string, string>;
    inputName: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    // use signal to listen to the fucking event astro store
    return (
        <div className="input--wrapper" style={styleName}>
            <label htmlFor={inputName}> {inputName}</label>
            <input
                ref={inputRef}
                defaultValue={'0x0'}
                type="text"
                name={inputName}
                id={inputName}
            />
        </div>
    );
}
