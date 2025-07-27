import { Ram } from '../Ram/Ram';
import { Cpu_Register_File } from './CPU_Register_File';
import { Cpu_Scheduler } from './CPU_Scheduler';

export class CPU {
	readonly registers = new Cpu_Register_File();
	readonly ram = new Ram();
	readonly scheduler = new Cpu_Scheduler(this);
	// readonly catridge;
}
