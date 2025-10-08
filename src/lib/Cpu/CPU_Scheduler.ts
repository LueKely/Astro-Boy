import type { Gameboy } from '../Gameboy';
import { CpuOpcodeRecord } from './CPU_Opcode_Record';
import { CpuPrefixOpCodeRecord } from './CPU_Opcode_Record_Prefix';
import { Interrupt_Handler } from './Interrupt_Handler';
import { oamTransfer } from './OAM_Transfer';
import type { IOpCodeEntry } from './types/OpcodeTypes';

// TODO:
// Interupt Handling - DONE
// HALT AND STOP Handling (with the IF & IE)
// OMA DMA?

export class Cpu_Scheduler {
    private dmg: Gameboy;
    private opCodes: CpuOpcodeRecord;
    private opCodesPrefixed = new CpuPrefixOpCodeRecord();
    private interruptHandler: Interrupt_Handler;
    currentMachineCycles = 0;
    currentOpcode: IOpCodeEntry;

    constructor(gameboy: Gameboy) {
        this.dmg = gameboy;
        this.opCodes = new CpuOpcodeRecord(this.dmg.registerFile.F);
        this.interruptHandler = new Interrupt_Handler(this.dmg);
        this.currentOpcode = this.opCodes.get(this.readByte());
    }

    private readByte() {
        return this.dmg.ram.getMemoryAt(this.dmg.registerFile.pointers.PC.getRegister());
    }

    private schedule() {
        if (this.dmg.registerFile.STOP) {
            this.stopHandler();
            return;
        }
        if (this.dmg.registerFile.HALT) {
            this.haltHandler();
            return;
        }
        if (this.dmg.registerFile.IME && this.dmg.ram.isAllowedToInterrupt()) {
            console.log('INTERRUPT IS TRIGGERED');
            const interruptCycles = this.interruptHandler.createCycles();
            this.currentOpcode = interruptCycles;
        } else {
            // for debug
            // check if anything is written in 0xff46
            if (this.dmg.ram.TRANSFER) {
                this.currentOpcode = oamTransfer();
                this.dmg.ram.TRANSFER = false;
                return;
            }
            this.dmg.addToList(this.currentOpcode.name + ' 0x' + this.readByte().toString(16));
            this.fetchOpcode();
        }
    }

    private haltHandler() {
        if (this.dmg.registerFile.IME && this.dmg.ram.isAllowedToInterrupt()) {
            const interruptCycles = this.interruptHandler.createCycles();
            this.dmg.registerFile.HALT = false;
            this.currentOpcode = interruptCycles;
        }
    }
    private stopHandler() {
        if (this.dmg.registerFile.IME && this.dmg.ram.stopValidation()) {
            const interruptCycles = this.interruptHandler.createCycles();
            this.dmg.registerFile.STOP = false;
            this.currentOpcode = interruptCycles;
        }
    }

    private fetchOpcode() {
        if (this.readByte() == 0xcb) {
            this.dmg.registerFile.pointers.PC.increment();
            this.currentOpcode = this.opCodesPrefixed.get(this.readByte());
        } else {
            this.currentOpcode = this.opCodes.get(this.readByte());
        }
    }

    tick() {
        try {
            this.schedule();
            if (this.dmg.registerFile.HALT || this.dmg.registerFile.STOP) {
                this.currentMachineCycles = 0;
                return;
            }
            this.currentOpcode.execute(this.dmg);
            // after executing
            this.currentMachineCycles = this.currentOpcode.cycles;
        } catch {
            const notImplemented = this.dmg.ram.getMemoryAt(
                this.dmg.registerFile.pointers.PC.getRegister()
            );
            this.dmg.log();

            console.log('Not Implemented: ', notImplemented);

            throw new Error('OP CODE NOT Implemented ' + notImplemented + ' Please Check LOGS');
        }
    }
}
