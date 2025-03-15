document.addEventListener("DOMContentLoaded", () => {
    const produtosContainer = document.getElementById("produtos");
    const searchInput = document.getElementById("search");
    const filterSelect = document.getElementById("filter");

    async function carregarProdutos() {
        try {
            const response = await fetch("http://localhost:8081/produtos"); // URL correta do back-end
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const produtos = await response.json();
            renderizarProdutos(produtos);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }

    function renderizarProdutos(produtos) {
        produtosContainer.innerHTML = "";
        produtos.forEach(produto => {
            const produtoElemento = document.createElement("div");
            produtoElemento.classList.add("produto");

            // Criação do HTML para cada produto
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

    searchInput.addEventListener("input", () => {
        const termo = searchInput.value.toLowerCase();
        const produtos = document.querySelectorAll(".produto");
        produtos.forEach(produto => {
            const texto = produto.textContent.toLowerCase();
            produto.style.display = texto.includes(termo) ? "block" : "none";
        });
    });

    carregarProdutos();
});
