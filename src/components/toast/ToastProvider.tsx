import { useStore } from '@nanostores/react';
import { $toast } from '../../store/notificationStore';
import { Toast } from './Toast';
export function ToastProvider() {
    const toastData = useStore($toast);
    return (
        <div className="provider--container">
            {toastData.map((toast) => {
                return <Toast prop={toast}></Toast>;
            })}
        </div>
    );
}
