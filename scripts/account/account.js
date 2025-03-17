document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("authToken");
    let userData = null; // Variável global para armazenar os dados do usuário

    if (token) {
        fetch("http://localhost:8080/api/user/details", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar dados do usuário");
            }
            return response.json();
        })
        .then(data => {
            userData = data; // Armazena os dados globalmente

            document.getElementById("name").value = data.name;
            document.getElementById("email").value = data.email;
            document.getElementById("cpf").value = data.cpf;
            document.getElementById("phone").value = data.phone;
        })
        .catch(error => {
            console.error("Erro ao carregar os dados do usuário", error);
        });

        document.getElementById("user-form").addEventListener("submit", event => {
            event.preventDefault();

            if (!userData) {
                alert("Erro: dados do usuário não foram carregados.");
                return;
            }

            fetch(`http://localhost:8080/update/${userData.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: document.getElementById("name").value,
                    phone: document.getElementById("phone").value,
                    password: document.getElementById("password").value
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao atualizar usuário");
                }
                return response.json();
            })
            .then(updatedData => {
                alert("Dados atualizados com sucesso!");
            })
            .catch(error => console.error("Erro ao atualizar usuário", error));
        });

        document.getElementById("delete-account").addEventListener("click", () => {
            if (!userData) {
                alert("Erro: dados do usuário não foram carregados.");
                return;
            }

            if (confirm("Tem certeza que deseja excluir sua conta?")) {
                fetch(`http://localhost:8080/delete/${userData.id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erro ao excluir conta");
                    }
                    alert("Conta excluída com sucesso!");
                    localStorage.removeItem("authToken");
                    window.location.href = "login.html";
                })
                .catch(error => console.error("Erro ao excluir conta", error));
            }
        });
    }
});
