async function consultar() {
    const resposta = await fetch ("/bolao");
    const bolao = await resposta.json();

    for( let i = 0; i < bolao.length; i++) {
        let card =
        `
        <tr>
            <td>${bolao[i].id}</td>
            <td>${bolao[i].apostador}</td>
            <td>${bolao[i].pais1}</td>
            <td>${bolao[i].pais2}</td>
            <td>${bolao[i].placar1}<td>
            <td>${bolao[i].placar2}<td>
            <td>${bolao[i].valor}<td>
        </tr>
        `
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
