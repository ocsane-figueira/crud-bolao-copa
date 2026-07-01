async function consultar() {
    const resposta = await fetch("/bolao");
    const bolao = await resposta.json();

    const lista = document.getElementById("bets-list");
    lista.innerHTML = "";

    for (let i = 0; i < bolao.length; i++) {

        lista.innerHTML += `
            <div class="bet-ticket">

                <div class="ticket-header">
                    <span>ticket ${bolao[i].id}</span>
                    <span>${bolao[i].apostador}</span>
                    <span class="ticket-value">R$ ${Number(bolao[i].valor).toFixed(2)}</span>
                </div>

                <div class="ticket-body">

                    <div class="ticket-team">
                        ${bolao[i].pais1}
                        <span class="ticket-score">${bolao[i].placar1}</span>
                    </div>

                    <div class="ticket-vs">X</div>

                    <div class="ticket-team text-right">
                        <span class="ticket-score">${bolao[i].placar2}</span>
                        ${bolao[i].pais2}
                    </div>
                </div>

            </div>
        `;
    }
}

async function criarAposta() {
    let apostador = document.getElementById("apostador").value;
    let pais1 = document.getElementById("pais1").value;
    let pais2 = document.getElementById("pais2").value;
    let placar1 = document.getElementById("placar1").value;
    let placar2 = document.getElementById("placar2").value;
    let valor = document.getElementById("valor").value;

    await fetch("/bolao", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    apostador: apostador,
                    pais1: pais1,
                    pais2: pais2,
                    placar1: placar1,
                    placar2: placar2,
                    valor: valor
                })
            });
    consultar();
}

async function deletar(id){
    if(!confirm("Deseja excluir?")){
        return;
    }
    await fetch(`/bolao/${id}`, {
        method: "DELETE"
    });
}



consultar();
