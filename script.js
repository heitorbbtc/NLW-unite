
let participantes = [
    {
        nome: "Mayk Brito",
        email: "mayk@gamail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: null
    },
    {
        nome: "João Silva",
        email: "joao.silva@gmail.com",
        dataInscricao: new Date(2024, 2, 23, 10, 15),
        dataCheckIn: null
    },
    {
        nome: "Maria Souza",
        email: "maria.souza@hotmail.com",
        dataInscricao: new Date(2024, 2, 24, 8, 30),
        dataCheckIn: new Date(2024, 2, 27, 13, 10)
    },
    {
        nome: "Pedro Almeida",
        email: "pedro.almeida@yahoo.com",
        dataInscricao: new Date(2024, 2, 21, 16, 50),
        dataCheckIn: new Date(2024, 2, 28, 11, 30)
    },
    {
        nome: "Ana Paula",
        email: "ana.paula@outlook.com",
        dataInscricao: new Date(2024, 2, 25, 12, 40),
        dataCheckIn: new Date(2024, 2, 29, 18, 15)
    },
    {
        nome: "Carlos Pereira",
        email: "carlos.pereira@gmail.com",
        dataInscricao: new Date(2024, 2, 19, 9, 20),
        dataCheckIn: new Date(2024, 2, 30, 17, 50)
    },
    {
        nome: "Fernanda Costa",
        email: "fernanda.costa@icloud.com",
        dataInscricao: new Date(2024, 2, 18, 14, 10),
        dataCheckIn: new Date(2024, 3, 1, 20, 30)
    },
    {
        nome: "Lucas Menezes",
        email: "lucas.menezes@gmail.com",
        dataInscricao: new Date(2024, 2, 20, 11, 20),
        dataCheckIn: new Date(2024, 3, 2, 12, 20)
    },
    {
        nome: "Juliana Ferreira",
        email: "juliana.ferreira@yahoo.com",
        dataInscricao: new Date(2024, 2, 17, 15, 45),
        dataCheckIn: new Date(2024, 3, 3, 15, 15)
    },
    {
        nome: "Bruno Lima",
        email: "bruno.lima@hotmail.com",
        dataInscricao: new Date(2024, 2, 26, 17, 25),
        dataCheckIn: new Date(2024, 3, 4, 9, 10)
    }
];

console.log(participantes);


const criarNovoParticipante = (participante) => {

    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null) {
        dataCheckIn = `
<button
    data-email="${participante.email}"
    onclick="fazerCheckIn(event)"
    >
    Confirmar check-in
</button>
`
    }

    return `
<tr>
<td>
<strong>
${participante.nome}
</strong> 
<br> 
<small>
${participante.email}
</small>
</td>
<td>${dataInscricao}</td>
<td>${dataCheckIn}</td>
</tr>
`
}

const atualizarLista = (participantes) => {

    let output = ""
    for(let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }

    document.querySelector('tbody').innerHTML = output


}
atualizarLista(participantes)

const adicionarParticipante = (event) => {

    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    const participanteExiste = participantes.find(
        (p) => p.email == participante.email
    
)

if(participanteExiste) {
    alert('Email já cadastrado')
    return
}

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    event.target.querySelector('[name="nome"').value = ""
    event.target.querySelector('[name="email"').value = ""

}   

const fazerCheckIn = (event) => {

    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
    if (confirm(mensagemConfirmacao) == false) {
        return 
    }

    const participante = participantes.find((p) => p.email == event.target.dataset.email 
    )  

    participante.dataCheckIn = new Date()
    atualizarLista(participantes)

}