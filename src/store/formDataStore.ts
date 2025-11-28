import { map } from 'nanostores';

export type TFormKey =
    | 'A'
    | 'B'
    | 'F'
    | 'C'
    | 'D'
    | 'E'
    | 'H'
    | 'L'
    | 'pc'
    | 'sp'
    | 'ub'
    | 'lb'
    | 'addressPointer'
    | 'addressValue';

export const $formResponseStore = map<Record<TFormKey, string>>({
    A: '0xff',
    F: '0xff',
    B: '0xff',
    C: '0xff',
    D: '0xff',
    E: '0xff',
    H: '0xff',
    L: '0xff',
    pc: '0xff',
    sp: '0xff',
    ub: '0xff',
    lb: '0xff',
    addressPointer: '0xff',
    addressValue: '0xff',
});
