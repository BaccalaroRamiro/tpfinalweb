class Enemigo {
  constructor(imagenEnemigo) {
    this.tamano = 100;
    this.velocidad = random(5, 10);
    this.reiniciar();
    this.imagenEnemigo = imagenEnemigo;
  }

  mostrar() {
    image(this.imagenEnemigo, this.x, this.y, this.tamano, this.tamano);
  }

  mover() {
    this.x += this.velocidad;
    if (this.x > width) {
      this.reiniciar();
    }
  }

  reiniciar() {
    this.x = 0;
    this.y = random(height-200);
  }
}
