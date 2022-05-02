/**
 * RecipientFilterGroup.jsx
 * Created by michaelbray on 2/23/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class RecipientFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const newValue = this.props.redux.reduxFilters.selectedRecipients.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'selectedRecipients',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('selectedRecipients');
    }

    generateTags() {
        const tags = [];

        // check to see if an agency is provided
        const recipients = this.props.filter.values;

        recipients.forEach((value) => {
            const tag = {
                value: `${value}`,
                title: `RECIPIENT | ${value}`,
                removeFilter: this.removeFilter
            };

            tags.push(tag);
        });

        return tags;
    }

    render() {
        const tags = this.generateTags();

        return (<BaseTopFilterGroup
          tags={tags}
          filter={this.props.filter}
          clearFilterGroup={this.clearGroup}
          compressed={this.props.compressed} />);
    }
}

RecipientFilterGroup.propTypes = propTypes;
