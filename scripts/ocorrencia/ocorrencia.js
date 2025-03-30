document.addEventListener("DOMContentLoaded", function() {
    const ocorrenciasContainer = document.getElementById("ocorrencias");
    const openPopupBtn = document.getElementById("openPopup");
    const popup = document.getElementById("ocorrenciaPopup");
    
    function carregarOcorrencias() {
        fetch("http://localhost:8081/ocorrencias")
            .then(response => response.json())
            .then(data => {
                ocorrenciasContainer.innerHTML = "";
                data.forEach(ocorrencia => {
                    const div = document.createElement("div");
                    div.classList.add("ocorrencia-item");
                    div.innerHTML = `
                        <p><strong>ID:</strong> ${ocorrencia.id}</p>
                        <p><strong>Descrição:</strong> ${ocorrencia.descricao}</p>
                        <button class="delete-btn" onclick="excluirOcorrencia(${ocorrencia.id})">Excluir</button>
                    `;
                    ocorrenciasContainer.appendChild(div);
                });
            });
    }

    window.excluirOcorrencia = function(id) {
        fetch(`http://localhost:8081/ocorrencias/${id}`, {
            method: "DELETE"
        }).then(() => carregarOcorrencias());
    };
    
    openPopupBtn.addEventListener("click", () => popup.style.display = "flex");
    window.fecharPopup = function() {
        popup.style.display = "none";
    };
    
    window.adicionarOcorrencia = function() {
        const descricao = document.getElementById("descricao").value;
        fetch("http://localhost:8081/ocorrencias", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ descricao })
        }).then(() => {
            carregarOcorrencias();
            fecharPopup();
        });
    };
    
    carregarOcorrencias();
});