import React, {Suspense, lazy} from 'react';
import PageTemplate from '../../shared/PageTemplate';

import { connect } from 'react-redux';
import { getNumericInfo, getWaterTemp } from './actions';
import { getGeoLocation } from '../search/actions';
import {withRouter} from 'react-router-dom';

const ForecastTable = lazy(() => import('./ForecastTable'));

class Forecast extends React.Component {
  constructor(props) {
    super();
  }
  
  componentDidMount() {
    const search = document.location.search;
    this.props.getNumericInfo(search);
  }

  componentDidUpdate(prevProps) {
    const {location} = this.props;
    if(prevProps.location !== location){
      this.props.getNumericInfo(location.search);
    }
  }

  render() {
    let idZona = new URLSearchParams(window.location.search).get('idZona');
    let days = this.props.numericForecastInfo[idZona];

    return (
      <PageTemplate>
        <main className="container col-sm-12 col-md-8 mt-4" style={{ height: '100vh' }}>
          <h1 className="text-center text-white">O tempo en {this.props.reversedName ?
            this.props.reversedName
            :
            new URLSearchParams(window.location.search).get('location')}
          </h1>
          <Suspense fallback={<div>Loading...</div>}>
          <ForecastTable days={days} />
          </Suspense>
        </main>
      </PageTemplate>
    )
  }
}

function mapStateToProps({numericForecastInfo}) {
  return {
    numericForecastInfo
  };
}

export default withRouter(connect(mapStateToProps, { getNumericInfo, getGeoLocation, getWaterTemp })(Forecast));