import React from 'react';
import { connect } from 'react-redux';
import PrediccionXeral from '../carousel/PrediccionXeral';
import { SolarInfo, Tides, Windy } from '../cards';
import PageTemplate from '../../shared/PageTemplate';
import LoadAnimation from '../../shared/LoadAnimation';
import {
  getNumericInfo,
  getSolarInfo,
  getTidesRss
} from './actions';
import { CIDADES } from '../../utils/constants';
import { extractHour } from '../../utils/dataTime';

class Home extends React.Component {
  constructor(props) {
    super();
    this.timerID = null;
  }

  fetchInitialData() {
    this.props.getSolarInfo("-8.350573861318628,43.3697102138535");
    this.props.getTidesRss();
    // Get data for main cities
    CIDADES.map(ciudad => {
      let search = `?coords=${ciudad.coordinates}&idZona=${ciudad.idZona}` +
        `&location=${ciudad.name}&type=${ciudad.type}`;
      this.props.getNumericInfo(search);
    })
  }

  isDataReady() {
    const { days, tidesRss } = this.props;
    if (days && tidesRss) return true;
    return false;
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      if (this.isDataReady()) {
        clearInterval(this.timerID);
        return;
      }
      this.fetchInitialData();
    }, 8000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { days, tidesRss } = this.props;
    return (
      <PageTemplate>
        <main style={{ height: '100%' }}>
          <div className="row justify-content-center mt-2 mb-2">
            <h1 className="text-white font-weight-bold">Información metereolóxica de Galicia</h1>
          </div>
          <article className="row justify-content-center" aria-label="predicción xeral">
            <PrediccionXeral />
          </article>
          <section className="row justify-content-center">
            <article className="col-lg-4 col-md-6 col-sm-12 p-0 p-4" aria-label="widget de información solar">
              {
                days ?
                  <SolarInfo className="mb-4 pb-4" sunrise={extractHour(days[0].variables[0].sunrise)}
                    sunset={extractHour(days[0].variables[0].sunset)}
                    duration={days[0].variables[0].duration} />
                  :
                  <LoadAnimation />
              }
            </article>
            <article className="col-lg-4 col-md-6 col-sm-12 p-0 p-4" aria-label="widget de información de mareas">
              {
                tidesRss ?
                  <Tides tides={tidesRss} />
                  :
                  <LoadAnimation />
              }
            </article>
            <article className="col-lg-4 col-md-6 col-sm-12 p-0 p-4" aria-label="widget de información de ventos">
              <Windy zoom="1" />
            </article>
          </section>
        </main>
      </PageTemplate>)
  }
}

function mapStateToProps({ solarInfo, tidesRss, stations, search }) {
  return {
    days: solarInfo.days,
    tidesRss: tidesRss.mareas,
    stations,
    results: search.results
  };
}

export default connect(mapStateToProps, { getSolarInfo, getNumericInfo, getTidesRss })(Home);