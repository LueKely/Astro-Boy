import { OpCodesForm } from '../forms/OpCodes';
import { PointersForm } from '../forms/Pointers';
import { RamForm } from '../forms/Ram';
import { RegistersForm } from '../forms/Registers';
import { StatusWindow } from '../forms/StatusWindow';
import { Link } from '../composables/link';

export function CpuLayout() {
    return (
        <div className="cpu">
            <Link name="CPU" link="/cpu" />
            <RegistersForm />
            <StatusWindow />
            <PointersForm />
            <RamForm />
            <OpCodesForm />
        </div>
    );
}
