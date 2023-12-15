class Personaje {
  constructor(imagenPersonaje) {
    this.x = 300;
    this.y = 500;
    this.tamano = 50;
    this.imagenPersonaje = imagenPersonaje;
  }

  mostrar() {
      image(this.imagenPersonaje, this.x, this.y, this.tamano, this.tamano);
  }

  mover(dx, dy) {
    console.log(this.x , this.y)
        console.log(dx , dy)

  this.x += dx * 20;
    this.y += dy * 20;
    
  }

  colision(enemigo) {
    return (
      this.x + this.tamano > enemigo.x &&
      this.x < enemigo.x + enemigo.tamano &&
      this.y + this.tamano > enemigo.y &&
      this.y < enemigo.y + enemigo.tamano
      );
  }
}
