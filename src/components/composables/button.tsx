import { useStore } from '@nanostores/react';
import type { Ref } from 'react';
import { $validatorStore } from '../../store/validateStore';

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
    const store = useStore($validatorStore);
    return (
        <button
            className={className + ' form'}
            type="submit"
            disabled={isDisabled || store}
            onClick={() => onClick()}>
            {name}
        </button>
    );
}
