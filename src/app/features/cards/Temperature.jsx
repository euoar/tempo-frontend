import React from 'react';
import styled from 'styled-components';

// con esta sintaxis, lo que hacemos es que todos los elementos Div
// van a tener la clase círculo asociada con el css que se indica
const Card = styled.div.attrs({
    className: "tarjeta",
  })`
    &&& {
        border-color: #04B4AE;
        border-width: 5px;
        width: 205px;
        height: 205px;
        padding: 27px 0;
        line-height: 1.5;
        font-weight:  600;
    }

    h4 {
        color: #04B4AE;
        font-weight: 900;
        font-size: 2.5rem;
        letter-spacing: -0.1rem;
    }
    
    span {
        color: #04B4AE !important;
        font-weight: 900;
    }

    img {
        height: 24px;
        width: 24px;
        color: green;
    }
`;
  
  
// Info de temperatura. Coge los Iconos del objeto definido
const Temperature = props =>
    props.stations &&
        <Card className="card bg-light small rounded-circle text-center">
            <div className="card-body" aria-hidden="true">
                <h4 className="card-title align-middle">
                    {props.stations[0].valorTemperatura} &#8451;
                </h4>
                <p>
                    Sensación: <span>{props.stations[0].valorSensTermica}°</span>
                </p>
            </div>
        </Card>
export default Temperature;

