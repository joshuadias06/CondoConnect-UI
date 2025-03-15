document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Exibição mensal inicial
        locale: 'pt-br', // Definindo o idioma para português
    });

    calendar.render();
});
