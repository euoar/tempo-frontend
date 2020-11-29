import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomCarousel from './CustomCarousel';
import { ButtonGroup, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getGeneralForecast } from './actions';
import LoadAnimation from '../../shared/LoadAnimation';
import { getWeekday } from '../../utils/dataTime';

/**
 * En función del tamaño del dispositivo el componente se
 * muestra con tres figures o bien como un carousel (en mobile)
 */

// estilos para pantallas grandes
const FiguresContainer = styled.div.attrs({
    className: "figuras",
})`
    img {
        opacity: 1;
    }
    @media (min-width: 768px) {
        padding-right: 1rem;
        figure {
            width: calc(100%/3);
            padding-left: 1rem;
        }
    }
`;

const PrediccionXeral = props => {
    const [day, setDay] = useState(0);
    const { rssInfo } = props;

    useEffect(() => {
        [0, 1, 2].forEach(i => {
            if (rssInfo[i] && rssInfo[i].predictionGalicia) return;
            if (!rssInfo[i] || !rssInfo[i].predictionGalicia) {
                props.getGeneralForecast(i);
            }
        });
    }, [day]);

    const updatePrediction = (newDay) => {
        if (newDay === day) return;
        setDay(newDay);
    }

    const imageSrc = 'https://www.meteogalicia.gal' +
        '/web/predicion/cprazo/getImaxeM.action?' +
        'dia=' + day;

    const days = getWeekday(new Date().getDay(), 3);

    const attrs = [
        {
            src: imageSrc,
            altText: 'Imagen predicción mañana',
            caption: 'Mañá (6-14 H)'
        },
        {
            src: imageSrc,
            altText: 'Imagen predicción tarde',
            caption: 'Tarde (14-20 H)'
        },
        {
            src: imageSrc,
            altText: 'Imagen predicción noche',
            caption: 'Noite (20-7 H)'
        },
    ];

    return (
        <div className="container text-center">
            <ButtonGroup className="text-center mb-1" >
                {
                    days.map((dayName, index) =>
                        <Button key={index} className="bg-dark" style={{ opacity: 0.9 }} onClick={() => updatePrediction(index)}>{
                            dayName
                        }</Button>
                    )
                }
            </ButtonGroup>
            {
                window.matchMedia("(max-width: 768px)").matches ?
                    <CustomCarousel items={attrs} />
                    :
                    <FiguresContainer>
                        {
                            attrs.map((item, index) =>
                                <figure key={index} className="figure figuritas rounded">
                                    <img className="figure-img img-fluid rounded" src={item.src} alt={item.altText} />
                                    <figcaption key={item.src} className="figure-caption text-white font-weight-bold">{item.caption}</figcaption>
                                </figure>
                            )
                        }
                    </FiguresContainer>
            }
            {
                rssInfo[day] ?
                    <p className="text-left text-white pt-4 pl-2 pr-2">{rssInfo[day].predictionGalicia}</p>
                    :
                    <LoadAnimation />
            }
        </div>
    );
}

function mapStateToProps({ rssInfo }) {
    return { rssInfo };
}

export default connect(mapStateToProps, { getGeneralForecast })(PrediccionXeral);
