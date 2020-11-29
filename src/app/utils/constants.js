/**
 * Puertos para mareas
 * 
 * Hay que tener en cuenta que el índice para meteo empieza en 1,
 * por lo que habrá que sumarle para buscar el puerto
 */


export const PUERTOS = [
    'A Coruña',
    'Xixón',
    'Vigo',
    'Vilagarcía',
    'Ría de Foz',
    'Corcubión',
    'Ría de Camariñas',
    'Ría de Corme',
    'A Guarda',
    'Ribeira',
    'Muros',
    'Pontevedra',
    'Ferrol Porto exterior',
    'Marín',
    'Ferrol',
];

// Ciudades y tipo (algunas se pone beach porque aunque en el json aparece como locality, se dan datos de beach)
export const CIDADES = [{ name: 'A Coruña', coordinates: '-8.4103,43.3635', idZona: '71933', type: 'beach' },
{ name: 'Ferrol', coordinates: '-8.23145,43.48696', idZona: '71934', type: 'beach' },
{ name: 'Lugo', coordinates: '-7.5562,43.01375', idZona: '71940', type: 'locality' },
{ name: 'Ourense', coordinates: '-7.86336,42.33942', idZona: '71953', type: 'locality' },
{ name: 'Pontevedra', coordinates: '-8.642,42.43318', idZona: '71954', type: 'locality' },
{ name: 'Santiago', coordinates: '-8.5434,42.88187', idZona: '71938', type: 'locality' },
{ name: 'Vigo', coordinates: '-8.7413,42.2237', idZona: '71956', type: 'beach' }];

// PARA USAR CON GEOCODER
// https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=43.1932491&lon=-9.0449778&zoom=18&addressdetails=1