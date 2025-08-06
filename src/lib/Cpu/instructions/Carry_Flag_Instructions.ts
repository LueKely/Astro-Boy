import type { Cpu_Flag_Register } from "../CPU_Flag_Register";

function CCF(f: Cpu_Flag_Register) {
  // this is so stupid
  f.clearNFlag();
  f.clearHFlag();
  const carryNot = f.getCYFlag() ^ 1;
  if (carryNot != 0) {
    f.setCYFlag();
  } else {
    f.clearCYFlag();
  }
}

function SCF(f: Cpu_Flag_Register) {
  f.clearNFlag();
  f.clearHFlag();
  f.setCYFlag();
}

export { CCF, SCF };
