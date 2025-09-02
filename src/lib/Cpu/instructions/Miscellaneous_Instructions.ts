import type { Cpu_Flag_Register } from '../CPU_Flag_Register';
import type { Cpu_Register } from '../CPU_Register';
// TODO: Test all
function DAA(A: Cpu_Register<'A'>, F: Cpu_Flag_Register) {
  let a = A.getRegister();
  let adjust = 0;

  if (F.getCYFlag()) adjust |= 0x60;
  if (F.getHFlag()) adjust |= 0x06;

  if (!F.getNFlag()) {
    if ((a & 0x0f) > 0x09) adjust |= 0x06;
    if (a > 0x99) adjust |= 0x60;
    a = (a + adjust) & 0xff; // wrap
  } else {
    a = (a - adjust) & 0xff; // wrap
  }

  if ((adjust & 0x60) !== 0) {
    F.setCYFlag();
  } else {
    F.clearCYFlag();
  }
  F.clearHFlag();

  if (a === 0) {
    F.setZFlag();
  } else {
    F.clearZFlag();
  }

  A.setRegister(a);
}

export { DAA };
