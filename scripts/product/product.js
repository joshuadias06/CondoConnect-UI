document.addEventListener("DOMContentLoaded", () => {
    const produtosContainer = document.getElementById("produtos");
    const searchInput = document.getElementById("search");
    const filterSelect = document.getElementById("filter");

    const openPopupBtn = document.getElementById("openPopup");
    const closePopupBtn = document.getElementById("closePopup");
    const popup = document.getElementById("productPopup");
    const productForm = document.getElementById("productForm");

    // Função para carregar os produtos do backend
    async function carregarProdutos() {
        try {
            const response = await fetch("http://localhost:8081/produtos"); // URL da API
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const produtos = await response.json();
            renderizarProdutos(produtos);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }

    // Renderiza os produtos na tela
    function renderizarProdutos(produtos) {
        produtosContainer.innerHTML = "";
        produtos.forEach(produto => {
            const produtoElemento = document.createElement("div");
            produtoElemento.classList.add("produto");

            produtoElemento.innerHTML = `
                <img src="${produto.img}" alt="${produto.nome}" class="produto-img">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <div class="detalhes">
                    <p><strong>Proprietário:</strong> ${produto.proprietario}</p>
                    <p><strong>Contato:</strong> ${produto.telefone}</p>
                </div>
            `;
            produtosContainer.appendChild(produtoElemento);
        });
    }

    // Filtro de busca
    searchInput.addEventListener("input", () => {
        const termo = searchInput.value.toLowerCase();
        const produtos = document.querySelectorAll(".produto");
        produtos.forEach(produto => {
            const texto = produto.textContent.toLowerCase();
            produto.style.display = texto.includes(termo) ? "block" : "none";
        });
    });

    // Abre o popup
    openPopupBtn.addEventListener("click", () => {
        popup.style.display = "flex";
    });

    // Fecha o popup
    closePopupBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Fecha o popup ao clicar fora
    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });

    // Enviar formulário (Adicionar produto)
    productForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Capturar os valores dos campos do formulário
        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const img = document.getElementById("img").value;
        const proprietario = document.getElementById("proprietario").value;
        const telefone = document.getElementById("telefone").value;

        // Criar o objeto do novo produto
        const novoProduto = { nome, descricao, img, proprietario, telefone };

        try {
            // Enviar o produto para o backend via POST
            const response = await fetch("http://localhost:8081/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoProduto)
            });

            if (!response.ok) {
                throw new Error("Erro ao adicionar produto");
            }

            // Fechar o popup após o envio
            popup.style.display = "none";

            // Recarregar a lista de produtos
            carregarProdutos();
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
        }
    });

    // Carrega os produtos ao iniciar
    carregarProdutos();
});
