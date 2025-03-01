document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário inicial
    
    const nameInput = document.getElementById("name");
    const cpfInput = document.getElementById("cpf");
    const phoneInput = document.getElementById("phone");
    const name = nameInput.value.trim();
    const cpf = cpfInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const phone = phoneInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    // Limpa mensagens de erro anteriores
    document.getElementById("name-error").textContent = '';
    document.getElementById("cpf-error").textContent = '';
    document.getElementById("phone-error").textContent = '';

    let valid = true;

    // Validação do nome
    if (!validarNome(name)) {
        document.getElementById("name-error").textContent = "Nome inválido. Insira pelo menos um nome e um sobrenome.";
        valid = false;
    }

    // Validação do CPF
    if (!validarCPF(cpf)) {
        document.getElementById("cpf-error").textContent = "CPF inválido. O CPF deve conter 11 dígitos numéricos.";
        valid = false;
    }

    // Validação do telefone
    if (!validarTelefone(phone)) {
        document.getElementById("phone-error").textContent = "Telefone inválido. Insira um número válido.";
        valid = false;
    }

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

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

function validarTelefone(phone) {
    return phone.length >= 10 && phone.length <= 11;
}

// Impedir a digitação de caracteres não numéricos no CPF e telefone
document.getElementById("cpf").addEventListener("input", function(event) {
    this.value = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos
});

document.getElementById("phone").addEventListener("input", function(event) {
    this.value = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos
});
