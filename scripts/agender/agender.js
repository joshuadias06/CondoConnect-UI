// Variáveis globais para controlar o mês e ano
let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();

const coresEspacos = {
    SALAO_DE_FESTAS: 'red',
    PISCINA: 'blue',
    CHURRASQUEIRA: 'orange',
    QUADRA: 'green',
    ACADEMIA: 'purple',
    ESPACO_GOURMET: 'yellow'
};

function renderCalendar(month, year, agendamentos) {
    const calendar = document.getElementById('calendar');
    if (!calendar) {
        console.error("Elemento 'calendar' não encontrado.");
        return;
    }
    calendar.innerHTML = '';

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
                const selectedDay = dayCounter;
                dayElement.addEventListener('click', function() {
                    openModal(selectedDay, month, year);
                });
                
                const bolinhaContainer = document.createElement('div');
                bolinhaContainer.classList.add('bolinha-container');
                
                agendamentos.forEach(agendamento => {
                    const agendamentoDate = new Date(agendamento.data);
                    if (agendamentoDate.getUTCDate() === selectedDay && agendamentoDate.getUTCMonth() + 1 === month && agendamentoDate.getUTCFullYear() === year) {
                        const bolinha = document.createElement('span');
                        bolinha.classList.add('bolinha');
                        bolinha.style.backgroundColor = coresEspacos[agendamento.area] || 'gray';
                        bolinhaContainer.appendChild(bolinha);
                    }
                });
                
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

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
    } else if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
    }
    fetchAgendamentos();
}

function getMonthName(month) {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return months[month - 1];
}

function openModal(day, month, year) {
    const modal = document.getElementById("modal");
    const modalDetails = document.getElementById("modal-agendamento-details");

    if (!modal || !modalDetails) {
        console.error("Modal ou modal details não encontrado.");
        return;
    }
    
    const selectedDate = new Date(year, month - 1, day);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const requestUrl = `http://localhost:8081/agendamentos/dia?data=${formattedDate}`;
    
    console.log("Enviando requisição para:", requestUrl);
    
    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Resposta recebida:", data);
            let detalhes = data.length > 0 ? 
                `<table class="table">
                    <thead>
                        <tr>
                            <th>Espaço</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>` : 
                '<p>Sem agendamentos para este dia.</p>';
            
            data.forEach(agendamento => {
                detalhes += `
                    <tr>
                        <td>${agendamento.area}</td>
                        <td>${agendamento.solicitante}</td>
                        <td>${agendamento.telefone}</td>
                    </tr>
                `;
            });
            
            if (data.length > 0) detalhes += '</tbody></table>';
            
            modalDetails.innerHTML = detalhes;
            modal.style.display = "block";
        })
        .catch(error => console.error('Erro ao obter agendamentos:', error));
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("modal");
    const closeModalButton = document.getElementById("close-modal");

    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }
});

function fetchAgendamentos() {
    const dataInicio = new Date(currentYear, currentMonth - 1, 1).toISOString().split('T')[0];
    const dataFim = new Date(currentYear, currentMonth, 0).toISOString().split('T')[0];
    const requestUrl = `http://localhost:8081/agendamentos?inicio=${dataInicio}&fim=${dataFim}`;
    
    console.log("Enviando requisição para:", requestUrl);
    
    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Agendamentos retornados:", data);
            renderCalendar(currentMonth, currentYear, data);
        })
        .catch(error => console.error('Erro ao obter agendamentos:', error));
}

document.addEventListener('DOMContentLoaded', fetchAgendamentos);
