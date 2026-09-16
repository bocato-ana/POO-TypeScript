class Personagens {
    nome: string
    vidaMaxima: number
    vida: number
    ataque: number
    nivel: number

    constructor(
    nome: string,
    vidaMaxima: number,
    ataque: number,
    nivel: number = 1
  ) {
    this.nome = nome
    this.vidaMaxima = vidaMaxima
    this.vida = vidaMaxima 
    this.ataque = ataque
    this.nivel = nivel
  }
  atacar(inimigo: Personagens){
    console.log(`${this.nome} atacou ${inimigo.nome} com ${this.ataque} de dano!`)
    inimigo.receberDano(this.ataque)
  }

  receberDano(dano: number){
    const vidaAntesDoDano = this.vida
    this.vida = this.vida - dano

    if (this.vida < 0) {
      this.vida = 0
    }

    const DanoReal = vidaAntesDoDano - this.vida

    console.log(`${this.nome} perdeu ${DanoReal} de vida!`)
  }

    curar(quantidade: number){
    const VidaAnterior = this.vida
    this.vida = this.vida + quantidade

    if (this.vida > this.vidaMaxima) {
      this.vida = this.vidaMaxima
    }

    const CuraReal = this.vida - VidaAnterior
    console.log(`${this.nome} recuperou ${CuraReal} de vida!`)

    }

    estaVivo(): boolean {
      return this.vida > 0
    }

    subirDeNivel() {
      this.nivel++
      this.vidaMaxima += 10
      this.vida = this.vidaMaxima
      this.ataque += 5
      console.log(`${this.nome} subiu para o nível ${this.nivel}!`)
    }
  
}

//const guerreiro = new Personagens("Guerreiro", 100, 40, 20)
const orc = new Personagens("Orc", 100, 40, 20)

guerreiro.atacar(orc)
orc.atacar(guerreiro)

guerreiro.receberDano(orc.ataque)
guerreiro.curar(20)