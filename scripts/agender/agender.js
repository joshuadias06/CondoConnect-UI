// Variáveis globais para controlar o mês e ano
let currentMonth = new Date().getMonth() + 1;  // Mês atual (começando de 1 para Janeiro)
let currentYear = new Date().getFullYear();  // Ano atual

// Cores associadas aos espaços de agendamento
const coresEspacos = {
    SALAO_DE_FESTAS: 'red',
    PISCINA: 'blue',
    CHURRASQUEIRA: 'orange',
    QUADRA: 'green',
    ACADEMIA: 'purple',
    ESPACO_GOURMET: 'yellow'
};

// Função para renderizar o calendário
function renderCalendar(month, year, agendamentos) {
    const calendar = document.getElementById('calendar');
    if (!calendar) {
        console.error("Elemento 'calendar' não encontrado.");
        return;
    }

    calendar.innerHTML = ''; // Limpa o calendário anterior

    // Cabeçalho do calendário
    const header = document.createElement('div');
    header.classList.add('calendar-header');
    header.innerHTML = `
        <button class="change-month" onclick="changeMonth(-1)">&#8592;</button>
        <div class="month-year">${getMonthName(month)} ${year}</div>
        <button class="change-month" onclick="changeMonth(1)">&#8594;</button>
    `;
    calendar.appendChild(header);

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const daysGrid = document.createElement('div');
    daysGrid.classList.add('calendar-days');

    // Adiciona os dias da semana
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day', 'week-day');
        dayElement.textContent = day;
        daysGrid.appendChild(dayElement);
    });

    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');

            if (i === 0 && j < firstDay || dayCounter > lastDate) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.textContent = dayCounter;
                dayElement.addEventListener('click', function() {
                    openModal(dayCounter, month, year, agendamentos);
                });

                // Criar um contêiner para as bolinhas
                const bolinhaContainer = document.createElement('div');
                bolinhaContainer.classList.add('bolinha-container');

                // Adicionar bolinhas para os agendamentos
                agendamentos.forEach(agendamento => {
                    const agendamentoDate = new Date(agendamento.data);
                    if (agendamentoDate.getDate() === dayCounter && agendamentoDate.getMonth() + 1 === month && agendamentoDate.getFullYear() === year) {
                        const bolinha = document.createElement('span');
                        bolinha.classList.add('bolinha');
                        bolinha.style.backgroundColor = coresEspacos[agendamento.area] || 'gray';
                        bolinhaContainer.appendChild(bolinha);
                    }
                });

                // Adiciona o contêiner ao dia, se houver bolinhas
                if (bolinhaContainer.children.length > 0) {
                    dayElement.appendChild(bolinhaContainer);
                }

                dayCounter++;
            }
            daysGrid.appendChild(dayElement);
        }
    }

    calendar.appendChild(daysGrid);
}

// Função para alterar o mês
function changeMonth(direction) {
    currentMonth += direction;

    if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
    } else if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
    }

    fetchAgendamentos(); // Recarrega os agendamentos para o novo mês
}

// Função para obter o nome do mês
function getMonthName(month) {
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[month - 1];
}

// Função para abrir o modal com os detalhes do agendamento
function openModal(day, month, year, agendamentos) {
    const modal = document.getElementById("modal");
    const modalDetails = document.getElementById("modal-agendamento-details");

    if (!modal || !modalDetails) {
        console.error("Modal ou modal details não encontrado.");
        return;
    }

    const agendamentosDia = agendamentos.filter(agendamento => {
        const agendamentoDate = new Date(agendamento.data);
        return (
            agendamentoDate.getDate() === day &&
            agendamentoDate.getMonth() + 1 === month &&
            agendamentoDate.getFullYear() === year
        );
    });

    let detalhes = agendamentosDia.length > 0 ? '' : '<p>Sem agendamentos para este dia.</p>';
    
    agendamentosDia.forEach(agendamento => {
        detalhes += `
            <div class="agendamento-item">
                <strong>Espaço:</strong> ${agendamento.area}<br>
                <strong>Hora:</strong> ${agendamento.hora}<br>
                <strong>Responsável:</strong> ${agendamento.responsavel}<br>
            </div>
        `;
    });

    modalDetails.innerHTML = detalhes;
    modal.style.display = "flex"; // Exibe o modal
}

// Fecha o modal
function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none"; // Esconde o modal
}

// Evento de fechar o modal
document.addEventListener('DOMContentLoaded', function() {
    const closeModalButton = document.getElementById("close-modal");
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }
});

// Função para buscar agendamentos
function fetchAgendamentos() {
    const dataInicio = new Date(currentYear, currentMonth - 1, 1).toISOString().split('T')[0];
    const dataFim = new Date(currentYear, currentMonth, 0).toISOString().split('T')[0];

    fetch(`http://localhost:8081/agendamentos?inicio=${dataInicio}&fim=${dataFim}`)
        .then(response => response.json())
        .then(data => renderCalendar(currentMonth, currentYear, data))
        .catch(error => console.error('Erro ao obter agendamentos:', error));
}

// Inicializa o calendário ao carregar a página
document.addEventListener('DOMContentLoaded', fetchAgendamentos);
