import React, {useState} from 'react';
import Tabs from './Tabs';
import ErrorBoundary from '../../shared/ErrorBoundary';
import './ForecastTable.css';
import ContentLocality from './ContentLocality';
import ContentBeach from './ContentBeach';
import LoadAnimation from '../../shared/LoadAnimation';


const ForecastTable = props => {
    const [selectedTab, setSelectedTab] = useState(0);
    let { days } = props;
        return (
            <React.Fragment>
                {
                    days && days.length > 0 ?
                        <ErrorBoundary>
                            <Tabs days={days} activeContent={selectedTab}
                                selectTab={(e, selected) => setSelectedTab(selected)} />
                            {
                                days[0].significativeWaveHeight.length > 0 ?
                                    <ContentBeach days={days} activeContent={selectedTab} />
                                    :
                                    <ContentLocality days={days} activeContent={selectedTab} />
                            }
                        </ErrorBoundary>
                        :
                        <LoadAnimation type="ThreeDots"/>
                }
            </React.Fragment>
        )
}

export default ForecastTable;