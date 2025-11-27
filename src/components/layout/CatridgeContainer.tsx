import { Link } from '../composables/link';

export function CartridgeLayout() {
    return (
        <div className="cartridge--container">
            <Link name="CPU" link="cpu" />
            <Link name="Catridge" link="cartridge" />
            {/*<div className="wrapper">
                <input type="file" id="fileInput" />
                <output id="output">No Games Loaded</output>
            </div>*/}
        </div>
    );
}
