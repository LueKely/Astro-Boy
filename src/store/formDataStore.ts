import { map } from 'nanostores';

export interface IFormData {
    register: {
        A: string;
        F: string;
        B: string;
        C: string;
        D: string;
        E: string;
        H: string;
        L: string;
    };
    pointers: { pc: string; sp: string; ub: string; lb: string };
    ram: {
        address: string;
        value: string;
    };
}

export const $FormResponseStore = map<IFormData>({
    register: {
        A: '0xff',
        F: '0xff',
        B: '0xff',
        C: '0xff',
        D: '0xff',
        E: '0xff',
        H: '0xff',
        L: '0xff',
    },
    pointers: { pc: '0xff', sp: '0xff', ub: '0xff', lb: '0xff' },
    ram: { address: '0xff', value: '0xff' },
});
