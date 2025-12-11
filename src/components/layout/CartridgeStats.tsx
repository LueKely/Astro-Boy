import type { ICartridge } from '../../lib/Cartridge/types/InferCartridge';

export function CartridgeStats(prop: { cartridge: ICartridge }) {
    return (
        <ul className="stat">
            <li>Title: {prop.cartridge.title} </li>
            <li>Cartridge Type: {prop.cartridge.type}</li>
            <li>Ram Size: {prop.cartridge.ramSize}</li>
            <li>Rom Size: {prop.cartridge.romSize}</li>
            <li>New Licensee Code: {prop.cartridge.newLicenseeCode}</li>
            <li>Old Licensee Code: {prop.cartridge.oldLicenseeCode}</li>
        </ul>
    );
}
