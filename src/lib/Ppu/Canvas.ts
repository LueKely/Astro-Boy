export class Canvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;

    //   seems like drawing this canvas is a bit weird
    //   and pixels for 144x160 is tad small i need to scale this bigger!
    constructor(canvas: HTMLCanvasElement | null) {
        if (canvas) {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d');
            console.log('Canvas Initialized');
        } else {
            throw Error('Canvas Does Not Exist M8');
        }
    }

    draw() {}
}
