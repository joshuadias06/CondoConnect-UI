document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário inicial
    
    const nameInput = document.getElementById("name");
    const cpfInput = document.getElementById("cpf");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    
    const name = nameInput.value.trim();
    const cpf = cpfInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const phone = phoneInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const password = passwordInput.value.trim();

    // Limpa mensagens de erro anteriores
    document.getElementById("name-error").textContent = '';
    document.getElementById("cpf-error").textContent = '';
    document.getElementById("phone-error").textContent = '';
    document.getElementById("password-error").textContent = '';
    document.querySelectorAll('.error-icon').forEach(icon => icon.style.display = 'none'); // Esconde ícones de erro anteriores
    document.querySelectorAll('input').forEach(input => input.classList.remove('error')); // Remove a classe de erro

    let valid = true;

    // Validação do nome
    if (!validarNome(name)) {
        document.getElementById("name-error").textContent = "Nome inválido. Insira pelo menos um nome e um sobrenome.";
        valid = false;
        nameInput.classList.add('error'); // Adiciona a classe de erro
    }

    // Validação do CPF
    if (!validarCPF(cpf)) {
        document.getElementById("cpf-error").textContent = "CPF inválido. O CPF deve conter 11 dígitos numéricos.";
        valid = false;
        cpfInput.classList.add('error'); // Adiciona a classe de erro
    }

    // Validação do telefone
    if (!validarTelefone(phone)) {
        document.getElementById("phone-error").textContent = "Telefone inválido. Insira um número válido.";
        valid = false;
        phoneInput.classList.add('error'); // Adiciona a classe de erro
    }

    // Validação da senha
    if (!validarSenha(password)) {
        document.getElementById("password-error").textContent = "Senha inválida. A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um caractere especial.";
        valid = false;
        passwordInput.classList.add('error'); // Adiciona a classe de erro
    }

    // Exibir o ícone de alerta nos campos com erro
    document.querySelectorAll('input.error').forEach(input => {
        const icon = input.closest('.input-container').querySelector('.error-icon');
        if (icon) icon.style.display = 'block';
    });

    // Se todos os campos forem válidos, o formulário pode ser enviado
    if (valid) {
        this.submit();
    }
});

function validarNome(nome) {
    return nome.split(" ").length > 1;
}

function validarCPF(cpf) {
    if (cpf.length !== 11 || /^\D+$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    return true;
}

function validarTelefone(phone) {
    return phone.length >= 10 && phone.length <= 11;
}

function validarSenha(senha) {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%&*.\d])(?=.{8,})/;
    return regex.test(senha);
}
