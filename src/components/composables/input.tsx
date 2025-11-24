import type { Ref } from 'react';

export function FormInput({ ref, inputName }: { ref: Ref<HTMLInputElement>; inputName: string }) {
    return (
        <div>
            <label htmlFor={inputName}> {inputName}</label>
            <input type="text" name={inputName} id={inputName} />
        </div>
    );
}
