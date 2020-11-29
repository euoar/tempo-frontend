import React from 'react';
import {getWeekdayName} from '../../utils/dataTime';
import {getHttpsUrl} from '../../utils/adaptRequestUrl';
import styled from 'styled-components';

const StyledTable = styled.div.attrs({
    className: "tab-content",
})`
    opacity: 0.8;
    tbody {
        height: 60vh;
    }
`;

const ContentLocality = props => (
    <StyledTable className="tab-content bg-light">
    {
        props.days.map( (day, i) => 
            <div key={i} className={'tab-pane' + (i === props.activeContent ? ' show active' : ' fade') } 
                id={'dia' + i} role="tabpanel" aria-labelledby={'dia' + i + '-tab'}>
                    <table className="tableFixed tabla-5">
                            <caption className="text-right">Predicción para o { getWeekdayName(day.skyState[0].timeInstant, true) }</caption>
                        <thead>
                            <tr>
                                <th><i className="wi wi-time-2 i-cabecera-tabla" /></th>
                                <th><i className="wi wi-day-cloudy i-cabecera-tabla" /></th>
                                <th><i className="wi wi-cloud i-cabecera-tabla" /></th>
                                <th><i className="wi wi-thermometer-exterior i-cabecera-tabla" /></th>
                                <th><i className="wi wi-strong-wind i-cabecera-tabla" /></th>                               
                            </tr>   
                        </thead>
                        <tbody>
                        {
                            day.skyState.map( (sk, i) =>
                                <tr key={i}>
                                    <td>{sk.timeInstant.getHours()}h</td>
                                    <td>
                                        <img alt={sk.value} src={getHttpsUrl(sk.iconURL)}/>
                                        
                                    </td>
                                    <td>
                                    {Math.round(day.cloudAreaFraction[i].value)}%
                                    </td>
                                    <td>{day.temperature[i].value }°</td>
                                    <td><img alt="Icono de ventos" src={getHttpsUrl(day.wind[i].iconURL)} /></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
        )
    }
    </StyledTable>
);

export default ContentLocality;
