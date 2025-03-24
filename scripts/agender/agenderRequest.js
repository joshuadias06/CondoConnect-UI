document.getElementById("booking-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    const dateInput = document.getElementById("date").value;
    const spaceInput = document.getElementById("space").value.toUpperCase(); // Converte para enum
    const nameInput = document.getElementById("name").value;
    const phoneInput = document.getElementById("phone").value;

    // Validando se o espaço foi selecionado corretamente
    if (spaceInput === "DEFAULT") {
        alert("Por favor, selecione um espaço válido.");
        return;
    }

    // Validando se a data foi preenchida
    if (!dateInput) {
        alert("Por favor, selecione uma data válida.");
        return;
    }

    // Criando o objeto para enviar (sem dataHora, apenas data)
    const requestData = {
        area: spaceInput,
        solicitante: nameInput,
        telefone: phoneInput,
        data: dateInput, // Apenas a data no formato YYYY-MM-DD
        confirmado: false
    };

    try {
        const response = await fetch("http://localhost:8081/agendamentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Agendamento realizado com sucesso!");
        } else {
            alert(`Erro ao agendar: ${result}`);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    }
});
