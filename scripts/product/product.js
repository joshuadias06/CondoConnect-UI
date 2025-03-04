document.addEventListener("DOMContentLoaded", () => {
    const produtosContainer = document.getElementById("produtos");
    const recentesContainer = document.getElementById("recentes");
    const searchInput = document.getElementById("search");
    const filterSelect = document.getElementById("filter");
    
    async function carregarProdutos() {
        try {
            const response = await fetch("/produtos");
            const produtos = await response.json();
            renderizarProdutos(produtos);
            renderizarRecentes(produtos);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }
    
    function renderizarProdutos(produtos) {
        produtosContainer.innerHTML = "";
        produtos.forEach(produto => {
            const produtoElemento = document.createElement("div");
            produtoElemento.classList.add("produto");
            produtoElemento.innerHTML = `
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <span>R$ ${produto.preco.toFixed(2)}</span>
            `;
            produtosContainer.appendChild(produtoElemento);
        });
    }
    
    function renderizarRecentes(produtos) {
        recentesContainer.innerHTML = "";
        const recentes = produtos.slice(-4);
        recentes.forEach(produto => {
            const produtoElemento = document.createElement("div");
            produtoElemento.classList.add("produto");
            produtoElemento.innerHTML = `
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <span>R$ ${produto.preco.toFixed(2)}</span>
            `;
            recentesContainer.appendChild(produtoElemento);
        });
    }
    
    searchInput.addEventListener("input", (e) => {
        const termo = e.target.value.toLowerCase();
        const produtosFiltrados = [...document.querySelectorAll(".produto")].filter(produto => 
            produto.textContent.toLowerCase().includes(termo)
        );
        produtosContainer.innerHTML = "";
        produtosFiltrados.forEach(produto => produtosContainer.appendChild(produto));
    });
    
    carregarProdutos();