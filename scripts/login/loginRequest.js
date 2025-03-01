document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita o comportamento padrão do formulário

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Cria um objeto com os dados do formulário
    const loginData = {
        email: email,
        senha: senha
    };

    // Envia os dados para o back-end
    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Sucesso - Armazena o token no LocalStorage ou Cookie
            localStorage.setItem('authToken', data.token);
            alert('Login bem-sucedido!');
            // Redireciona para a página principal ou dashboard
            window.location.href = '/dashboard'; // Substitua pelo URL real
        } else {
            // Falha no login
            alert('Email ou senha inválidos!');
        }
    })
    .catch(error => {
        console.error('Erro de autenticação:', error);
        alert('Houve um erro durante o login. Tente novamente.');
    });
});
