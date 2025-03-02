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

    // Requisição para o backend
    fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Converte a resposta em JSON se a resposta for bem-sucedida
        } else {
            throw new Error('Erro ao registrar usuário');
        }
    })
    .then(data => {
        // Caso o cadastro seja bem-sucedido
        alert('Cadastro realizado com sucesso!');
        window.location.href = '/login'; // Redireciona para a página de login após sucesso
    })
    .catch(error => {
        console.error('Erro ao realizar cadastro:', error);
        alert('Ocorreu um erro. Tente novamente.');
    })
    .finally(() => {
        // Reabilitar o botão de submit
        document.getElementById('submit-btn').disabled = false;
    });
});
