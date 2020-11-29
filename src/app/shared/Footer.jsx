import React from 'react';

const Footer = props =>
    <footer className="footer mt-auto text-center bg-light">
        <span className="text-muted" style={{ fontSize: '0.9rem' }}>Desarrollado por:
                <a href={props.linkHref}> Alfonso Rodríguez</a>.
                Datos obtenidos de <a href="http://www.meteogalicia.gal/web/index.action">MeteoGalicia</a>
        </span>
    </footer>

export default Footer;