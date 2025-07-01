var ativo = false;
var executando = false;
var elementos = new Array();

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#Simular").addEventListener("click", alternar);
} );


function alternar()
{
    ativo = !ativo;
    if(ativo)
    {
        simulacao();
    }
}

async function simulacao()
{
    //Garantir que não possa haver 2 simulações simultâneas de 
    //deficiencia fisica
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
        mover(random(-15,15),random(-15,15),elementos);
        await new Promise(resolve => setTimeout(resolve, random(50,300)));
    }
    //Retornar os elementos para a posição original
    mover(0,0,elementos);
    executando = false;
}

function random(min, max)
{
    return (Math.random() * (max - min)) + min;
}

function mover(x,y,list)
{
    for(let i = 0; i < list.length; i++)
    {
        list[i].style.translate = x+"px " + y+"px";
    }
}
