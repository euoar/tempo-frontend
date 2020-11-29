/**
 * Fomatea la hora a mostrar en la información de mareas
 * El formato que se obtiene de la api es: 2018-12-17T00:00:00+01,
 * así que 
 * @param {*} props 
 */

const galicianDays = ['domingo', 'luns', 'martes', 'mércores', 'xoves', 'venres', 'sábado'];

const twoDigits = num => num < 10 ? `0${num}` : num;

export const extractHour = date => {
    let d = new Date (date.slice(0,-3)); // el número negativo es para contar desde el final
    // si los minutos son menos de 10, mostramos el 0 delante
    return `${ twoDigits(d.getHours()) }:${ twoDigits(d.getMinutes()) }`;
}

/**
 * Recibe un objeto Date y devuelve en letra el día de la semana
 * @param {objeto Date} number 
 */
export const getWeekdayName = (date, galego) => {
    if (galego) {
        return galicianDays[date.getDay()];
    }
    let options = { weekday: 'long'};
    //devuelve el nombre en formato cadena de texto larga. Ej: jueves
    let dia =  new Intl.DateTimeFormat('es-ES', options).format(date);


    return dia;
}

export const getWeekday = (start, n_days) => {
    let dias = ['Domingo', 'Luns', 'Martes', 'Mércores', 'Xoves', 'Venres', 'Sábado'];
    let res = [];
    for (let c = 0; c < n_days; c++) {
        res.push(dias[start]);
        if (start === 6) {
            start = 0;
        } else {
            start++;
        }
    }
    return res;
}

