/**
 * AllFiscalYears.jsx
 * Created by Emily Gullo 11/08/2016
 **/

import React from 'react';
import { Set } from 'immutable';

import FiscalYear from './FiscalYear';

const propTypes = {
    timePeriods: React.PropTypes.array,
    saveSelected: React.PropTypes.func,
    saveAll: React.PropTypes.func,
    allFY: React.PropTypes.bool,
    selectedFY: React.PropTypes.object
};

export default class AllFiscalYears extends React.Component {

    saveSelectedYear(year) {
        // copy array
        let arrayFY = this.props.selectedFY;
        let allSelected = false;

        // if already in array, it's being unselected and needs to be removed
        if (arrayFY.includes(year)) {
            arrayFY = arrayFY.delete(year);
        }
        // otherwise add it to the array
        else {
            arrayFY = arrayFY.add(year);
        }

        // if all available years have been chosen, make sure all years box is checked
        if (arrayFY.size === this.props.timePeriods.length) {
            allSelected = true;
        }
        else {
            allSelected = false;
        }

        this.props.saveSelected(arrayFY, allSelected);
    }

    saveAllYears() {
        let arrayFY = new Set(this.props.selectedFY);
        const allFY = this.props.allFY;
        const allYears = new Set(this.props.timePeriods);
        // if the there are years in the array, clear them out, we're unticking
        if (!arrayFY.isEmpty()) {
            arrayFY = arrayFY.clear();
        }
        // otherwise add all available years to the array
        else {
            arrayFY = arrayFY.merge(allYears);
        }

        this.props.saveAll(arrayFY, allFY);
    }

    render() {
        const selectedFY = new Set(this.props.selectedFY);

        const parentFY = (<FiscalYear
            checked={this.props.allFY}
            year="all"
            key="all"
            saveAllYears={this.saveAllYears.bind(this)} />);

        const fiscalYears = this.props.timePeriods.map((year, index) =>
            <FiscalYear
                checked={selectedFY.has(year)}
                year={year}
                key={index}
                saveSelectedYear={this.saveSelectedYear.bind(this)} />);

        return (
            <ul className="fiscalYears">
                { parentFY }
                {fiscalYears}
            </ul>
        );
    }
}

AllFiscalYears.propTypes = propTypes;
