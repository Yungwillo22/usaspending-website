/**
 * AboutTheDataListener.jsx
 * Created by Andrea Blackwell 12/06/2022
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { omit } from 'lodash';

import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import { useQueryParams, getQueryParamString } from 'helpers/queryParams';

const AboutTheDataListener = ({
    history,
    aboutTheData,
    match,
    location,
    showAboutTheData,
    setAboutTheDataTermFromUrl,
    Child
}) => {
    const { pathname, search } = useLocation();
    const queryParams = useQueryParams();

    useEffect(() => {
        // The #fscommand=fstest is used to access the Foresee survey admin panel
        if (!location.hash || location.hash.indexOf('#fscommand=fstest') > -1) {
            return;
        }

        const urlWithNoHash = location.hash.split("#").length > 1
            ? location.hash.split("#")[1]
            : '';
        history.replace(urlWithNoHash);
    }, [location, history]);

    useEffect(() => {
        if (search.includes('about-the-data')) {
            const { "about-the-data": term } = queryParams;
            showAboutTheData();
            setAboutTheDataTermFromUrl(term);
            // history.replace({
            //     pathname,
            //     search: getQueryParamString(omit(queryParams, ['about-the-data']))
            // });
        }
    }, [history, history.location.search, setAboutTheDataTermFromUrl, search, queryParams, pathname]);
    return <Child {...{ history, match, location }} />;
};

AboutTheDataListener.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    aboutTheData: PropTypes.object,
    showAboutTheData: PropTypes.func,
    setAboutTheDataTermFromUrl: PropTypes.func,
    Child: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.element, PropTypes.node])
};

const AboutTheDataListenerContainer = connect(
    (state) => ({
        aboutTheData: state.aboutTheData
    }),
    (dispatch) => ({
        showAboutTheData: () => dispatch(aboutTheDataActions.showAboutTheData()),
        setAboutTheDataTermFromUrl: (term) => dispatch(aboutTheDataActions.setAboutTheDataTermFromUrl(term))
    })
)(AboutTheDataListener);


const withAboutTheDataListener = (component, props) => (
    <AboutTheDataListenerContainer {...props} Child={component} />
);

export default withAboutTheDataListener;
