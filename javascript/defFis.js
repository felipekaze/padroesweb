var ativo = false;
var executando = false;
var elementos = new Array();
var frequencia = null;
var deslocamento = null;

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#def_mot_freq").addEventListener("input", function() {
        document.querySelector("#def_mot_freq_valor").textContent = document.querySelector("#def_mot_freq").value;
    });
    document.querySelector("#def_mot_desl").addEventListener("input", function() {
        document.querySelector("#def_mot_desl_valor").textContent = document.querySelector("#def_mot_desl").value;
    });
    iniciar();
    document.querySelector("#def_mot").addEventListener("change", function() {
        alternar();
    } );
} );

function iniciar()
{
    frequencia = document.querySelector("#def_mot_freq");
    deslocamento = document.querySelector("#def_mot_desl");
}

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
    ...document.querySelectorAll("main h4"),
    ...document.querySelectorAll("main li")
    ];

    while(ativo)
    {
        let des = deslocamento.value;
        //Mover os elementos para uma posição aleatória
        mover(random(-des,des),random(-des,des),elementos);
        await new Promise(resolve => setTimeout(resolve, frequencia.value * 1000));
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
