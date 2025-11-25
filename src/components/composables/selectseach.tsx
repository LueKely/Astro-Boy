import { useRef, useState } from 'react';

export function selectSearchInput() {
    //  a way to get the list of all of those stupid opcodes
    // context provider after fetching
    // filtering each of these stupid opcodes 500 plus including prefix fuck my chungus life
    //
    return (
        <span>
            {/*this filters out the option on change*/}
            <input type="text" placeholder="Search Here"></input>
            <select name="opcode">
                <option value="burger">Burger</option>
            </select>
        </span>
    );
}
