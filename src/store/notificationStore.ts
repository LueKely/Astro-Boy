import { atom } from 'nanostores';
export interface IToast {
    message: string;
    type: 'warning' | 'success' | 'failure';
}
export const $toast = atom<IToast[]>([]);
