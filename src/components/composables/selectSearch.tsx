import { useRef, useState, type ChangeEvent } from 'react';
export interface IOpcodeSearch {
    opCodeName: string;
    isPrefix: boolean;
    value: number;
    // display: string;
}

function opcodes(): IOpcodeSearch[] {
    const illegal = new Set([
        0xcb, 0xd4, 0xe4, 0xe5, 0xf5, 0xdb, 0xeb, 0xec, 0xfc, 0xdd, 0xed, 0xfd,
    ]);
    let poop: IOpcodeSearch[] = [];
    for (let i = 0; i < 0x100; i++) {
        if (!illegal.has(i)) {
            poop.push({
                opCodeName: `0x${i.toString(16)}`,
                value: i,
                isPrefix: false,
                // display: 'block',
            });
        }
    }
    for (let i = 0; i < 0x100; i++) {
        poop.push({
            opCodeName: `0x${i.toString(16)} cb prefix`,
            value: i,
            isPrefix: true,
            // display: 'block',
        });
    }

    return poop;
}
function useOpCode(): [IOpcodeSearch[], (e: ChangeEvent<HTMLInputElement>) => void] {
    const [listOpcode, setOpcode] = useState(opcodes());
    function filterOpcode(e: ChangeEvent<HTMLInputElement>) {
        setOpcode(
            opcodes().map((code) => {
                if (!code.opCodeName.includes(e.target.value)) {
                    return {
                        opCodeName: code.opCodeName,
                        isPrefix: code.isPrefix,
                        value: code.value,
                        // display: 'none',
                    };
                }

                return code;
            })
        );
    }

    return [listOpcode, filterOpcode];
}

export function SelectSearchInput() {
    //  a way to get the list of all of those stupid opcodes
    // context provider after fetching
    // filtering each of these stupid opcodes 500 plus including prefix fuck my chungus life

    const list = opcodes();
    return (
        <div className="select--wrapper">
            {/*<label htmlFor="opcode">Opcode</label>*/}
            <select name="opcode" id="opcode">
                {list.map((code, index) => {
                    return (
                        <option
                            // style={{ display: code.display }}
                            key={index}
                            value={JSON.stringify(code)}>
                            {code.opCodeName}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
