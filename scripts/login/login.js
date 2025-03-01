// Função para validar os campos
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const submitButton = document.getElementById('submit-btn');
const form = document.getElementById('login-form');

// Verificar a validade dos campos
function validateForm() {
    // Verifica se o email é válido e a senha não está vazia
    if (emailInput.validity.valid && senhaInput.value.trim() !== "") {
        submitButton.disabled = false; // Ativar o botão
    } else {
        submitButton.disabled = true; // Desativar o botão
    }
}

// Adicionar os ouvintes de eventos para os campos de input
emailInput.addEventListener('input', validateForm);
senhaInput.addEventListener('input', validateForm);

// Prevenir o envio do formulário se não estiver válido
form.addEventListener('submit', function(event) {
    if (submitButton.disabled) {
        event.preventDefault();
    }
});
