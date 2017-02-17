/**
 * ContractDetails.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import moment from 'moment';
import ContractCell from './ContractCell';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class ContractDetails extends React.Component {

    render() {
        let yearRangeTotal = "";
        let description = null;
        const award = this.props.selectedAward;

        // Date Range
        const startDate = moment(award.period_of_performance_start_date);
        const endDate = moment(award.period_of_performance_current_end_date);
        const yearRange = endDate.diff(startDate, 'year');
        if (yearRange !== 0) {
            yearRangeTotal = `(${yearRange} years)`;
        }
        const popDate = `${award.period_of_performance_start_date} -
        ${award.period_of_performance_current_end_date} ${yearRangeTotal}`;

        // Location
        let popPlace = "";
        let popZip = null;
        if (award.pop_zip) {
            popZip = award.pop_zip;
        }
        if (award.pop_city && award.pop_state_province && popZip) {
            popPlace = `${award.pop_city}, ${award.pop_state_province} ${popZip}`;
        }
        else if (award.pop_city && !award.pop_state_province && popZip) {
            popPlace = `${award.pop_city} ${popZip}`;
        }
        else if (award.pop_city && !award.pop_state_province && !popZip) {
            popPlace = award.pop_city;
        }
        else if (!award.pop_city && award.pop_state_province && popZip) {
            popPlace = `${award.pop_state_province} ${popZip}`;
        }
        else if (!award.pop_city && award.pop_state_province && !popZip) {
            popPlace = award.pop_state_province;
        }
        if (award.description) {
            description = award.description;
        }
        else {
            description = "Not Available";
        }

        // Pricing
        let pricing = "Not Available";
        if (award.type_of_contract_pricing_description) {
            pricing = award.type_of_contract_pricing_description;
        }

        return (
            <div className="contract-wrapper">
                <div className="contract-details">
                    <h4>Contract Details</h4>
                    <div className="border" />
                    <table>
                        <tbody>
                            <ContractCell
                                title="Description"
                                value={description} />
                            <ContractCell
                                title="Period of Performance"
                                value={popDate} />
                            <ContractCell
                                title="Primary Place of Performance"
                                value={popPlace} />
                            <ContractCell
                                title="Contract Award Type"
                                value={award.type_description} />
                            <ContractCell
                                title="Contract Pricing Type"
                                value={pricing} />
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
ContractDetails.propTypes = propTypes;
