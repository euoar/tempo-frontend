import React from 'react';
import { Link } from 'react-router-dom';
import LoadAnimation from '../../shared/LoadAnimation';

class LocationList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            timedOut: false
        }
        this.timeoutID = null;
    }

    componentDidMount() {
        this.timeoutID = setTimeout(() => this.setState({ timedOut: true }), 5000);
    }

    componentDidUpdate(prevProps) {
        if (this.props.searchText !== prevProps.searchText) {
            this.setState({
                timedOut: false
            });
            clearTimeout(this.timeoutID);
            this.timeoutID = setTimeout(() => this.setState({ timedOut: true }), 5000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutID);
    }

    render() {
        return (
            <div className="container text-center" id="resultados">
                {
                    this.props.results && this.props.results.features ?
                        <React.Fragment>
                            <h1 style={{ textAlign: 'center', color: 'white' }}>Resultados da búsqueda</h1>
                            {
                                this.props.results.features.map(feature => {
                                    const search = "?coords=" + feature.coordinates + "&idZona=" + feature.id +
                                        "&location=" + feature.name + "&type=" + feature.type;
                                    return (
                                        <p key={feature.id}>
                                            <Link className="text-white"
                                                to={{ pathname: '/forecast', search: `${search}` }}>
                                                {feature.name}, {feature.municipality}
                                            </Link>
                                        </p>
                                    )
                                })
                            }
                        </React.Fragment>
                        :
                        this.state.timedOut ?
                            <h1 style={{ textAlign: 'center', color: 'white' }}>Non se atoparon resultados</h1>
                            :
                            <LoadAnimation type="ThreeDots" />
                }
            </div>
        )
    }
}

export default LocationList;