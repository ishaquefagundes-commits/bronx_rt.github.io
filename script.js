// ==========================================
// SIMULADOR GENÉTICO
// ==========================================


// Guarda os cruzamentos do último filho gerado (usado nas abas do Punnett)
let cruzamentosGlobais = {};


// ==========================================
// SEPARAR OS ALELOS
// ==========================================

function pegarAlelos(genotipo) {

    return [
        genotipo[0],
        genotipo[1]
    ];

}



// ==========================================
// QUADRADO DE PUNNETT
// ==========================================

function cruzamento(pai, mae) {

    let [pai1, pai2] =
        pegarAlelos(pai);

    let [mae1, mae2] =
        pegarAlelos(mae);


    let filho1 =
        pai1 + mae1;

    let filho2 =
        pai1 + mae2;

    let filho3 =
        pai2 + mae1;

    let filho4 =
        pai2 + mae2;


    return [
        filho1,
        filho2,
        filho3,
        filho4
    ];

}



// ==========================================
// PROBABILIDADES
// ==========================================

function calcularProbabilidade(genotipos, funcaoFenotipo) {
    let contagem = {};

    for (let g of genotipos) {
        let fenotipo = funcaoFenotipo(g);
        contagem[fenotipo] = (contagem[fenotipo] || 0) + 25;
    }

    return contagem; // ex: { Castanho: 50, Azul: 50 }
}

function formatarProb(prob) {
    return Object.entries(prob)
        .map(([nome, valor]) => `${nome}: ${valor}%`)
        .join(" | ");
}



// ==========================================
// SORTEAR UM FILHO
// ==========================================

function sortear(alelos) {

    let numero =
        Math.floor(
            Math.random() * alelos.length
        );


    return alelos[numero];

}



// ==========================================
// GENÓTIPO → OLHOS
// ==========================================

function olhos(genotipo) {

    // Se tiver a letra "B" em qualquer posição, o Castanho domina
    if (genotipo.includes("B")) {
        return "Castanho";
    }

    // Se não tem "B", mas tem a letra "V", o Verde domina o azul
    if (genotipo.includes("V")) {
        return "Verde";
    }

    // Se só sobrou "b", é azul
    return "Azul";

}



// ==========================================
// GENÓTIPO → TIPO DE CABELO
// ==========================================

function tipoCabelo(genotipo) {

    if (genotipo === "BB") {

        return "Cacheado";

    }


    if (
        genotipo === "Bb" ||
        genotipo === "bB"
    ) {

        return "Ondulado";

    }


    return "Liso";

}



// ==========================================
// GENÓTIPO → COR DO CABELO
// ==========================================

function corCabelo(genotipo) {

    if (genotipo === "BB") {

        return "Preto";

    }


    if (
        genotipo === "Bb" ||
        genotipo === "bB"
    ) {

        return "Castanho";

    }


    return "Loiro";

}



// ==========================================
// GENÓTIPO → PELE
// ==========================================

function pele(genotipo) {

    if (genotipo === "BB") {

        return "Escura";

    }


    if (
        genotipo === "Bb" ||
        genotipo === "bB"
    ) {

        return "Morena";

    }


    return "Clara";

}



// ==========================================
// ALTERAR VISUAL DO PERSONAGEM
// ==========================================

function atualizarPersonagem(
    id,
    olhosFinal,
    tipoFinal,
    corFinal,
    peleFinal
) {


    let personagem =
        document.getElementById(id);


    // ======================================
    // OLHOS
    // ======================================

     if (olhosFinal === "Azul") {
        personagem.style.setProperty(
            "--olhos",
            "#2563eb"
        );
    } else if (olhosFinal === "Verde") {
        personagem.style.setProperty(
            "--olhos",
            "#10b981" // Aplica a cor verde na pupila do vetor
        );
    } else {
        personagem.style.setProperty(
            "--olhos",
            "#5b371d" // Castanho
        );

    }



    // ======================================
    // CABELO
    // ======================================

    if (corFinal === "Preto") {

        personagem.style.setProperty(
            "--cabelo",
            "#17120f"
        );

    }


    if (corFinal === "Castanho") {

        personagem.style.setProperty(
            "--cabelo",
            "#6b3f20"
        );

    }


    if (corFinal === "Loiro") {

        personagem.style.setProperty(
            "--cabelo",
            "#e4c35a"
        );

    }



    // ======================================
    // PELE
    // ======================================

    if (peleFinal === "Escura") {

        personagem.style.setProperty(
            "--pele",
            "#70452c"
        );

    }


    if (peleFinal === "Morena") {

        personagem.style.setProperty(
            "--pele",
            "#ad754f"
        );

    }


    if (peleFinal === "Clara") {

        personagem.style.setProperty(
            "--pele",
            "#f1bd91"
        );

    }



    // ======================================
    // TIPO DE CABELO
    // ======================================

    let cabeloFrente =
        personagem.querySelector(
            ".cabelo-frente"
        );


    let cabeloAtras =
        personagem.querySelector(
            ".cabelo-atras"
        );


    if (tipoFinal === "Liso") {

        cabeloFrente.style.borderRadius =
            "70px 70px 20px 20px";

        cabeloAtras.style.borderRadius =
            "60px";

    }


    if (tipoFinal === "Ondulado") {

        cabeloFrente.style.borderRadius =
            "60px 60px 35px 35px";

        cabeloAtras.style.borderRadius =
            "70px";

    }


    if (tipoFinal === "Cacheado") {

        cabeloFrente.style.borderRadius =
            "50%";

        cabeloAtras.style.borderRadius =
            "50%";

    }

}



