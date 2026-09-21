// ============================================================
// JOGO DE 5 FASES
// ============================================================
// Sem herança.
// O jogo utiliza composição, interfaces e classes.
// ============================================================

// ============================================================
// 1. ARMAS
// ============================================================

export interface Arma {
  nome: string;
  atacar(): number;
  passarTurno(): void;
}

// ------------------------------------------------------------
// COOLDOWN
// ------------------------------------------------------------

class Cooldown {
  private turnosRestantes: number = 0;

  constructor(private duracaoEmTurnos: number) {}

  disponivel(): boolean {
    return this.turnosRestantes === 0;
  }

  iniciar(): void {
    this.turnosRestantes = this.duracaoEmTurnos;
  }

  passarTurno(): void {
    if (this.turnosRestantes > 0) {
      this.turnosRestantes--;
    }
  }
}

// ------------------------------------------------------------
// ESCOVA
// ------------------------------------------------------------

export class Escova implements Arma {
  private cooldown: Cooldown;

  constructor(
    public nome: string,
    public dano: number
  ) {
    this.cooldown = new Cooldown(0); // Cooldown de 0 turnos para a arma básica
  }

  passarTurno(): void {
    this.cooldown.passarTurno();
  }

  atacar(): number {
    if (!this.cooldown.disponivel()) {
      console.log(`${this.nome} está em cooldown!`);
      return 0;
    }

    this.cooldown.iniciar();
    return this.dano;
  }
}

// ------------------------------------------------------------
// SPRAY
// ------------------------------------------------------------

export class Spray implements Arma {
  private cooldown: Cooldown;

  constructor(
    public nome: string,
    private dano: number,
    private sprays: number,
    private capacidade: number
  ) {
    this.cooldown = new Cooldown(1); // 1 turno de cooldown
  }

  passarTurno(): void {
    this.cooldown.passarTurno();
  }

  atacar(): number {
    if (!this.cooldown.disponivel()) {
      console.log(`${this.nome} está em cooldown!`);
      return 0;
    }

    if (this.sprays === 0) {
      console.log("Sem jatos para ataque!");
      return 0;
    }

    this.sprays--;
    this.cooldown.iniciar();

    return this.dano;
  }

  carregarSpray(quantidade: number): void {
    this.sprays += quantidade;

    if (this.sprays > this.capacidade) {
      this.sprays = this.capacidade;
    }
  }

  getSprays(): number {
    return this.sprays;
  }

  getCapacidade(): number {
    return this.capacidade;
  }
}

// ------------------------------------------------------------
// PISTOLA
// ------------------------------------------------------------

export class Pistola implements Arma {
  private cooldown: Cooldown;

  constructor(
    public nome: string,
    public dano: number,
    public numeroBalas: number,
    public balasMax: number
  ) {
    this.cooldown = new Cooldown(0);
  }

  passarTurno(): void {
    this.cooldown.passarTurno();
  }

  atacar(): number {
    if (!this.cooldown.disponivel()) {
      console.log(`${this.nome} está em cooldown!`);
      return 0;
    }

    if (this.numeroBalas === 0) {
      console.log("Sem balas para ataque!");
      return 0;
    }

    this.numeroBalas--;
    this.cooldown.iniciar();

    return this.dano;
  }

  carregarPistola(quantidade: number): void {
    this.numeroBalas += quantidade;

    if (this.numeroBalas > this.balasMax) {
      this.numeroBalas = this.balasMax;
    }
  }
}

// ------------------------------------------------------------
// ESPINGARDA
// ------------------------------------------------------------

export class Espingarda implements Arma {
  private cooldown: Cooldown;

  constructor(
    public nome: string,
    public dano: number,
    public numeroBalas: number,
    public balasMax: number
  ) {
    this.cooldown = new Cooldown(2); // 2 turnos de cooldown
  }

  passarTurno(): void {
    this.cooldown.passarTurno();
  }

