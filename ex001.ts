class Personagem {
  constructor(
    public nome: string,
    public pontos: number
  ) {
    console.log(`Personagem criado: ${this.nome} com ${this.pontos} PV.\n`);
  }

  ataque(dano: number): void {
    this.pontos = this.pontos -dano;

    if (this.pontos < 0) {
      this.pontos = 0;
    }

    console.log(`${this.nome} recebeu ${dano} de dano! PV restante: ${this.pontos}`);
  }
}

const heroi = new Personagem("Aragorn", 100);
heroi.ataque(30);
heroi.ataque(80);