interface Animal{
    emitirSom(): void;
}

class Pessoa{
    constructor(
        private pets: Animal[]
    ){ }

    fazerPetsEmitiremSom(){
        for(const pet of this.pets){
            pet.emitirSom()
        }
    }
}

class Gato implements Animal{
    emitirSom(): void {
        console.log('Miau')
    }
}

class Cachorro implements Animal{
    emitirSom(): void {
        console.log('Woof Woof')
    }
}

class Leao implements Animal{
    emitirSom():void{
        console.log('Roar')
    }
}

const mingau = new Gato()
const marie = new Gato()
const pluto = new Cachorro()
const simba = new Leao()

const jose = new Pessoa([mingau, marie, pluto, simba])
jose.fazerPetsEmitiremSom()


interface RepositorioDePessoas{
    lerPessoa(): Pessoa;
    removerPessoa(pessoa: Pessoa): void;
    salvarPessoa(pessoa: Pessoa): void;
}