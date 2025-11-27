import type { IToast } from '../../store/notificationStore';

export function Toast({ prop }: { prop: IToast }) {
    return (
        <div className="toast--wrapper">
            <p>{prop.type}</p>
            <p>{prop.message} </p>
        </div>
    );
}