// ==========================================
// ATUALIZAR PAI
// ==========================================

function atualizarPai() {

    let genOlhos =
        document.getElementById(
            "paiOlhos"
        ).value;


    let genTipo =
        document.getElementById(
            "paiTipoCabelo"
        ).value;


    let genCor =
        document.getElementById(
            "paiCorCabelo"
        ).value;


    let genPele =
        document.getElementById(
            "paiPele"
        ).value;


    atualizarPersonagem(

        "pai",

        olhos(genOlhos),

        tipoCabelo(genTipo),

        corCabelo(genCor),

        pele(genPele)

    );

}



// ==========================================
// ATUALIZAR MÃE
// ==========================================

function atualizarMae() {

    let genOlhos =
        document.getElementById(
            "maeOlhos"
        ).value;


    let genTipo =
        document.getElementById(
            "maeTipoCabelo"
        ).value;


    let genCor =
        document.getElementById(
            "maeCorCabelo"
        ).value;


    let genPele =
        document.getElementById(
            "maePele"
        ).value;


    atualizarPersonagem(

        "mae",

        olhos(genOlhos),

        tipoCabelo(genTipo),

        corCabelo(genCor),

        pele(genPele)

    );

}



// ==========================================
// MOSTRAR PUNNETT
// ==========================================

function mostrarPunnett(alelos) {

    document.getElementById(
        "gametaPai1"
    ).innerText =
        alelos[0][0];


    document.getElementById(
        "gametaPai2"
    ).innerText =
        alelos[2][0];


    document.getElementById(
        "gametaMae1"
    ).innerText =
        alelos[0][1];


    document.getElementById(
        "gametaMae2"
    ).innerText =
        alelos[1][1];


    document.getElementById(
        "p1"
    ).innerText =
        alelos[0];


    document.getElementById(
        "p2"
    ).innerText =
        alelos[1];


    document.getElementById(
        "p3"
    ).innerText =
        alelos[2];


    document.getElementById(
        "p4"
    ).innerText =
        alelos[3];

}



// ==========================================
// GERAR FILHO
// ==========================================