  atacar(): number {
    if (!this.cooldown.disponivel()) {
      console.log(`${this.nome} está em cooldown!`);
      return 0;
    }

    if (this.numeroBalas === 0) {
      console.log("Sem balas para ataque!");
      return 0;
    }

    this.numeroBalas--;
    this.cooldown.iniciar();

    return this.dano;
  }

  carregarEspingarda(quantidade: number): void {
    this.numeroBalas += quantidade;

    if (this.numeroBalas > this.balasMax) {
      this.numeroBalas = this.balasMax;
    }
  }
}

// ------------------------------------------------------------
// METRALHADORA
// ------------------------------------------------------------

export class Metralhadora implements Arma {
  private cooldown: Cooldown;

  constructor(
    public nome: string,
    public dano: number,
    public numeroBalas: number,
    public balasMax: number
  ) {
    this.cooldown = new Cooldown(0);
  }

  passarTurno(): void {
    this.cooldown.passarTurno();
  }

  atacar(): number {
    if (!this.cooldown.disponivel()) {
      console.log(`${this.nome} está em cooldown!`);
      return 0;
    }

    if (this.numeroBalas === 0) {
      console.log("Sem balas para ataque!");
      return 0;
    }

    this.numeroBalas--;
    this.cooldown.iniciar();

    return this.dano;
  }

  carregarMetralhadora(quantidade: number): void {
    this.numeroBalas += quantidade;

    if (this.numeroBalas > this.balasMax) {
      this.numeroBalas = this.balasMax;
    }
  }
}

// ------------------------------------------------------------
// BABYLISS
// ------------------------------------------------------------

export class BabyLiss implements Arma {
  private cooldown: Cooldown;
  private cooldownCarregamento: Cooldown;
  private carregando: boolean = false;

  constructor(
    public nome: string,
    private dano: number,
    private nivelBateria: number,
    private bateriaMaxima: number
  ) {
    this.cooldown = new Cooldown(2);
    this.cooldownCarregamento = new Cooldown(3);
  }

  passarTurno(): void {
    this.cooldown.passarTurno();
    this.cooldownCarregamento.passarTurno();
  }

  atacar(): number {
    if (!this.cooldown.disponivel()) {
      console.log(`${this.nome} está em cooldown!`);
      return 0;
    }

    if (this.carregando) {
      if (!this.cooldownCarregamento.disponivel()) {
        console.log(`${this.nome} ainda está carregando!`);
        return 0;
      }

      this.nivelBateria = this.bateriaMaxima;
      this.carregando = false;

      console.log(`${this.nome} terminou de carregar!`);
    }

    this.cooldown.iniciar();

    if (this.nivelBateria > 0) {
      this.nivelBateria -= 10;
      console.log("Ataque mágico poderoso!");
      return this.dano;
    }

    console.log("Bateria acabou! Ataque fraco.");
    return this.dano / 2;
  }

  carregarBabyliss(): void {
    if (this.nivelBateria > 0) {
      console.log("O BabyLiss ainda possui bateria!");
      return;
    }

    if (this.carregando) {
      console.log("O BabyLiss já está carregando!");
      return;
    }

    this.carregando = true;
    this.cooldownCarregamento.iniciar();

    console.log(`${this.nome} começou a carregar...`);
  }
}

// ============================================================
// 2. ITENS E INVENTÁRIO
// ============================================================

export class Item {
  constructor(
    public nome: string,
    public valor: number
  ) {}
}

export class PocaoMagica extends Item {
  constructor(nome: string, valor: number) {
    super(nome, valor);
  }
}

export class Inventario {
  private itens: Item[] = [];

  adicionar(item: Item): void {
    this.itens.push(item);
  }

  remover(item: Item): void {
    this.itens = this.itens.filter((i) => i !== item);
  }

  listar(): void {
    console.log("Inventário:");
    for (const item of this.itens) {
      console.log(`- ${item.nome}`);
    }
  }

