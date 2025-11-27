import { atom } from 'nanostores';
export interface IToast {
    message: string;
    type: 'warning' | 'success' | 'failure' | 'loading';
}
export const $toast = atom<IToast[]>([]);
