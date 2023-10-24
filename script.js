let lastTarget;
let m;
let y;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const upperDias = {
    lunes: "Lunes",
    martes: "Martes",
    miércoles: "Miércoles",
    jueves: "Jueves",
    viernes: "Viernes",
    sábado: "Sábado",
    domingo: "Domingo"
}
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const calendar = document.querySelector('.calendar');
const mes_text = document.querySelector('#header_month');
const año_text = document.querySelector('#header_year');

load(new Date());

function load(date) {
    const day = date.getDate();
    m = date.getMonth();
    y = date.getFullYear();
    mes_text.innerText = meses[m];
    año_text.innerText = y;

    let auxDate = new Date(y, m + 1, 0);

    let max = auxDate.getDate();
    let first = firstDay(y, m).split(',')[0];

    let padding = dias.indexOf(first);

    for (let i = 0; i < padding; i++) {
        let empty = document.createElement('div');
        empty.classList.add('tarjeta_dia');
        calendar.querySelector('.main').append(empty);
    }

    for (let i = 1; i <= max; i++) {
        let fill = document.createElement('div');
        let barrita = document.createElement('div');
        barrita.classList.add('barrita');
        fill.classList.add('tarjeta_dia');
        if (i === day)
            fill.classList.add('today')
        fill.innerText = i;
        fill.append(barrita);
        fill.setAttribute("clicked", "false");
        calendar.querySelector('.main').append(fill);
    }

    let lastDay = auxDate.toLocaleString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }
    ).split(',')[0];

    let last = dias.indexOf(lastDay);

    for (let index = 0; index < 6 - last; index++) {
        let empty = document.createElement('div');
        empty.classList.add('tarjeta_dia');
        calendar.querySelector('.main').append(empty);
    }
}


document.querySelector('.calendar_header').addEventListener('click', (e) => {
    calendar.querySelector('.main').innerHTML = '';
    if (e.target.id === 'next_month') {
        m++;
        if (m > 11) {
            m = 0;
            y++;
        }
    } else if (e.target.id === 'prev_month') {
        m--;
        if (m < 0) {
            m = 11;
            y--;
        }
    }
    load(new Date(y, m));
})


document.querySelector('.calendar .main').addEventListener('click', (e) => {

    if (lastTarget) {
        let lastTargetAttribute = lastTarget.getAttribute("clicked");
        lastTarget.setAttribute("clicked", lastTargetAttribute == "true" ? "false" : "true");
    }
    lastTarget = e.target;
    clicked = e.target;
    let attr_value = e.target.getAttribute("clicked");
    e.target.setAttribute("clicked", attr_value == "true" ? "false" : "true");

    cambiarInfoDerecha();
})

function cambiarInfoDerecha() {
    let dt = new Date(y, m, clicked.innerText);
    
    let dia = dt.toLocaleString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    ).split(',');

    document.querySelector('.info .date h1').innerText = upperDias[dia[0]];
    document.querySelector('.info .date p').innerText = `${dia[1]}`;
}




function firstDay(year, month) {
    return new Date(year, month, 1).toLocaleString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }
    );
}