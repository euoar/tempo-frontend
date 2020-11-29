import React from 'react';


// Componente para mostrar el mapa de vientos de windy
// acepta como props que le pasemos ancho y alto
// si no se le pasa asigna 100% para ambos
const WindyIFrame = ({ width = '100%', height = '100%', lat = '43.34', lon = '8.40', zoom = '4' }) =>
    <iframe title="windy" style={{ width: width ? width : '100%', height: height ? height : '100%' }}
        src={
            "https://embed.windy.com/embed2.html?" +
            "lat=" + lat + "&lon=" + lon + "&zoom=" + zoom + "&level=surface" +
            "&overlay=wind&menu=&message=true&marker=&calendar=" +
            "&pressure=&type=map&location=coordinates" +
            "&detail=&detailLat=" + lat + "&detailLon=" + lon +
            "&metricWind=default&metricTemp=default&radarRange=-1"
        } frameBorder="0"></iframe>

export default WindyIFrame;