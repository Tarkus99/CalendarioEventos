let lastTarget;
let nav = 0;
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
const upperMeses = {
    enero: 'Enero',
    febrero: 'Febrero',
    marzo: 'Marzo',
    abril: 'Abril',
    mayo: 'Mayo',
    junio: 'Junio',
    julio: 'Julio',
    agosto: 'Agosto',
    septiembre: 'Septiembre',
    octubre: 'Octubre',
    noviembre: 'Noviembre',
    diciembre: 'Diciembre'
};
const calendar = document.querySelector('.calendar');
const mes_text = document.querySelector('#header_month');
const año_text = document.querySelector('#header_year');

load();

function load() {
    const dt = new Date();
    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }
    const day = dt.getDate();
    const dtStr = dt.toLocaleString('es-ES',
        {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).split(',');

    const month = dt.getMonth();
    const year = dt.getFullYear();
    mes_text.innerText = upperMeses[dt.toLocaleString('es-ES', { month: 'long' })];
    año_text.innerText = year;
    document.querySelector('.info .date h1').innerText = upperDias[dtStr[0]];
    document.querySelector('.info .date p').innerText = dtStr[1];

    let auxDate = new Date(year, month + 1, 0);

    let max = auxDate.getDate();
    let first = firstDay(year, month).split(',')[0];

    let padding = dias.indexOf(first);
    calendar.querySelector('.main').innerHTML = '';
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
        fill.setAttribute("y", year);
        fill.setAttribute("m", month);
        fill.setAttribute("d", i);
        fill.append(barrita);
        fill.toggleAttribute("clicked", false);
        fill.addEventListener('click', dayClicked);
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
    if (e.target.id === 'next_month')
        nav++;
    else if (e.target.id === 'prev_month')
        nav--;
    load();
})

function dayClicked(e) {
    if (lastTarget && lastTarget !== e.target) {
        lastTarget.toggleAttribute("clicked", false);
        e.target.toggleAttribute("clicked", true);
    } else if (lastTarget && lastTarget === e.target) {
        e.target.toggleAttribute("clicked", false);
    } else {
        e.target.toggleAttribute("clicked", true);
    }
    lastTarget = e.target;
    clicked = e.target;

    cambiarInfoDerecha(e.target);
}

function cambiarInfoDerecha(target) {
    let dt = new Date(target.getAttribute('y'), target.getAttribute('m'), target.getAttribute('d'));

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