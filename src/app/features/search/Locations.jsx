import React from 'react';
import LocationList from './LocationList';
import PageTemplate from '../../shared/PageTemplate';
import { connect } from 'react-redux';
import { clearResults, getResults } from './actions';
import { withRouter } from 'react-router-dom';

class Locations extends React.Component {
  constructor(props) {
    super();
  }

  clearAndGet(searchText) {
    this.props.clearResults();
    this.props.getResults(searchText);
  }

  componentDidMount() {
    const { text } = this.props.location.state;
    this.clearAndGet(text);
  }

  componentDidUpdate(prevProps) {
    const prevText = prevProps.location.state.text;
    const { text } = this.props.location.state;
    if (prevText !== text) this.clearAndGet(text);
  }

  render() {
    const { results } = this.props;
    const { text } = this.props.location.state;
    return (
      <PageTemplate>
        <main className="mt-4" style={{ minHeight: '100vh' }}>
          <LocationList className="mt-4" results={results} searchText={text} />
        </main>
      </PageTemplate>
    )
  }
}

function mapStateToProps({ search }) {
  const { results } = search;
  return { results };
}
export default withRouter(connect(mapStateToProps, { clearResults, getResults })(Locations));