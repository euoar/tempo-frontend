export const parsePlaces = (json) => {
    /* Parseamos el json de la respuesta y lo usamos
        para poblar el array con el que luego trabajaremos.
        Uso map para moldear el json y coger lo que me interesa */

    var queryRes = json.features.features.map( value => {
        return {
            coordinates: value.geometry.coordinates,
            id: value.properties.id,
            name: value.properties.name,
            municipality: value.properties.municipality,
            province: value.properties.province,
            type: value.properties.type
        }
    });
    
    // Ordenar los resultados alfabéticamente por el campo name (para que quede bonito en el select)
    queryRes.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA < nameB) // sort string ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    });

    // excepción. Cuando no se encontró nada hay un campo exception en el json
    if (queryRes.exception) {
        queryRes = null;
    }
    
    //devolvemos el objeto con la propiedad features, que contiene el resultado o null si
    // la api de meteo da error. Este es el formato que espera LocationList (viene heredado este
    // formato de cuando tenía esta lógica en el back, quizá se puede simplificar en el futuro si
    // tengo tiempo y ganas)
    return {features: queryRes};
}