  getItens(): Item[] {
    return this.itens;
  }
}

// ============================================================
// 3. PUZZLES
// ============================================================

export interface ResultadoPuzzle {
  sucesso: boolean;
  mensagem: string;
}

export function jogarMinigameSenha(
  tentativaUsuario: string,
  senhaCorreta?: string
): ResultadoPuzzle {
  const senha =
    senhaCorreta ?? Math.floor(1000 + Math.random() * 9000).toString();

  if (tentativaUsuario === senha) {
    return {
      sucesso: true,
      mensagem: `Acesso concedido! A senha (${senha}) está correta.`,
    };
  } else {
    return {
      sucesso: false,
      mensagem: `Acesso negado! A senha correta era [${senha}].`,
    };
  }
}

export function jogarMinigameMatematica(
  respostaUsuario: number,
  num1?: number,
  num2?: number,
  operacao: "+" | "*" = "+"
): ResultadoPuzzle {
  const n1 = num1 ?? Math.floor(Math.random() * 10) + 1;
  const n2 = num2 ?? Math.floor(Math.random() * 10) + 1;

  const resultadoEsperado = operacao === "+" ? n1 + n2 : n1 * n2;

  if (respostaUsuario === resultadoEsperado) {
    return {
      sucesso: true,
      mensagem: `Resposta correta! (${n1} ${operacao} ${n2} = ${resultadoEsperado}).`,
    };
  } else {
    return {
      sucesso: false,
      mensagem: `Resposta incorreta! (${n1} ${operacao} ${n2} = ${resultadoEsperado}).`,
    };
  }
}

export function sortearArmaRandomica(armasDisponiveis: Arma[]): Arma {
  const indiceAleatorio = Math.floor(Math.random() * armasDisponiveis.length);
  return armasDisponiveis[indiceAleatorio];
}

// ============================================================
// 4. VILÕES
// ============================================================

export class Viloes {
  private vida: number;
  private vidaMaxima: number = 100;
  private dano: number = 10;

  private esquivasPorCiclo: number = 0;
  private tamanhoDoCiclo: number = 1;
  private golpesNoCiclo: number = 0;

  private venenoDano: number = 0;
  private venenoTurnos: number = 0;

  constructor(
    public nome: string,
    public tipo: string = "basico"
  ) {
    if (tipo === "tanque") {
      this.vidaMaxima = 250;
    } else if (tipo === "envenenador") {
      this.vidaMaxima = 50;
      this.dano = 4;
      this.venenoDano = 5;
      this.venenoTurnos = 3;
    } else if (tipo === "lutador") {
      this.vidaMaxima = 130;
      this.dano = 14;
      this.tamanhoDoCiclo = 3;
      this.esquivasPorCiclo = 1;
    } else if (tipo === "corredor") {
      this.vidaMaxima = 35;
      this.dano = 5;
      this.tamanhoDoCiclo = 5;
      this.esquivasPorCiclo = 4;
    } else if (tipo !== "basico") {
      console.log(`Tipo "${tipo}" não existe, criando vilão básico.`);
    }

    this.vida = this.vidaMaxima;
  }

  atacar(heroi: Heroi): void {
    if (!this.estaVivo() || !heroi.estaVivo()) {
      return;
    }

    heroi.receberDano(this.dano);

    if (this.venenoDano > 0 && heroi.estaVivo()) {
      heroi.aplicarVeneno(this.venenoDano, this.venenoTurnos);
    }
  }

  receberDano(dano: number): void {
    if (dano <= 0) {
      return;
    }

    if (this.esquivou()) {
      console.log(`${this.nome} esquivou do ataque!`);
      return;
    }

    const vidaAntes = this.vida;
    this.vida -= dano;

    if (this.vida < 0) {
      this.vida = 0;
    }

    const danoReal = vidaAntes - this.vida;

    console.log(`${this.nome} recebeu ${danoReal} de dano.`);

    if (!this.estaVivo()) {
      console.log(`${this.nome} foi derrotado!`);
    }
  }

