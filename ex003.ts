class Arma {
    private ultimoAtaque: number = 0
  constructor(
    public nome: string,
    public dano: number,
    public cooldownEmSegundos: number = 1.5
  ) {}

  podeAtacar(): boolean {
    const agora = Date.now()
    return agora - this.ultimoAtaque >= this.cooldownEmSegundos * 1000
  }
 atacar(): number {
    if (!this.podeAtacar()) {
      console.log(`[${this.nome}] em cooldown!`)
      return 0 
    }

    this.ultimoAtaque = Date.now() 
    return this.dano
  }
}


class Item {
  constructor(
    public nome: string,
    public valor: number
  ) {}
}

class Inventario {
  private itens: Item[] = []

  adicionar(item: Item) {
    this.itens.push(item)
  }

  remover(item: Item) {
    this.itens = this.itens.filter(i => i !== item)
  }

  listar() {
    console.log('Inventário: ')

    for (const item of this.itens) {
      console.log(`- ${item.nome}`)
    }
  }
}

class Personagem {
  private vida: number
  private nivel: number
  private experiencia: number

  private inventario: Inventario // composição

  constructor(
    public nome: string,
    private vidaMaxima: number,
    private arma: Arma = new Arma('faca', 5)
  ) {
    this.vida = vidaMaxima
    this.nivel = 1
    this.experiencia = 0
    this.inventario = new Inventario()
  }

  atacar(inimigo: Personagem) {
    if (!this.arma) {
      return
    }

    const dano = this.arma.atacar()
    inimigo.receberDano(dano)
    this.ganharExperiencia(10)
  }

  receberDano(dano: number) {
    const vidaAntes = this.vida
    this.vida -= dano
    if (this.vida < 0) {
      this.vida = 0
    }
    const danoReal = vidaAntes - this.vida

    console.log(`${this.nome} recebeu ${danoReal} de dano.`)
    this.mostrarVida()

    if (!this.estaVivo()) {
      console.log(`${this.nome} foi derrotado`)
    }
  }

  estaVivo() {
    return this.vida > 0
  }

  curar(quantidade: number) {
    this.vida += quantidade

    if (this.vida > this.vidaMaxima) {
      this.vida = this.vidaMaxima
    }

    console.log(`${this.nome} recuperou vida.`)
    this.mostrarVida()
  }

  mostrarVida() {
    console.log(`Vida: ${this.vida}/${this.vidaMaxima}`)
  }


  ganharExperiencia(quantidade: number) {
    this.experiencia += quantidade

    console.log(
      `${this.nome} ganhou ${quantidade} XP.` +
      `XP: ${this.experiencia}`
    )

    if (this.experiencia >= 100) {
      this.subirDeNivel()
    }
  }

  subirDeNivel() {
    this.nivel++
    this.experiencia = 0
    this.vidaMaxima += 20
    this.vida = this.vidaMaxima

    console.log(`${this.nome} subiu para o nível ${this.nivel}`)
  }

  adicionarItem(item: Item) {
    this.inventario.adicionar(item)
  }

  mostrarInventario() {
    this.inventario.listar()
  }
}

const espada = new Arma('Espada', 10)
const guerreiro = new Personagem(
  'Thor', 100
)
const barbaro = new Personagem(
  'Conan', 200, espada
)

guerreiro.atacar(barbaro)
barbaro.atacar(guerreiro) 

guerreiro.adicionarItem(new Item('poção', 100))
guerreiro.mostrarInventario()

guerreiro.atacar(barbaro)
barbaro.atacar(guerreiro)