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
    | 'addressValue'
    | 'opcode';

export const $formResponseStore = map<Record<TFormKey, string>>({
    A: '0x0',
    F: '0x0',
    B: '0x0',
    C: '0x0',
    D: '0x0',
    E: '0x0',
    H: '0x0',
    L: '0x0',
    pc: '0x100',
    sp: '0xffee',
    ub: '0x0',
    lb: '0x0',
    addressPointer: '0x0',
    addressValue: '0x0',
    opcode: '',
});
