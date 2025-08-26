import type { Cpu_Flag_Register } from '../CPU_Flag_Register';
import type { Cpu_Register } from '../CPU_Register';
// TODO: Test all
function DAA(A: Cpu_Register<'A'>, F: Cpu_Flag_Register) {
  let adjustments = 0;
  let shouldSetCarry = false;

  if (F.getHFlag() || (!F.getNFlag() && (A.getRegister() & 0xf) > 0x9))
    adjustments += 0x6;
  if (F.getCYFlag() || (!F.getNFlag() && A.getRegister() > 0x99)) {
    adjustments += 0x60;
    shouldSetCarry = true;
  }

  adjustments = F.getNFlag() ? -adjustments : adjustments;
  A.setRegister(A.getRegister() + adjustments);

  F.clearHFlag();

  if (A.getRegister() == 0) {
    F.setZFlag();
  } else {
    F.clearZFlag();
  }

  if (shouldSetCarry) {
    F.setCYFlag();
  }
}

export { DAA };
