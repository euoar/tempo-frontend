export const parseNumericInfo = (json) => {
    /****************************************** 
        POBLAMOS EL OBJETO CON LOS RESULTADOS 
    *******************************************/
    /* Construimos un array de objeto con los resultados,
    agrupando los que pertenecen aun mismo timeInstant en el mismo objeto */
    /**
     * Transformaciones del json para poder trabajar con los resultados
     */

    let skyState = [],
    temperature = [],
    wind = [],
    cloudAreaFraction = [],
    significativeWaveHeight = [],
    meanWaveDirection = [];
   
    // primero elimino los que no tengan variables, para evitar los errores
    let filtrado = json.properties.days.filter(day => day.variables !== null);
    // y luego parseamos y ajustamos el json
    let days  = filtrado.map( day => {
       /* primero el skyState */
       skyState = day.variables[0].values.map( val => {
           return {
               // Adaptamos la cadena para que luego se pueda crear un objeto Date
               timeInstant: new Date(val.timeInstant.slice(0, val.timeInstant.length - 3)),
               value: val.value,
               iconURL: val.iconURL
           }
       });

       /* Ahora vamos con temperature */
       temperature = day.variables[1].values.map( val => {
           return {
               timeInstant: new Date(val.timeInstant.slice(0, val.timeInstant.length - 3)),
               value: val.value
           };
       });

       /* Ahora vamos con wind */
       wind = day.variables[2].values.map( val => {
           return {
               timeInstant: new Date(val.timeInstant.slice(0, val.timeInstant.length - 3)),
               module: val.moduleValue,
               direction: val.directionValue,
               iconURL: val.iconURL
           };
       });

       /* Ahora vamos con cloudAreaFraction */
       cloudAreaFraction = day.variables[3].values.map( val => {
           return {
               timeInstant: new Date(val.timeInstant.slice(0, val.timeInstant.length - 3)),
               value: val.value
           };
       });

       // sólo en el caso de que haya datos oceanográficos intentamos parsear
       // hay que buscar que la propiedad variables no sea null
       if (day.variables[4].values && day.variables[5].values) {
            /* Altura de las olas */
            significativeWaveHeight = day.variables[4].values.map( val => {
                return {
                    timeInstant: new Date(val.timeInstant.slice(0, val.timeInstant.length - 3)),
                    value: val.value
                }
            });

            /* Dirección de las olas */
            meanWaveDirection = day.variables[5].values.map( val => {
                return {
                    timeInstant: new Date(val.timeInstant.slice(0, val.timeInstant.length - 3)),
                    iconURL: val.iconURL
                };
            });
       }

        return {
            skyState: skyState,
            temperature: temperature,
            wind: wind,
            cloudAreaFraction: cloudAreaFraction,
            significativeWaveHeight: significativeWaveHeight,
            meanWaveDirection: meanWaveDirection
        };

    });

    /************************************************* */            

    // Formamos el array con los días a mostrar en el tab
    let hoy = days[0].skyState[0].timeInstant.getDay();

    // Ordenamos el array según el día en el que estemos
    // Por ejemplo, si hoy es jueves, el jueves tiene que 
    // aparecer en el índice uno y seguir la secuencia,
    // para que se muestre correctamente en los tabs de la vista
    let weekdays = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado'
    ];

    weekdays = weekdays.slice(hoy).concat(weekdays.slice(0, hoy - 1));

    // Manejo del error cuando meteo manda mensaje de excepción
    if (days.exception) {
        // console.log('Hay un error en la consulta a la api de meteo: ' + days.exception.message);
        days = null;
    }
    
    // weekdays son los días ordenados, según el día en que nos encontremos ahora mismo
    // esto sirve para luego presentar la info por pestaña con el número de día
    return {days: days, weekdays: weekdays};
}