  private esquivou(): boolean {
    this.golpesNoCiclo++;

    const esquivou = this.golpesNoCiclo <= this.esquivasPorCiclo;

    if (this.golpesNoCiclo >= this.tamanhoDoCiclo) {
      this.golpesNoCiclo = 0;
    }

    return esquivou;
  }

  estaVivo(): boolean {
    return this.vida > 0;
  }

  curar(quantidade: number): void {
    this.vida += quantidade;

    if (this.vida > this.vidaMaxima) {
      this.vida = this.vidaMaxima;
    }
  }

  getVida(): number {
    return this.vida;
  }

  getVidaMaxima(): number {
    return this.vidaMaxima;
  }
}

// ============================================================
// 5. HERÓI
// ============================================================

export class Heroi {
  private vida: number;
  private nivel: number;
  private experiencia: number;

  private venenoDano: number = 0;
  private venenoTurnos: number = 0;

  private inventario: Inventario;

  constructor(
    public nome: string,
    private vidaMaxima: number,
    private arma: Arma
  ) {
    this.vida = vidaMaxima;
    this.nivel = 1;
    this.experiencia = 0;
    this.inventario = new Inventario();
  }

  atacar(inimigo: Viloes): number {
    if (!this.estaVivo() || !inimigo.estaVivo()) {
      return 0;
    }

    // Decrementa o cooldown da arma no início do turno
    this.arma.passarTurno();

    const dano = this.arma.atacar();

    if (dano <= 0) {
      return 0;
    }

    inimigo.receberDano(dano);
    this.ganharExperiencia(10);

    return dano;
  }

  equiparArma(novaArma: Arma): void {
    this.arma = novaArma;
    console.log(`${this.nome} equipou ${novaArma.nome}.`);
  }

  getArma(): Arma {
    return this.arma;
  }

  tentarAdquirirArmaComSenha(
    tentativaSenha: string,
    poolDeArmas: Arma[],
    senhaSecreta?: string
  ): boolean {
    const resultado = jogarMinigameSenha(tentativaSenha, senhaSecreta);

    console.log(resultado.mensagem);

    if (!resultado.sucesso) {
      return false;
    }

    const armaSorteada = sortearArmaRandomica(poolDeArmas);

    this.equiparArma(armaSorteada);
    this.adicionarItem(new Item(`Arma: ${armaSorteada.nome}`, 0));

    return true;
  }

  tentarAdquirirArmaComMatematica(
    resposta: number,
    poolDeArmas: Arma[],
    n1?: number,
    n2?: number,
    operacao: "+" | "*" = "+"
  ): boolean {
    const resultado = jogarMinigameMatematica(resposta, n1, n2, operacao);

    console.log(resultado.mensagem);

    if (!resultado.sucesso) {
      return false;
    }

    const armaSorteada = sortearArmaRandomica(poolDeArmas);

    this.equiparArma(armaSorteada);
    this.adicionarItem(new Item(`Arma: ${armaSorteada.nome}`, 0));

    return true;
  }

  receberDano(dano: number): void {
    const vidaAntes = this.vida;
    this.vida -= dano;

    if (this.vida < 0) {
      this.vida = 0;
    }

    const danoReal = vidaAntes - this.vida;

    console.log(`${this.nome} recebeu ${danoReal} de dano.`);
  }

  estaVivo(): boolean {
    return this.vida > 0;
  }

  curar(quantidade: number): void {
    this.vida += quantidade;

    if (this.vida > this.vidaMaxima) {
      this.vida = this.vidaMaxima;
    }
  }

  getVida(): number {
    return this.vida;
  }

  getVidaMaxima(): number {
    return this.vidaMaxima;
  }

