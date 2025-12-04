import { useStore } from '@nanostores/react';
import { $toast, type IToast } from '../../store/notificationStore';
import { Toast } from './Toast';
import { useQueue } from '../../hooks/useQueue';
import { useEffect, useState } from 'react';
export function ToastProvider() {
    const toastData = useStore($toast);
    const [items, enqueue, deqeueu] = useQueue<IToast>([]);
    const [poop, setPoop] = useState(false);
    useEffect(() => {
        if (toastData.length != 0) {
            enqueue(toastData[0]);
        }
    }, [toastData]);

    useEffect(() => {
        if (items.length != 0 && poop == false) {
            setPoop(true);
            setTimeout(() => {
                deqeueu();
                setPoop(false);
            }, 2000);
        }
    }, [items]);

    return (
        <div className="provider--container">
            {items.map((toast, index) => {
                return <Toast key={index} prop={toast}></Toast>;
            })}
        </div>
    );
}
