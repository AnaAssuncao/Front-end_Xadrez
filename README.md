<h2 align= "center" >
    <img  src="./Img/logoChess.png" width="200px">
</h2>
<h1 align= "center">Vanilla Chess </h1>
<h3 align= "center">Jogo de Xadrez para se divertir com um amigo</h3>
<h4 align="center"> 
	🚧  Vanilla Chess 🚀 Em construção...  🚧
</h4>

# Indice

- [Sobre](#-Sobre)
- [Pré-requisitos](#-Pré-requisitos)
- [Rodando o Back End](#-Rodando-o-Back-End-(servidor))
- [Design Patterns](#-Design-Patterns)
- [Arquitetura](#-Arquitetura)
- [Features](#-Features)
- [Contribuição](#-Contribuição)
- [Autor](#-Autor)

## ♟️ Sobre
    Um projeto do jogo de tabuleiro Xadrez para jogar com um amigo.
    Criado como estudo para aprimorar o entendimento em JavaScript.
    O jogo foi programado em JavaScript, sem nehuma biblioteca como dependência.
    Para construção da página na Web utilizou HTML.
    Seu designer feito no CSS.


## ✔️ Pré-requisitos
    Entrar na página abaixo para poder jogar:
    <https://anaassuncao.github.io/Front-end_Xadrez/>

## 🎲 Rodando o Back End (servidor)
    Para saber mais sobre o Back End deste jogo acesse o link abaixo:
    <https://github.com/AnaAssuncao/Back-end_Xadrez>

## 👀 Design Patterns 

### Observer
    Entre as camadas foi usado o Design Patterns Observer a qual permite uma instância de um objeto que 
    mantém uma coleção de outros objetos que são registrados como observadores, e estes irão notifica-los
    de todas as mudanças no seu estado.

## 💻 Arquitetura 

### MVVM
    Para elaboração do xadrez utilizou-se da arquitetura Model-view-viewmodel ( MVVM ), para separação da 
    camada de apresentação da lógica do jogo. Separando em:
        -View: esta camada comunica com a DOM para modificar a parte renderizável do jogo.
        -View Controller: esta camada disponibiliza para a View uma lógica de apresentação. E ela que coordena
         as iterações entre a View com o Controle, visto que ambos não têm conhecimento um do outro.
        -Controller: esta camada realiza a iteração entre View Controller, o Game e a Network. Sendo o controle
        do jogo.
        -Game: esta camada encontra-se a lógica do xadrez, como ele funciona. Os movimentos das peças, quando 
        uma pode ser capturada, os cheques, o empate, as jogadas especiais, a assistência, estão nesta camada.
    
    Comunicação Back-End:  Existe uma camada específica que realiza a comunicação com o servidor, Network.
    A comunicação com servidor é realizada pelo protocolo HTTP.

## ⚙️ Features
    O jogo é dividido em dois modos:
        -Jogo Local: para jogar junto com amigo próximo usando um tabuleiro virtual.
        -Jogo Online: para jogar com um amigo distante, em que deve informar o nome e o código da sala que quer 
        conectar. 
    Nestes modos possuem:
        *Informação de quem é o turno, conectividade e cheque.
        *Mover as peças através de escolhas por input da peça e da coordenada, depois clicando no botão para mover
        . Clique sobre a peça e clique no local onde quer mover. E também, arrastar a peça para o local escolhido.
        *Cronômetro do total de jogo corrido e o tempo do turno para poder mover (sendo apenas 5 minutos).
        *Em detalhes, há o log com todas informações referente ao jogo. E também, as peças capturadas.
        *Histótico com as jogadas realizadas.
    No modo Jogo Local:
        *Possibilidade de retornar a jogada anterior. 
    No modo Jogo Online:
        *Recuperar sessão.
        *Observação: precisa que o Backend esteja sendo executado para funcionar.

## 👥 Contribuição
    João Pedro Samarino 
    <https://github.com/jpsamarino>

## Autor
 <img style="border-radius: 50%;" src="https://media-exp1.licdn.com/dms/image/C4E03AQGYUal9ZyvRtA/profile-displayphoto-shrink_800_800/0/1594406991642?e=1625097600&v=beta&t=T9H1zgdKQ4H1Ecrgm0AKNCkoxkE8xKL5zCo3_1GN0QM" width="100px;" alt=""/>
 <br />
 <sub><b>Ana Paula Assunção</b></sub>

  [![Linkedin Badge](https://img.shields.io/badge/-AnaAssunção-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/ana-assuncao/)](https://www.linkedin.com/in/ana-assuncao/) 