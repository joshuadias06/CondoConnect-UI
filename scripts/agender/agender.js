// Variáveis globais para controlar o mês e ano
let currentMonth = new Date().getMonth() + 1;  // Mês atual (começando de 1 para Janeiro)
let currentYear = new Date().getFullYear();  // Ano atual

// Função para renderizar o calendário
function renderCalendar(month, year) {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // Limpa o calendário anterior
    
    const header = document.createElement('div');
    header.classList.add('calendar-header');
    header.innerHTML = `
        <button class="change-month" onclick="changeMonth(-1)">&#8592;</button>
        <div class="month-year">${getMonthName(month)} ${year}</div>
        <button class="change-month" onclick="changeMonth(1)">&#8594;</button>
    `;
    calendar.appendChild(header);

    const daysOfWeek = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    const daysGrid = document.createElement('div');
    daysGrid.classList.add('calendar-days');
    
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
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
                dayCounter++;
                dayElement.addEventListener('click', function() {
                    // Ação ao clicar no dia
                });
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

    renderCalendar(currentMonth, currentYear);
}

// Função para obter o nome do mês
function getMonthName(month) {
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[month - 1];
}

// Inicializa o calendário ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    renderCalendar(currentMonth, currentYear);  // Inicializa o calendário com o mês e ano atual
});
