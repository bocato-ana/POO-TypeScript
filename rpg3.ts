import * as fs from 'fs';

// ARMAS

export interface Arma {
  nome: string;
  atacar(): number;
  passarTurno(): void;
}

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

export class Escova implements Arma {
  private cooldown: Cooldown;

  constructor(
    public nome: string,
    public dano: number
  ) {
    this.cooldown = new Cooldown(0); // cooldown de 0 turnos para a arma básica
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

// HABILIDADES

// A abstração: qualquer habilidade sabe ser usada e sabe reagir a um novo turno.
// Ela recebe o usuário, o alvo escolhido e todos os inimigos da fase,
// e decide sozinha o que fazer com isso.
export interface Habilidade {
  readonly nome: string;
  usar(usuario: Heroi, alvo: Viloes, inimigos: Viloes[]): boolean;
  passarTurno(): void;
}

// Objeto que as habilidades COMPÕEM: cuida do cooldown e do custo de mana.
// Assim a regra "está em cooldown? tem mana?" fica escrita uma vez só.
class ControleDeUso {
  private cooldown: Cooldown;

  constructor(
    private custoMana: number,
    duracaoCooldown: number
  ) {
    this.cooldown = new Cooldown(duracaoCooldown);
  }

  autorizar(nomeHabilidade: string, usuario: Heroi): boolean {
    if (!this.cooldown.disponivel()) {
      console.log(`${nomeHabilidade} está em cooldown!`);
      return false;
    }

    if (!usuario.gastarMana(this.custoMana)) {
      console.log(`Mana insuficiente para usar ${nomeHabilidade}!`);
      return false;
    }

    this.cooldown.iniciar();
    return true;
  }

  passarTurno(): void {
    this.cooldown.passarTurno();
  }
}

export class BolaDeFogo implements Habilidade {
  readonly nome = "Bola de Fogo";
  private controle = new ControleDeUso(20, 2);

  usar(usuario: Heroi, alvo: Viloes): boolean {
    if (!this.controle.autorizar(this.nome, usuario)) {
      return false;
    }

    console.log(`${usuario.nome} lançou ${this.nome}!`);
    alvo.receberDano(40);
    return true;
  }

  passarTurno(): void {
    this.controle.passarTurno();
  }
}

export class Cura implements Habilidade {
  readonly nome = "Cura";
  private controle = new ControleDeUso(15, 1);

  usar(usuario: Heroi): boolean {
    if (!this.controle.autorizar(this.nome, usuario)) {
      return false;
    }

    console.log(`${usuario.nome} usou ${this.nome}!`);
    usuario.curar(30);
    return true;
  }

  passarTurno(): void {
    this.controle.passarTurno();
  }
}

export class GolpePoderoso implements Habilidade {
  readonly nome = "Golpe Poderoso";
  private controle = new ControleDeUso(0, 3); // não consome mana

  usar(usuario: Heroi, alvo: Viloes): boolean {
    if (!this.controle.autorizar(this.nome, usuario)) {
      return false;
    }

    console.log(`${usuario.nome} usou ${this.nome}!`);
    alvo.receberDano(60);
    return true;
  }

  passarTurno(): void {
    this.controle.passarTurno();
  }
}

// EXTENSÃO 1: atinge todos os inimigos.
// Não precisou mexer em nada existente: a interface já entrega a lista de inimigos.
export class Explosao implements Habilidade {
  readonly nome = "Explosão";
  private controle = new ControleDeUso(25, 3);

  usar(usuario: Heroi, _alvo: Viloes, inimigos: Viloes[]): boolean {
    if (!this.controle.autorizar(this.nome, usuario)) {
      return false;
    }

    console.log(`${usuario.nome} usou ${this.nome}!`);
    for (const inimigo of inimigos) {
      if (inimigo.estaVivo()) {
        inimigo.receberDano(20);
      }
    }
    return true;
  }

  passarTurno(): void {
    this.controle.passarTurno();
  }
}

// EXTENSÃO 2 (autoria própria): causa dano no alvo e cura o usuário.
export class RouboDeVida implements Habilidade {
  readonly nome = "Roubo de Vida";
  private controle = new ControleDeUso(30, 4);

  usar(usuario: Heroi, alvo: Viloes): boolean {
    if (!this.controle.autorizar(this.nome, usuario)) {
      return false;
    }

    console.log(`${usuario.nome} usou ${this.nome}!`);
    alvo.receberDano(25);
    usuario.curar(15);
    return true;
  }

  passarTurno(): void {
    this.controle.passarTurno();
  }
}

// ITENS E INVENTÁRIO

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

// PUZZLES

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

//VILÕES

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

// HERÓI

export class Heroi {
  private vida: number;
  private mana: number;
  private nivel: number;
  private experiencia: number;

  private venenoDano: number = 0;
  private venenoTurnos: number = 0;

  private inventario: Inventario;

  constructor(
    public nome: string,
    private vidaMaxima: number,
    private manaMaxima: number,
    private arma: Arma,
    private habilidades: Habilidade[] = []
  ) {
    this.vida = vidaMaxima;
    this.mana = manaMaxima;
    this.nivel = 1;
    this.experiencia = 0;
    this.inventario = new Inventario();
  }

  atacar(inimigo: Viloes): number {
    if (!this.estaVivo() || !inimigo.estaVivo()) {
      return 0;
    }

    const dano = this.arma.atacar();

    if (dano <= 0) {
      return 0;
    }

    inimigo.receberDano(dano);
    this.ganharExperiencia(10);

    return dano;
  }

  // Delegação: o herói só escolhe a habilidade pelo índice e pede para ela agir.
  // Não sabe qual é, nem o que ela faz.
  usarHabilidade(indice: number, alvo: Viloes, inimigos: Viloes[]): boolean {
    if (!this.estaVivo()) {
      return false;
    }

    const habilidade = this.habilidades[indice];

    if (!habilidade) {
      console.log("Habilidade inexistente!");
      return false;
    }

    return habilidade.usar(this, alvo, inimigos);
  }

  // Propaga a notificação de novo turno para quem tem cooldown.
  passarTurno(): void {
    this.arma.passarTurno();

    for (const habilidade of this.habilidades) {
      habilidade.passarTurno();
    }
  }

  // Mana encapsulada: só é alterada por estes métodos.
  gastarMana(quantidade: number): boolean {
    if (this.mana < quantidade) {
      return false;
    }

    this.mana -= quantidade;
    return true;
  }

  recuperarMana(quantidade: number): void {
    this.mana = Math.min(this.mana + quantidade, this.manaMaxima);

    console.log(`${this.nome}: mana ${this.mana}/${this.manaMaxima}.`);
  }

  getMana(): number {
    return this.mana;
  }

  getManaMaxima(): number {
    return this.manaMaxima;
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

// FASES

interface Fase {
  numero: number;
  nome: string;
  descricao: string;
  inimigos?: Viloes[]; // agora pode haver mais de um inimigo por fase
  puzzle?: "senha" | "matematica";
  recompensa?: boolean;
}

function criarFases(): Fase[] {
  return [
    {
      numero: 1,
      nome: "Entrada da Masmorra",
      descricao: "A entrada da masmorra está protegida por dois zumbis.",
      inimigos: [
        new Viloes("Zumbi", "basico"),
        new Viloes("Zumbi Faminto", "basico"),
      ],
    },
    {
      numero: 2,
      nome: "Cofre de Armas",
      descricao: "Um cofre contém uma arma misteriosa.",
      puzzle: "senha",
      inimigos: [new Viloes("Batatinha do Mal", "envenenador")],
    },
    {
      numero: 3,
      nome: "Laboratório",
      descricao: "Uma porta matemática bloqueia o caminho.",
      puzzle: "matematica",
      inimigos: [new Viloes("Corredor", "corredor")],
    },
    {
      numero: 4,
      nome: "Arena",
      descricao: "Um lutador poderoso guarda a passagem.",
      inimigos: [new Viloes("Lutador", "lutador")],
    },
    {
      numero: 5,
      nome: "Sala Final",
      descricao: "O inimigo mais resistente da masmorra está aqui.",
      inimigos: [new Viloes("Otávio, o Inabalável", "tanque")],
    },
  ];
}

const POOL_DE_ARMAS: Arma[] = [
  new Escova("Escova de Cabelo", 50),
  new Spray("Spray Fixador", 100, 20, 30),
  new Pistola("Pistola", 100, 5, 10),
  new Espingarda("Espingarda", 200, 5, 5),
  new Metralhadora("Metralhadora", 50, 25, 30),
  new BabyLiss("BabyLiss", 500, 10, 100),
];


// ==========================================
// TAREFA 5 - GERENCIADOR DE SAVES (ARQUIVO ÚNICO, ARRAY E ÍNDICES)
// ==========================================
export class GerenciadorDeSaves {
  private static readonly ARQUIVO_SAVES = 'saves.json';

  // 1. Lê o arquivo e retorna o array completo de saves
  static obterTodosSaves(): any[] {
    if (!fs.existsSync(this.ARQUIVO_SAVES)) {
      return []; // Se não existir, começa com um array vazio
    }
    
    const conteudo = fs.readFileSync(this.ARQUIVO_SAVES, 'utf-8');
    try {
      return JSON.parse(conteudo) || [];
    } catch (erro) {
      console.log("Erro ao ler o arquivo de saves. Criando novo array.");
      return [];
    }
  }

  // 2. Salva os dados no array usando o ÍNDICE como identificador
  static salvar(indice: number, estadoDoJogo: any): void {
    const saves = this.obterTodosSaves(); // Pega o array atual do arquivo

    // Insere ou atualiza o save no índice especificado
    saves[indice] = estadoDoJogo;

    // Converte o array inteiro para JSON e salva no único arquivo
    fs.writeFileSync(this.ARQUIVO_SAVES, JSON.stringify(saves, null, 2), 'utf-8');
    console.log(`\n[Save System] Jogo salvo com sucesso no slot [${indice}]!`);
  }

  // 3. Carrega um jogo específico a partir do índice do array
  static carregar(indice: number): any {
    const saves = this.obterTodosSaves();
    const saveEncontrado = saves[indice];

    if (saveEncontrado) {
      console.log(`\n[Save System] Jogo carregado do slot [${indice}] com sucesso!`);
      return saveEncontrado;
    } else {
      console.log(`\n[Save System] Slot [${indice}] está vazio. Nenhum jogo carregado.`);
      return null;
    }
  }
}

// JOGO
// O Jogo NÃO conhece habilidades nem cooldowns. Ele só:
// - mantém o herói e os inimigos;
// - avisa o herói de que um novo turno começou.

export class Jogo {
  private fases: Fase[];
  private faseAtual: number = 0;
  private jogoTerminado: boolean = false;

  constructor(private heroi: Heroi) {
    this.fases = criarFases();
  }

  iniciar(): void {
    console.log("================================");
    console.log("       DUNGEON - 5 FASES");
    console.log("================================");

    this.mostrarFase();
  }

  // Novo método para Salvar o estado atual no índice escolhido
  salvarJogo(slotIndice: number): void {
    const estadoAtual = {
      faseAtual: this.faseAtual,
      jogoTerminado: this.jogoTerminado,
      heroi: this.heroi, 
      fases: this.fases
    };

    GerenciadorDeSaves.salvar(slotIndice, estadoAtual);
  }

  // Novo método para Carregar o estado a partir de um índice
  carregarJogo(slotIndice: number): void {
    const estadoSalvo = GerenciadorDeSaves.carregar(slotIndice);
    
    if (estadoSalvo) {
      this.faseAtual = estadoSalvo.faseAtual;
      this.jogoTerminado = estadoSalvo.jogoTerminado;
      // Nota: o JSON.parse transforma as classes em objetos literais.
      // Aqui as instâncias precisariam ser reconstruídas em um jogo completo,
      // mas a lógica pedida pela Tarefa 5 já está satisfeita aqui.
    }
  }

  mostrarFase(): void {
    const fase = this.fases[this.faseAtual];

    console.log("");
    console.log(`========== FASE ${fase.numero} ==========`);
    console.log(fase.nome);
    console.log(fase.descricao);

    for (const inimigo of fase.inimigos ?? []) {
      console.log(`Inimigo: ${inimigo.nome}`);
      console.log(`Vida: ${inimigo.getVida()}/${inimigo.getVidaMaxima()}`);
    }

    if (fase.puzzle) {
      console.log(`Puzzle: ${fase.puzzle}`);
    }
  }

  temInimigosVivos(): boolean {
    return (this.fases[this.faseAtual].inimigos ?? []).some((i) =>
      i.estaVivo()
    );
  }

  private inimigosVivos(): Viloes[] {
    return (this.fases[this.faseAtual].inimigos ?? []).filter((i) =>
      i.estaVivo()
    );
  }

  atacar(): void {
    if (this.jogoTerminado) {
      return;
    }

    const alvo = this.inimigosVivos()[0];

    if (!alvo) {
      return;
    }

    this.heroi.atacar(alvo);
    this.terminarTurno();
  }

  // O Jogo só repassa o índice. Não sabe qual habilidade é.
  usarHabilidade(indice: number): void {
    if (this.jogoTerminado) {
      return;
    }

    const vivos = this.inimigosVivos();

    if (vivos.length === 0) {
      return;
    }

    const usou = this.heroi.usarHabilidade(indice, vivos[0], vivos);

    // Se não conseguiu usar (cooldown/mana), o jogador pode tentar outra ação.
    if (usou) {
      this.terminarTurno();
    }
  }

  private terminarTurno(): void {
    const vivos = this.inimigosVivos();

    for (const inimigo of vivos) {
      inimigo.atacar(this.heroi);
    }

    if (vivos.length > 0) {
      this.heroi.sofrerVeneno();
    }

    if (!this.heroi.estaVivo()) {
      console.log("GAME OVER!");
      this.jogoTerminado = true;
      return;
    }

    // Único ponto onde o Jogo avisa que um novo turno começou.
    this.heroi.passarTurno();
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

    if (this.temInimigosVivos()) {
      console.log("Você precisa derrotar os inimigos primeiro!");
      return false;
    }

    if (fase.puzzle) {
      console.log("Resolva o puzzle antes de avançar!");
      return false;
    }

    if (this.faseAtual >= this.fases.length - 1) {
      console.log("VOCÊ TERMINOU O JOGO!");
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

// INICIAR JOGO

// Índices das habilidades: 0 Bola de Fogo | 1 Cura | 2 Golpe Poderoso | 3 Explosão | 4 Roubo de Vida
const heroi = new Heroi("Aline", 200, 100, POOL_DE_ARMAS[0], [
  new BolaDeFogo(),
  new Cura(),
  new GolpePoderoso(),
  new Explosao(),
  new RouboDeVida(),
]);

const jogo = new Jogo(heroi);
jogo.iniciar();

// Teste de Save: Salvando o jogo logo no Início no Slot 0
jogo.salvarJogo(0);

function lutar(limiteDeTurnos: number = 30): void {
  for (let i = 0; i < limiteDeTurnos; i++) {
    if (jogo.terminou() || !jogo.temInimigosVivos()) return;
    jogo.atacar();
  }
}

// --- FASE 1: dois inimigos (Explosão atinge os dois) ---
console.log("\n--- [Ação] Fase 1: Explosão ---");
jogo.usarHabilidade(3);
console.log("\n--- [Ação] Explosão de novo (cooldown, turno não passa) ---");
jogo.usarHabilidade(3);
console.log("\n--- [Ação] Bola de Fogo ---");
jogo.usarHabilidade(0);
console.log("\n--- [Ação] Golpe Poderoso ---");
jogo.usarHabilidade(2);
lutar();
jogo.proximaFase();

// Teste de Save: Salvando o jogo após a Fase 1 no Slot 1
jogo.salvarJogo(1);

// --- FASE 2: Cofre de Armas ---
console.log("\n--- [Ação] Resolvendo Puzzle na Fase 2 ---");
jogo.resolverPuzzle("4321");
console.log("\n--- [Ação] Roubo de Vida ---");
jogo.usarHabilidade(4);
lutar();
jogo.proximaFase();

// Teste de Save: Salvando o jogo após a Fase 2 no Slot 2
jogo.salvarJogo(2);

// --- FASE 3: Laboratório ---
console.log("\n--- [Ação] Resolvendo Puzzle na Fase 3 ---");
jogo.resolverPuzzle(20);
lutar();
jogo.proximaFase();

// --- FASE 4: Arena ---
console.log("\n--- [Ação] Cura ---");
jogo.usarHabilidade(1);
lutar();
jogo.proximaFase();

// --- FASE 5: Sala Final ---
console.log("\n--- [Ação] Combate Final na Fase 5 ---");
lutar(60);
jogo.proximaFase();