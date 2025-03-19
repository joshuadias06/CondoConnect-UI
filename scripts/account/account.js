document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("authToken");
    let userData = null;

    if (token) {
        fetch("http://localhost:8080/auth/user/details", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            userData = data;
            document.getElementById("name").value = data.name;
            document.getElementById("email").value = data.email;
            document.getElementById("cpf").value = data.cpf;
            document.getElementById("phone").value = data.phone;
        })
        .catch(error => console.error("Erro ao carregar os dados do usuário", error));
    }
});

document.getElementById("update-button").addEventListener("click", function() {
    document.getElementById("password-popup").classList.remove("hidden");
});

document.getElementById("cancel-popup").addEventListener("click", function() {
    document.getElementById("password-popup").classList.add("hidden");
});

document.getElementById("confirm-update").addEventListener("click", function() {
    const token = localStorage.getItem("authToken");
    const password = document.getElementById("confirm-password").value;
    
    if (!password) {
        alert("Por favor, insira sua senha.");
        return;
    }
    
    fetch("http://localhost:8080/auth/update", {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        alert("Dados atualizados com sucesso!");
        document.getElementById("password-popup").classList.add("hidden");
    })
    .catch(error => console.error("Erro ao atualizar usuário", error));
});