import type { ReactElement } from 'react';
import type { IToast } from '../../store/notificationStore';

function iconRecord(): Record<'warning' | 'success' | 'failure' | 'loading', ReactElement> {
    return {
        warning: <img className="icon" width="50px" height="50px" src="" />,
        success: <img className="icon" width="50px" height="50px" src="/thumb.png" />,
        failure: <img className="icon" width="50px" height="50px" src="/thumb.png" />,
        loading: <img className="icon" width="50px" height="50px" src="/wait.png" />,
    };
}

export function Toast({ prop }: { prop: IToast }) {
    const icon = iconRecord()[prop.type];
    return (
        <div className="toast--wrapper">
            {icon}
            <span className="message--wrapper">
                <p>{prop.type}</p>
                <p>{prop.message} </p>
            </span>
        </div>
    );
}
