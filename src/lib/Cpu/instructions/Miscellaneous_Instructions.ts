import type { Cpu_Flag_Register } from '../CPU_Flag_Register';
import type { Cpu_Register } from '../CPU_Register';
// TODO: Test all
function DAA(A: Cpu_Register<'A'>, F: Cpu_Flag_Register) {
	let adjustments = 0;
	let carry = false;

	if (F.getNFlag()) {
		if (F.getHFlag()) adjustments += 0x6;
		if (F.getCYFlag()) adjustments += 0x60;
		A.setRegister(A.getRegister() - adjustments);
	} else {
		if (F.getHFlag() || (A.getRegister() & 0xf) > 0x9) adjustments += 0x6;
		if (F.getCYFlag() || A.getRegister() > 0x99) adjustments += 0x60;
		carry = true;
		A.setRegister(A.getRegister() + adjustments);
	}

	if (A.getRegister() == 0) {
		F.setZFlag();
	} else {
		F.clearZFlag();
	}

	F.clearHFlag();

	if (carry) {
		F.setCYFlag();
	} else {
		F.clearCYFlag();
	}
}

export { DAA };