function gerarFilho() {


    // ======================================
    // GENÓTIPOS DO PAI
    // ======================================

    let paiOlhos =
        document.getElementById(
            "paiOlhos"
        ).value;


    let paiTipo =
        document.getElementById(
            "paiTipoCabelo"
        ).value;


    let paiCor =
        document.getElementById(
            "paiCorCabelo"
        ).value;


    let paiPele =
        document.getElementById(
            "paiPele"
        ).value;



    // ======================================
    // GENÓTIPOS DA MÃE
    // ======================================

    let maeOlhos =
        document.getElementById(
            "maeOlhos"
        ).value;


    let maeTipo =
        document.getElementById(
            "maeTipoCabelo"
        ).value;


    let maeCor =
        document.getElementById(
            "maeCorCabelo"
        ).value;


    let maePele =
        document.getElementById(
            "maePele"
        ).value;



    // ======================================
    // CRUZAMENTOS
    // ======================================

    let resultadoOlhos =
        cruzamento(
            paiOlhos,
            maeOlhos
        );


    let resultadoTipo =
        cruzamento(
            paiTipo,
            maeTipo
        );


    let resultadoCor =
        cruzamento(
            paiCor,
            maeCor
        );


    let resultadoPele =
        cruzamento(
            paiPele,
            maePele
        );



    // Salva para as abas do Quadrado de Punnett
    cruzamentosGlobais = {
        olhos: resultadoOlhos,
        tipo: resultadoTipo,
        cor: resultadoCor,
        pele: resultadoPele
    };



    // ======================================
    // SORTEIO DO FILHO
    // ======================================

    let genOlhos =
        sortear(resultadoOlhos);


    let genTipo =
        sortear(resultadoTipo);


    let genCor =
        sortear(resultadoCor);


    let genPele =
        sortear(resultadoPele);



    // ======================================
    // FENÓTIPOS
    // ======================================

    let filhoOlhos =
        olhos(genOlhos);


    let filhoTipo =
        tipoCabelo(genTipo);


    let filhoCor =
        corCabelo(genCor);


    let filhoPele =
        pele(genPele);



    // ======================================
    // ATUALIZAR PERSONAGEM
    // ======================================

    atualizarPersonagem(

        "filho",

        filhoOlhos,

        filhoTipo,

        filhoCor,

        filhoPele

    );



    // ======================================
    // MOSTRAR RESULTADO
    // ======================================

    document.getElementById(
        "resultadoOlhos"
    ).innerHTML =
        "Olhos: <strong>" +
        filhoOlhos +
        "</strong> — " +
        genOlhos;


    document.getElementById(
        "resultadoTipo"
    ).innerHTML =
        "Tipo de cabelo: <strong>" +
        filhoTipo +
        "</strong> — " +
        genTipo;


    document.getElementById(
        "resultadoCor"
    ).innerHTML =
        "Cor do cabelo: <strong>" +
        filhoCor +
        "</strong> — " +
        genCor;


    document.getElementById(
        "resultadoPele"
    ).innerHTML =
        "Tom de pele: <strong>" +
        filhoPele +
        "</strong> — " +
        genPele;



    // ======================================
    // PUNNETT (respeita a aba ativa)
    // ======================================

    let abaAtiva = document.querySelector(".btn-tab.ativa");
    let chave = abaAtiva ? abaAtiva.dataset.carac : "olhos";

    mostrarPunnett(
        cruzamentosGlobais[chave]
    );



    // ======================================
    // PROBABILIDADES
    // ======================================

    let probOlhos = calcularProbabilidade(resultadoOlhos, olhos);
    let probTipo  = calcularProbabilidade(resultadoTipo, tipoCabelo);
    let probCor   = calcularProbabilidade(resultadoCor, corCabelo);
    let probPele  = calcularProbabilidade(resultadoPele, pele);

    document.getElementById("probabilidades").innerHTML = `

        <div class="probabilidade-linha">
            <i class="icone ic-olho"></i> <strong>Olhos</strong>
            <br>
            ${formatarProb(probOlhos)}
        </div>

        <div class="probabilidade-linha">
            <i class="icone ic-cabelo"></i> <strong>Tipo de cabelo</strong>
            <br>
            ${formatarProb(probTipo)}
        </div>

        <div class="probabilidade-linha">
            <i class="icone ic-cor"></i> <strong>Cor do cabelo</strong>
            <br>
            ${formatarProb(probCor)}
        </div>

        <div class="probabilidade-linha">
            <i class="icone ic-pele"></i> <strong>Tom de pele</strong>
            <br>
            ${formatarProb(probPele)}
        </div>

    `;


    // ======================================
    // IR PARA O FILHO
    // ======================================

    document
        .querySelector(".filho-section")
        .scrollIntoView({
            behavior: "smooth"
        });

}



// ==========================================
// ATUALIZAR PERSONAGENS QUANDO SELECIONAR
// ==========================================

document
    .querySelectorAll("select")
    .forEach(function(select) {

        select.addEventListener(
            "change",
            function() {

                atualizarPai();

                atualizarMae();

            }
        );

    });



// ==========================================
// PERSONAGENS INICIAIS
// ==========================================

atualizarPai();

atualizarMae();

// Função para o botão vertical alternar manualmente
function alternarGeneroFilho() {
    let containerFilho = document.getElementById("filho");
    let botao = document.getElementById("btn-genero-filho");
    let textoBotao = botao.querySelector("span");

    // Verifica se atualmente está masculino ou feminino
    if (containerFilho.classList.contains("homem")) {
        // Muda para Feminino
        containerFilho.classList.remove("homem");
        containerFilho.classList.add("mulher", "filho-feminino");
        botao.classList.add("feminino");
        textoBotao.innerText = "FEMININO";
    } else {
        // Muda para Masculino
        containerFilho.classList.remove("mulher", "filho-feminino");
        containerFilho.classList.add("homem");
        botao.classList.remove("feminino");
        textoBotao.innerText = "MASCULINO";
    }
}


// ==========================================
// ABAS DO QUADRADO DE PUNNETT
// ==========================================

function alternarAbaPunnett(caracteristica, elementoBotao) {

    // Sempre troca a aba marcada
    document.querySelectorAll(".btn-tab").forEach(function(b) {
        b.classList.remove("ativa");
    });

    elementoBotao.classList.add("ativa");

    // Se ainda não gerou um filho, só marca a aba
    if (!cruzamentosGlobais[caracteristica]) return;

    mostrarPunnett(cruzamentosGlobais[caracteristica]);
}