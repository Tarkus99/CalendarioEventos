let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const dias = ['lunes', 'martes', ',miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const calendar = document.querySelector('.calendar');

load();

let a = new Date()

function load() {
    const dt = new Date();
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    let max = maxDay(year, month);
    let first = firstDay(year, month).split(',')[0];

    let padding = dias.indexOf(first);

    for (let i = 0; i < padding; i++) {
        let empty = document.createElement('div');
        empty.classList.add('tarjeta_dia');
        calendar.querySelector('.main').append(empty);
    }

    for (let i = 1; i <= max; i++) {
        let fill = document.createElement('div');
        fill.classList.add('tarjeta_dia');
        fill.innerText = i;
        calendar.querySelector('.main').append(fill);
    }

    let lastDay = new Date(year, month + 1, 0).toLocaleString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }
    ).split(',')[0];

    let last = dias.indexOf(lastDay);

    for (let index = 0; index < 6-last; index++) {
        let empty = document.createElement('div');
        empty.classList.add('tarjeta_dia');
        calendar.querySelector('.main').append(empty);
    }
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

function maxDay(year, month) {
    return new Date(year, month + 1, 0).getDate();
}