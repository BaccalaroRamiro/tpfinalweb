class Minijuego {
  constructor() {
    this.personaje = new Personaje(imagenPersonaje);
    this.juego = null;
    this.personaje = null;
    this.enemigos = [];
    this.estado = "inicio";
    this.imagenPersonaje = null;
    this.imagenPortada = null;
    this.imagenPerdiste = null;
    this.imagenCabrita = null;
    this.imagenCamino = null;
    this.preload();
    this.iniciar();
  }

  preload() {
    this.imagenEnemigo = loadImage('data/lobo.png');
    this.imagenPersonaje = loadImage('data/sheep.png');
    this.imagenPortada = loadImage('data/portada2.jpg');
    this.imagenPerdiste = loadImage('data/perdiste.jpg');
    this.imagenCabrita = loadImage('data/cabrita.png');
    this.imagenCamino = loadImage('data/camino.jpg');
    this.imagenGanaste = loadImage('data/imagenGanaste.jpg');
  }

  iniciar() {
    this.juego = new Juego();
    this.imagenPersonaje = loadImage('data/sheep.png');
    this.personaje = new Personaje(this.imagenPersonaje);

    for (let i = 0; i < 4; i++) {
      this.enemigos.push(new Enemigo(this.imagenEnemigo));
    }
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  dibujar() {
    background(0);
    image(this.imagenCamino, 0, 0, width, height);
    push();
    imageMode(CENTER);
    image(this.imagenCabrita, width / 2, 50, 120, 120);
    pop();
    if (this.estado === "inicio") {
      this.mostrarPantallaInicio();
    } else if (this.estado === "perdiste") {
      this.mostrarPantallaPerdiste();
    } else {
      this.juego.mostrar();
      this.personaje.mostrar();

      for (let enemigo of this.enemigos) {
        enemigo.mostrar();
        enemigo.mover();

        if (this.personaje.colision(enemigo)) {
          this.juego.perderVida();
          enemigo.reiniciar();
          if (this.juego.vidas <= 0) {
            this.estado = "perdiste";
          }
        }

        if (this.personaje.y <= 0) {
          this.juego.ganar();
          this.estado = "ganaste";
        }

        if (this.estado === "ganaste") {
          this.mostrarPantallaGanaste();
        }
      }
    }
  }

  keyPressed() {
    if (this.estado === "jugando") {
      if (keyCode === 87) {
        this.personaje.mover(0, -1);
      } else if (keyCode === 83) {
        this.personaje.mover(0, 1);
      } else if (keyCode === 65) {
        this.personaje.mover(-1, 0);
      } else if (keyCode === 68) {
        this.personaje.mover(1, 0);
      }
    }
    
    if (this.estado === "perdiste" && key === 'r') {
    this.reiniciarMinijuego();
  }
  }
  
  reiniciarMinijuego() {
    this.estado = "inicio";
  }

  mousePressed() {
    if (this.estado === "inicio") {
      this.estado = "jugando";
     // this.juego.reiniciar();
    }
    
    
  }

  

  mostrarPantallaInicio() {
    image(this.imagenPortada, 0, 0, width, height);
    textSize(30);
    fill(255, 0, 0);
    textAlign(CENTER);
    text("¡Llega con la mamá cabrita para ganar!!", width / 2, height / 2);
  }

  mostrarPantallaPerdiste() {
    this.personaje = null;
    image(this.imagenPerdiste, 0, 0, width, height);
    fill(0);
    rect(0, 0, width, 100);
    textSize(40);
    fill(255, 0, 0);
    textAlign(CENTER);
    text("Los lobos te atraparon, \nno llegaste con tu madre.", width / 2, 40);
 
  }

  mostrarPantallaGanaste() {
    this.personaje = null;
    image(this.imagenGanaste, 0, 0, width, height);
    fill(255);
    rect(0, 0, width, 100);
    textSize(20);
    textAlign(CENTER);
    fill(0);
    text(
      "Los cabritos se reencuentran con su madre y celebran\n su regreso. Están agradecidos por su valentía y prometen ser\n más cuidadosos en el futuro.", width / 2, 30);

  }
}
