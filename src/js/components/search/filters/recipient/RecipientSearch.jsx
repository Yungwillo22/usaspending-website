/**
 * Created by michaelbray on 2/16/17.
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import RecipientNameDUNSContainer from
    'containers/search/filters/recipient/RecipientNameDUNSContainer';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import SelectedRecipients from './SelectedRecipients';

const propTypes = {
    toggleRecipient: PropTypes.func,
    selectedRecipients: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

const RecipientSearch = ({ toggleRecipient, selectedRecipients, dirtyFilters }) => {
    const [hint, setHint] = useState(null);

    let localSelectedRecipients = null;

    if (selectedRecipients.size > 0) {
        localSelectedRecipients = (<SelectedRecipients
            selectedRecipients={selectedRecipients}
            toggleRecipient={toggleRecipient} />);
    }

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        }, [value]);
        return ref.current;
    };

    const prevDirtyFilters = usePrevious(dirtyFilters);

    useEffect(() => {
        if (dirtyFilters && prevDirtyFilters !== dirtyFilters) {
            if (hint) {
                hint.showHint();
            }
        }
    }, [dirtyFilters, hint, prevDirtyFilters]);

    return (
        <div className="recipient-filter">
            <div className="filter-item-wrap">
                <RecipientNameDUNSContainer
                    selectedRecipients={selectedRecipients}
                    toggleRecipient={toggleRecipient} />
                {localSelectedRecipients}
                <SubmitHint
                    ref={(component) => {
                        // this.hint = component;
                        setHint(component);
                    }} />
            </div>
        </div>
    );
};

RecipientSearch.propTypes = propTypes;
export default RecipientSearch;
