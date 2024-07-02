class Board {
    constructor(canvas_el) {
        this.canvas = canvas_el;
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.pos = { x: 0, y: 0 };
        
        // Agregando eventos del mouse
        this.canvas.addEventListener("mousemove", (e) => this.draw(e));
        this.canvas.addEventListener("mousedown", (e) => this.setPosition(e));
        this.canvas.addEventListener("mouseenter", (e) => this.setPosition(e));
    }

    drawRectCentered(color, w, h) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(-w / 2, -h / 2, w, h);
    }

    centered() {
        this.ctx.translate(this.centerX, this.centerY);
    }

    drawCircleCentered(color, radius) {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    setPosition(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.pos.x = e.clientX - rect.left;
        this.pos.y = e.clientY - rect.top;
    }

    draw(e) {
        if (e.buttons !== 1) return; // Solo dibujar cuando el botón del ratón está presionado

        this.ctx.beginPath();

        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = "black";

        this.ctx.moveTo(this.pos.x, this.pos.y);
        this.setPosition(e);
        this.ctx.lineTo(this.pos.x, this.pos.y);

        this.ctx.stroke();
    }

    drawGrid(step) {
        this.ctx.strokeStyle = 'gray';
        this.ctx.lineWidth = 1;

        // Dibujar líneas verticales
        for (let x = 0; x <= this.width; x += step) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }

        // Dibujar líneas horizontales
        for (let y = 0; y <= this.height; y += step) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    }
    
}

const board = new Board(document.getElementById("board"));
board.drawGrid(20);
board.drawGrid(100);

// TODO
// Crear un patrón de cuadrícula
const gridSize = 20; // Tamaño de los cuadros de la cuadrícula
const gridPattern = ctx.createPattern(createGridPattern(gridSize), "repeat");
ctx.fillStyle = gridPattern;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Función para crear el patrón de cuadrícula
function createGridPattern(size) {
    const patternCanvas = document.createElement("canvas");
    const patternCtx = patternCanvas.getContext("2d");
    patternCanvas.width = size * 2;
    patternCanvas.height = size * 2;

    // Color blanco
    patternCtx.fillStyle = "#fff";
    patternCtx.fillRect(0, 0, size, size);
    patternCtx.fillRect(size, size, size, size);

    // Color gris
    patternCtx.fillStyle = "#ccc";
    patternCtx.fillRect(size, 0, size, size);
    patternCtx.fillRect(0, size, size, size);

    return patternCanvas;
}