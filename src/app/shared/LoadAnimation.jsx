import React from 'react';
import Loader from 'react-loader-spinner';

const LoadAnimation = (props) =>
    <div className="d-flex align-items-center justify-content-center">
        <Loader
            type={ props.type ? props.type : "Puff"}
            color="#00BFFF"
            height={100}
            width={100}
        />
    </div>

export default LoadAnimation;