import { useState } from 'react';

export function useFormValidator() {
    const [list, leTest] = useState<string[]>([]);
    const [test, setTest] = useState();

    return [test];
}
