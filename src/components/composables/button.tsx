import type { Ref } from 'react';

export function FormButton({
    name,
    isDisabled = false,
    onClick = () => {},
    className = '',
}: {
    name: string;
    className?: string;
    isDisabled?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            className={className + ' form'}
            type="submit"
            disabled={isDisabled}
            onClick={() => onClick()}>
            {name}
        </button>
    );
}