  aplicarVeneno(dano: number, turnos: number): void {
    this.venenoDano = dano;
    this.venenoTurnos = turnos;

    console.log(`${this.nome} foi envenenado!`);
  }

  sofrerVeneno(): void {
    if (this.venenoTurnos > 0 && this.estaVivo()) {
      console.log(`${this.nome} sofre com o veneno.`);
      this.receberDano(this.venenoDano);
      this.venenoTurnos--;
    }
  }

  ganharExperiencia(quantidade: number): void {
    this.experiencia += quantidade;

    if (this.experiencia >= 100) {
      this.subirDeNivel();
    }
  }

  subirDeNivel(): void {
    this.nivel++;
    this.experiencia = 0;
    this.vidaMaxima += 20;
    this.vida = this.vidaMaxima;

    console.log(`${this.nome} subiu para o nível ${this.nivel}!`);
  }

  getNivel(): number {
    return this.nivel;
  }

  adicionarItem(item: Item): void {
    this.inventario.adicionar(item);
  }

  mostrarInventario(): void {
    this.inventario.listar();
  }

  getInventario(): Inventario {
    return this.inventario;
  }
}

// ============================================================
// 6. FASES
// ============================================================

interface Fase {
  numero: number;
  nome: string;
  descricao: string;
  inimigo?: Viloes;
  puzzle?: "senha" | "matematica";
  recompensa?: boolean;
}

function criarFases(): Fase[] {
  return [
    {
      numero: 1,
      nome: "Entrada da Masmorra",
      descricao: "A entrada da masmorra está protegida por um inimigo.",
      inimigo: new Viloes("Zumbi", "basico"),
    },
    {
      numero: 2,
      nome: "Cofre de Armas",
      descricao: "Um cofre contém uma arma misteriosa.",
      puzzle: "senha",
      inimigo: new Viloes("Batatinha do Mal", "envenenador"),
    },
    {
      numero: 3,
      nome: "Laboratório",
      descricao: "Uma porta matemática bloqueia o caminho.",
      puzzle: "matematica",
      inimigo: new Viloes("Corredor", "corredor"),
    },
    {
      numero: 4,
      nome: "Arena",
      descricao: "Um lutador poderoso guarda a passagem.",
      inimigo: new Viloes("Lutador", "lutador"),
    },
    {
      numero: 5,
      nome: "Sala Final",
      descricao: "O inimigo mais resistente da masmorra está aqui.",
      inimigo: new Viloes("Otávio, o Inabalável", "tanque"),
    },
  ];
}

// ============================================================
// 7. POOL DE ARMAS
// ============================================================

const POOL_DE_ARMAS: Arma[] = [
  new Escova("Escova de Cabelo", 50),
  new Spray("Spray Fixador", 100, 20, 30),
  new Pistola("Pistola", 100, 5, 10),
  new Espingarda("Espingarda", 200, 5, 5),
  new Metralhadora("Metralhadora", 50, 25, 30),
  new BabyLiss("BabyLiss", 500, 10, 100),
];

// ============================================================
// 8. JOGO
// ============================================================

export class Jogo {
  private fases: Fase[];
  private faseAtual: number = 0;
  private heroi: Heroi;
  private jogoTerminado: boolean = false;

  constructor() {
    this.fases = criarFases();
    this.heroi = new Heroi("Aline", 200, POOL_DE_ARMAS[0]);
  }

  iniciar(): void {
    console.log("================================");
    console.log("       DUNGEON - 5 FASES");
    console.log("================================");

    this.mostrarFase();
  }

  mostrarFase(): void {
    const fase = this.fases[this.faseAtual];

    console.log("");
    console.log(`========== FASE ${fase.numero} ==========`);
    console.log(fase.nome);
    console.log(fase.descricao);

    if (fase.inimigo) {
      console.log(`Inimigo: ${fase.inimigo.nome}`);
      console.log(
        `Vida: ${fase.inimigo.getVida()}/${fase.inimigo.getVidaMaxima()}`
      );
    }

    if (fase.puzzle) {
      console.log(`Puzzle: ${fase.puzzle}`);
    }
  }

