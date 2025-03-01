document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário inicial
    
    const nameInput = document.getElementById("name");
    const cpfInput = document.getElementById("cpf");
    const name = nameInput.value.trim();
    const cpf = cpfInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    
    if (!validarNome(name)) {
        alert("Nome inválido. Insira pelo menos um nome e um sobrenome.");
        return;
    }

    if (!validarCPF(cpf)) {
        alert("CPF inválido. O CPF deve conter 11 dígitos numéricos.");
        return;
    }
    
    // Se todos os campos forem válidos, o formulário pode ser enviado
    this.submit();
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