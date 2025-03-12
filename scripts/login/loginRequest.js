document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário por padrão

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Verificar se o formulário está válido
    if (!email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Desabilitar o botão de submit para evitar múltiplos envios
    document.getElementById('submit-btn').disabled = true;

    // Objeto de login para enviar ao backend
    const loginData = {
        email: email,
        password: senha
    };

    // Requisição para o backend
    fetch('http://localhost:8080/auth/login', {  // Alterado para a URL correta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Salvar o token JWT no localStorage
            localStorage.setItem('authToken', data.token);
            alert('Login bem-sucedido!');

            
            window.location.href = '/layouts/product.htmls';
        } else {
            alert('Login falhou. Verifique suas credenciais.');
        }
    })
    .catch(error => {
        console.error('Erro ao realizar login:', error);
        alert('Ocorreu um erro. Tente novamente.');
    })
    .finally(() => {
        // Reabilitar o botão de submit
        document.getElementById('submit-btn').disabled = false;
    });
});
