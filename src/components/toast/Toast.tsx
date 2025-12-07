import { type ReactElement } from 'react';
import type { IToast } from '../../store/notificationStore';

interface IToastProp extends IToast {
    index: number;
}

function iconRecord(): Record<'warning' | 'success' | 'failure', ReactElement> {
    return {
        warning: <img className="icon" width="50px" height="50px" src="/warning.png" />,
        success: <img className="icon" width="50px" height="50px" src="/thumb.png" />,
        failure: <img className="icon failure" width="50px" height="50px" src="/thumb.png" />,
    };
}

export function Toast({ prop }: { prop: IToastProp }) {
    const icon = iconRecord()[prop.type];

    return (
        <div className="skew--wrapper">
            <div className="toast--wrapper">
                {icon}
                <span className="message--wrapper">
                    <p>{prop.type}</p>
                    <p>{prop.message} </p>
                </span>
            </div>
        </div>
    );
}