  atacar(): void {
    if (this.jogoTerminado) {
      return;
    }

    const fase = this.fases[this.faseAtual];

    if (!fase.inimigo) {
      return;
    }

    const dano = this.heroi.atacar(fase.inimigo);

    if (dano <= 0) {
      return;
    }

    if (!fase.inimigo.estaVivo()) {
      console.log(`Você derrotou ${fase.inimigo.nome}!`);
      return;
    }

    fase.inimigo.atacar(this.heroi);
    this.heroi.sofrerVeneno();

    if (!this.heroi.estaVivo()) {
      console.log("GAME OVER!");
      this.jogoTerminado = true;
    }
  }

  resolverPuzzle(resposta: string | number): boolean {
    const fase = this.fases[this.faseAtual];

    if (!fase.puzzle) {
      return true;
    }

    if (fase.puzzle === "senha") {
      const ok = this.heroi.tentarAdquirirArmaComSenha(
        resposta.toString(),
        POOL_DE_ARMAS,
        "4321"
      );
      if (ok) delete fase.puzzle; // Remove o puzzle concluído da fase
      return ok;
    }

    if (fase.puzzle === "matematica") {
      const ok = this.heroi.tentarAdquirirArmaComMatematica(
        Number(resposta),
        POOL_DE_ARMAS,
        12,
        8,
        "+"
      );
      if (ok) delete fase.puzzle; // Remove o puzzle concluído da fase
      return ok;
    }

    return false;
  }

  proximaFase(): boolean {
    const fase = this.fases[this.faseAtual];

    if (fase.inimigo && fase.inimigo.estaVivo()) {
      console.log("Você precisa derrotar o inimigo primeiro!");
      return false;
    }

    if (fase.puzzle) {
      console.log("Resolva o puzzle antes de avançar!");
      return false;
    }

    if (this.faseAtual >= this.fases.length - 1) {
      console.log("🏆 VOCÊ TERMINOU O JOGO!");
      this.jogoTerminado = true;
      return false;
    }

    this.faseAtual++;
    this.mostrarFase();

    return true;
  }

  getHeroi(): Heroi {
    return this.heroi;
  }

  getFaseAtual(): Fase {
    return this.fases[this.faseAtual];
  }

  terminou(): boolean {
    return this.jogoTerminado;
  }
}

// ============================================================
// 9. INICIAR JOGO
// ============================================================

const jogo = new Jogo();
jogo.iniciar();

// --- FASE 1: Entrada da Masmorra ---
console.log("\n--- [Ação] Atacando na Fase 1 ---");
jogo.atacar();
jogo.atacar();
jogo.proximaFase();

// --- FASE 2: Cofre de Armas ---
console.log("\n--- [Ação] Resolvendo Puzzle na Fase 2 ---");
jogo.resolverPuzzle("4321");

console.log("\n--- [Ação] Combate na Fase 2 ---");
jogo.atacar();
jogo.atacar();
jogo.proximaFase();

// --- FASE 3: Laboratório ---
console.log("\n--- [Ação] Resolvendo Puzzle na Fase 3 ---");
jogo.resolverPuzzle(20);

console.log("\n--- [Ação] Combate na Fase 3 ---");
jogo.atacar();
jogo.atacar();
jogo.proximaFase();

// --- FASE 4: Arena ---
console.log("\n--- [Ação] Combate na Fase 4 ---");
jogo.atacar();
jogo.atacar();
jogo.atacar();
jogo.atacar();
jogo.proximaFase();

// --- FASE 5: Sala Final ---
console.log("\n--- [Ação] Combate Final na Fase 5 ---");
while (jogo.getFaseAtual().inimigo?.estaVivo() && !jogo.terminou()) {
  jogo.atacar();
}

jogo.proximaFase();