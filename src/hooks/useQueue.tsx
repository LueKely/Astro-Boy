import { useState } from 'react';

export function useQueue<T>(element: T[]): [T[], (element: T) => void, () => void] {
    const [items, setItems] = useState<T[]>([]);

    function enqueue(element: T) {
        setItems((value) => [...value, element]);
    }
    function dequeue() {
        setItems((value) => value.slice(1));
    }

    return [items, enqueue, dequeue];
}
