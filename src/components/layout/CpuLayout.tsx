import { OpCodesForm } from '../forms/OpCodes';
import { PointersForm } from '../forms/Pointers';
import { RamForm } from '../forms/Ram';
import { RegistersForm } from '../forms/Registers';
import { StatusWindow } from '../forms/StatusWindow';

export function CpuLayout() {
    return (
        <div className="cpu">
            <RegistersForm />
            <StatusWindow />
            <PointersForm />
            <RamForm />
            <OpCodesForm />
        </div>
    );
}
