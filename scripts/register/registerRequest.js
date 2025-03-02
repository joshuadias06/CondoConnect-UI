document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário por padrão

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    // Verificar se o formulário está válido
    if (!name || !email || !cpf || !phone || !password) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Desabilitar o botão de submit para evitar múltiplos envios
    document.getElementById('submit-btn').disabled = true;

    // Objeto de cadastro para enviar ao backend
    const registerData = {
        name: name,
        email: email,
        cpf: cpf,
        phone: phone,
        password: password
    };

    console.log("Enviando requisição para o backend...", registerData);

    // Requisição para o backend
    fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message || 'Erro ao registrar usuário'); });
        }
        return response.json();
    })
    .then(data => {
        console.log("Resposta do backend:", data);

        alert('Cadastro realizado com sucesso!');

        // Se o backend retornar um token no cadastro, podemos salvar
        if (data.token) {
            localStorage.setItem('authToken', data.token);
        }

        // Redireciona para a página de login após sucesso
        window.location.href = '/login';
    })
    .catch(error => {
        console.error('Erro ao realizar cadastro:', error);
        alert(`Erro: ${error.message || 'Ocorreu um erro. Tente novamente.'}`);
    })
    .finally(() => {
        // Reabilitar o botão de submit
        document.getElementById('submit-btn').disabled = false;
    });
});
