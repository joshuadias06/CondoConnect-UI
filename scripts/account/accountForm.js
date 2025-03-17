document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("user-form");
    const submitButton = document.querySelector("button[type='submit']");
    
    // Desabilitar o botão inicialmente
    submitButton.disabled = true;

    // Função para verificar se todos os campos são válidos
    function checkFormValidity() {
        const inputs = form.querySelectorAll("input");
        let isValid = true;

        // Verificar se todos os campos estão preenchidos
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            }
        });

        // Ativar/desativar o botão de submit
        submitButton.disabled = !isValid;
    }

    // Adicionar ouvintes de eventos para verificar os campos
    form.addEventListener("input", checkFormValidity);
});
