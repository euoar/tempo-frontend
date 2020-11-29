import React from 'react';

export const SolarInfo = props =>
    <div style={{opacity: 0.8}} className="card bg-light small text-center" aria-hidden="true">
        <div className="card-body" aria-hidden="true">
            <h2 className="card-title">Información solar <i className="wi wi-sunrise" /></h2>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex">
                <div className="ml-3 text-left font-weight-bold flex-grow-1">Horas de luz: </div>
                <div className="text-center mr-3">{props.duration}</div>
            </li>
            <li className="list-group-item d-flex">
                <div className="ml-3 text-left font-weight-bold flex-grow-1">Saída do sol: </div>
                <div className="text-center mr-3">{props.sunrise}</div>
            </li>
            <li className="list-group-item d-flex">
                <div className="ml-3 text-left font-weight-bold flex-grow-1">Posta do sol: </div>
                <div className="text-center mr-3">{props.sunset}</div>
            </li>
        </ul>
    </div>