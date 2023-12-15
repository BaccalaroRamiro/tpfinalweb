class Aventura {

  constructor() {
    this.pantallaActual = 0;
    this.numeroPantallas = 12;
    this.botonesActivos = new Array(this.numeroPantallas).fill(true);
    this.imagenes = new Array(this.numeroPantallas);
    this.textos = new Array(this.numeroPantallas);
    this.final1Alcanzado = false;
    this.final2Alcanzado = false;
    this.minijuego = new Minijuego();

    
    this.botonSiguienteX = 0;
    this.botonSiguienteY = 0;
    this.boton1X = 0;
    this.boton1Y = 0;
    this.boton2X = 0;
    this.boton2Y = 0;
    this.botonReinicioX = 0;
    this.botonReinicioY = 0;
    this.calcularCoordenadasBotones();

    
    for (let i = 0; i < this.numeroPantallas; i++) {
      let nombreImagen = "data/pantalla" + i + ".jpg";
      this.imagenes[i] = loadImage(nombreImagen);
    }

  this.textos[0] = "\nEL LOBO Y LOS SIETE CABRITILLOS \n click en siguiente para comenzar";
  this.textos[1] = "La madre cabra sale de casa dejando a sus siete cabritos solos.\nNo le habran la puerta a nadie exclamó la madre antes de irse.";
  this.textos[2] = "Se escucha que golpean la puerta. \n¿ir a ver quien es?. \n A) si, puede ser que mamá se haya olvidado algo \n B) mamá dijo que no le abrieramos a nadie";
  this.textos[3] = "El lobo entra por a la casa y atrapa a los cabritos \n No debiste haber abierto la puerta.";
  this.textos[4] = "\nLos cabritos escuchan una voz ronca que dice ser su madre.";
  this.textos[5] = "\nLos cabritos saben que es el lobo quien imita su voz, su madre tiene una voz \nmucho más suave y delicada.";
  this.textos[6] = "\nEl lobo se enfurece y se marcha \n a buscar a su manada.";
  this.textos[7] = "El lobo subio al techo y esta entrando por la chimenea ¿Que hay que hacer? \n A) Enfrentarse al lobo \n B) No hacer nada y esperar a que no te coma";
  this.textos[8] = "\nEl lobo logra entrar por la chimenea y atrapa a los cabritos.";
  this.textos[9] = "La madre llega justo a tiempo y comienza una pelea contra el lobo mayor, \nconsigue hacer algo de tiempo para que los cabritos escapen \nde la manada de lobos hambrientos.";
  this.textos[10] = "minjuego";
  this.textos[11] = "Los cabritos se reencuentran con su madre y celebran\n su regreso. Están agradecidos por su valentía y prometen ser\n más cuidadosos en el futuro.";

  
  }

  mostrarBotones2() {
    fill(0, 255, 0);
    rect(this.boton1X, this.boton1Y, 100, 40);
    fill(0);
    text("A", this.boton1X + 50, this.boton1Y + 25);

    fill(0, 255, 0);
    rect(this.boton2X, this.boton2Y, 100, 40);
    fill(0);
    text("B", this.boton2X + 50, this.boton2Y + 25);
  }

  mostrarBotonSiguiente() {
    fill(0, 255, 0);
    rect(this.botonSiguienteX, this.botonSiguienteY, 80, 40);
    fill(0);
    text("Siguiente", this.botonSiguienteX + 40, this.botonSiguienteY + 25);
  }

  mostrarBotonReinicio() {
    fill(255, 0, 0);
    rect(this.botonReinicioX, this.botonReinicioY, 80, 40);
    fill(0);
    text("Reiniciar", this.botonReinicioX + 40, this.botonReinicioY + 25);
  }

  mostrarImagen() {
    image(this.imagenes[this.pantallaActual], 0, 0, width, height);
  }

  mostrarRect() {
    fill(255);
    rect(0, 0, width, 100);
  }

  mostrarTexto(texto) {
    fill(0);
    textSize(15);
    textAlign(CENTER);
    text(texto, width / 2, 30);
  }
  
  //DIBUJA LA PANTALLA ACTUAL CON IMAGEN TEXTO Y BOTONES CORRESPONDIENTES 
   dibujar() {
    if (this.pantallaActual >= 0 && this.pantallaActual < this.numeroPantallas) {
      this.mostrarImagen();
      this.mostrarRect();
      this.mostrarTexto(this.textos[this.pantallaActual]);
// BOTONES PARA PANTALLAS ESPECIFICAS 

      if ((this.pantallaActual == 2 || this.pantallaActual == 7) && !this.final1Alcanzado && !this.final2Alcanzado) {
        this.mostrarBotones2();
      } else if ((this.pantallaActual == 3 && this.final1Alcanzado) || (this.pantallaActual == 8 && this.final2Alcanzado) || this.pantallaActual == 11) {
        this.mostrarBotonReinicio();
      } else {
        this.mostrarBotonSiguiente();
      }
//MINIJUEGO
      if (this.pantallaActual === 10) {
        this.minijuego.dibujar();
      }
    }
  }

   mouseClicked() {
     //BOTONES A Y B 
     //MOSTRAR FINAL 1 
    if ((this.pantallaActual == 2 || this.pantallaActual == 7) && !this.final1Alcanzado && !this.final2Alcanzado) {
      if (mouseX >= this.boton1X && mouseX <= this.boton1X + 100 && mouseY >= this.boton1Y && mouseY <= this.boton1Y + 40) {
        if (this.pantallaActual == 2) {
          this.pantallaActual = 3; //FINAL
          this.final1Alcanzado = true;
          this.botonesActivos[3] = false;
          this.botonesActivos[4] = false;
          
          //MOSTRAR FINAL 2
        } else if (this.pantallaActual == 7) {
          this.pantallaActual = 8; //FINAL
          this.final2Alcanzado = true;
          this.botonesActivos[8] = false;
          this.botonesActivos[9] = false;
        }
        //SIGUE LA HISTORIA
      } else if (mouseX >= this.boton2X && mouseX <= this.boton2X + 100 && mouseY >= this.boton2Y && mouseY <= this.boton2Y + 40) {
        if (this.pantallaActual == 2) {
          this.pantallaActual = 4;
        } else if (this.pantallaActual == 7) {
          this.pantallaActual = 9;
        }
      } //CUANDO MOSTRAR BOTON REINICIO
    } else if ((this.pantallaActual == 3 && this.final1Alcanzado) || (this.pantallaActual == 8 && this.final2Alcanzado) || this.pantallaActual == 11) {
      if (mouseX >= this.botonReinicioX && mouseX <= this.botonReinicioX + 80 && mouseY >= this.botonReinicioY && mouseY <= this.botonReinicioY + 40) {
        this.reiniciar();
      } //AVANZAR UNICAMENTE CON BOTON SIGUIENTE
    } else if (this.pantallaActual < this.numeroPantallas - 1 && this.botonesActivos[this.pantallaActual]) {
    
    if (
      mouseX >= this.botonSiguienteX &&
      mouseX <= this.botonSiguienteX + 80 &&
      mouseY >= this.botonSiguienteY &&
      mouseY <= this.botonSiguienteY + 40
    ) {
      this.pantallaActual++;
    }
  }

    if (this.pantallaActual >= 1 && this.pantallaActual <= 11) {
      this.botonesActivos[this.pantallaActual] = true;
    } else if (this.pantallaActual == 12) {
      this.botonesActivos[11] = false;
    }
    
    if (this.pantallaActual === 10) {
      this.minijuego.cambiarEstado("jugando");
    }
  }
  

keyPressed() {
  
}

  reiniciar() {
    this.pantallaActual = 0;
    this.final1Alcanzado = false;
    this.final2Alcanzado = false;
    for (let i = 0; i < this.numeroPantallas; i++) {
      this.botonesActivos[i] = true;
    }
  }

  calcularCoordenadasBotones() {
    this.botonSiguienteX = width - 100;
    this.botonSiguienteY = height - 60;

    this.boton1X = width / 2 - 150;
    this.boton1Y = height - 60;
    this.boton2X = width / 2 + 50;
    this.boton2Y = height - 60;

    this.botonReinicioX = width - 100;
    this.botonReinicioY = height - 60;
  }
}
