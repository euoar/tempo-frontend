import React from 'react';

// muestra información con la salida y puesta de sol
export const Tides = props =>
    <div style={{opacity: 0.8}} className="card bg-light small text-center" aria-hidden="true">
        <div className="card-body" aria-hidden="true">
            <h2 className="card-title">Información de mareas <i className="wi wi-flood" /></h2>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="d-inline-block text-center" style={{ width: '40%' }} scole="col"></div>
                    <div className="d-inline-block text-center font-weight-bold" style={{ width: '30%' }} scole="col">Hora</div>
                    <div className="d-inline-block text-center font-weight-bold" style={{ width: '30%' }} scole="col">Altura</div>
                </li>
                {
                    props.tides.map((elemento, index) =>
                        <li key={index} className="list-group-item">
                            <div className="d-inline-block text-center" style={{ width: '40%' }} >
                                {elemento._attributes.idTipoMarea === '0' ? 'Baixamar: ' : 'Pleamar: '}
                            </div>
                            <div className="d-inline-block text-center" style={{ width: '30%' }} >{elemento._attributes.hora}</div>
                            <div className="d-inline-block text-center" style={{ width: '30%' }} >{elemento._attributes.altura}m</div>
                        </li>
                    )
                }
            </ul>
        </div>
    </div>