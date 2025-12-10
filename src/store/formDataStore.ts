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
    A: '0x00',
    F: '0x00',
    B: '0x00',
    C: '0x00',
    D: '0x00',
    E: '0x00',
    H: '0x00',
    L: '0x00',
    pc: '0x100',
    sp: '0xffee',
    ub: '0x00',
    lb: '0x00',
    addressPointer: '0x00',
    addressValue: '0x00',
    opcode: '',
});
