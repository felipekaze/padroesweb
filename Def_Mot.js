document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#Simular").addEventListener("click", Alternar);
} );

var ativo = false;
var executando = false;
let elementos = new Array();

function Alternar()
{
    ativo = !ativo;
    if(ativo)
    {
        Simulacao();
    }
}

async function Simulacao()
{
    //Garantir que não possa haver 2 simulações simultâneas de deficiencia fisica
    if(executando)
    {
        return;
    }
    executando = true;

    //Elementos que serão afetados pela simulação
    elementos = [
    ...document.querySelectorAll("main p"),
    ...document.querySelectorAll("main h2"),
    ...document.querySelectorAll("main h3"),
    ...document.querySelectorAll("main h4")
    ];

    while(ativo)
    {
        //Mover os elementos para uma posição aleatória
        Mover(Random(-15,15),Random(-15,15),elementos);
        await sleep(Random(50,300));
    }
    //Retornar os elementos para a posição original
    Mover(0,0,elementos);
    executando = false;
}

function Random(min, max)
{
    return (Math.random() * (max - min)) + min;
}

function Mover(x,y,list)
{
    for(let i = 0; i < list.length; i++)
    {
        list[i].style.translate = x+"px " + y+"px";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}