/**
 * AgencyContent.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';

import ObjectClassContainer from 'containers/agency/visualizations/ObjectClassContainer';
import RecipientContainer from 'containers/agency/visualizations/RecipientContainer';

import AgencySidebar from './AgencySidebar';
import AgencyOverview from './overview/AgencyOverview';

const propTypes = {
    agency: React.PropTypes.object
};

export default class AgencyContent extends React.Component {
    render() {
        return (
            <div className="agency-content-wrapper">
                <div className="agency-sidebar">
                    <AgencySidebar />
                </div>
                <div className="agency-content">
                    <AgencyOverview agency={this.props.agency.overview} />
                    <ObjectClassContainer
                        id={this.props.agency.id}
                        active_fy={this.props.agency.active_fy} />
                    <RecipientContainer id={this.props.agency.id} />
                </div>
            </div>
        );
    }
}

AgencyContent.propTypes = propTypes;
