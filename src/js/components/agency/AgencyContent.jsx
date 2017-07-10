/**
 * AgencyContent.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import { find, throttle } from 'lodash';
import { scrollToY } from 'helpers/scrollToHelper';

import ObjectClassContainer from 'containers/agency/visualizations/ObjectClassContainer';
import RecipientContainer from 'containers/agency/visualizations/RecipientContainer';
import ObligatedContainer from 'containers/agency/visualizations/ObligatedContainer';
import FederalAccountContainer from 'containers/agency/visualizations/FederalAccountContainer';
import AgencyFooterContainer from 'containers/agency/AgencyFooterContainer';

import AgencySidebar from './sidebar/AgencySidebar';
import AgencyOverview from './overview/AgencyOverview';

const agencySections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'obligated-amount',
        label: 'Obligated Amount'
    },
    {
        section: 'object-classes',
        label: 'Object Classes'
    },
    {
        section: 'federal-accounts',
        label: 'Federal Accounts'
    },
    {
        section: 'recipients',
        label: 'Recipients'
    }
];

const propTypes = {
    agency: React.PropTypes.object
};

export default class AgencyContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSection: 'overview',
            sectionPositions: [],
            window: {
                height: 0
            }
        };

        this.jumpToSection = this.jumpToSection.bind(this);
        this.highlightCurrentSection = throttle(this.highlightCurrentSection.bind(this), 100);
        this.cacheSectionPositions = throttle(this.cacheSectionPositions.bind(this), 100);
    }

    componentDidMount() {
        this.cacheSectionPositions();
        window.addEventListener('scroll', this.highlightCurrentSection);
        window.addEventListener('resize', this.cacheSectionPositions);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.highlightCurrentSection);
        window.removeEventListener('resize', this.cacheSectionPositions);
    }

    cacheSectionPositions() {
        // it is expensive to measure the DOM elements on every scroll, so measure them upfront
        // (and when the window resizes) and cache the values
        const sectionPositions = [];

        for (let i = 0; i < agencySections.length; i++) {
            const sectionCode = agencySections[i].section;
            const domElement = document.getElementById(`agency-${sectionCode}`);
            if (!domElement) {
                // couldn't find the element
                continue;
            }

            const topPos = domElement.offsetTop;
            const bottomPos = domElement.offsetHeight + topPos;

            sectionPositions.push({
                section: sectionCode,
                top: topPos,
                bottom: bottomPos
            });
        }

        const windowHeight = window.innerHeight
            || document.documentElement.clientHeight || document.body.clientHeight;

        this.setState({
            sectionPositions,
            window: {
                height: windowHeight
            }
        });
    }

    jumpToSection(section = '') {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = find(agencySections, {
            section
        });

        if (!matchedSection) {
            // no matching section
            return;
        }

        // update the state
        this.setState({
            activeSection: section
        }, () => {
            // scroll to the correct section
            const sectionDom = document.querySelector(`#agency-${section}`);
            if (!sectionDom) {
                return;
            }

            const sectionTop = sectionDom.offsetTop - 10;
            scrollToY(sectionTop, 700);
        });
    }

    highlightCurrentSection() {
        const windowTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowBottom = windowTop + this.state.window.height;

        // determine the section to highlight
        let activeSection = agencySections[0].section;
        let bottomSectionVisible = false;
        const visibleSections = [];

        // ignore sections if only 30px of the top or bottom are visible
        const edgeMargin = 50;
        const visibleTop = windowTop + edgeMargin;
        const visibleBottom = windowBottom - edgeMargin;

        this.state.sectionPositions.forEach((section, index) => {
            // check if the section is in view at all
            if (section.top <= visibleBottom && section.bottom >= visibleTop) {
                // at least some of the section is in view, determine how much
                const height = section.bottom - section.top;
                const visibleHeight = Math.min(section.bottom, visibleBottom) -
                    Math.max(visibleTop, section.top);
                const percentageVisible = visibleHeight / height;
                visibleSections.push({
                    section: section.section,
                    amount: percentageVisible
                });

                if (index === this.state.sectionPositions.length - 1) {
                    // this is the last section and it is visible
                    bottomSectionVisible = true;
                }
            }
            else if (index === this.state.sectionPositions.length - 1) {
                // this is the last section, so highlight it if we're at the bottom or lower
                // on the page
                if (section.top <= visibleTop) {
                    // we are lower than the top of the last section
                    bottomSectionVisible = true;
                    visibleSections.push({
                        section: section.section,
                        amount: 1
                    });
                }
            }
        });

        // select the first section we saw
        if (visibleSections.length > 0) {
            activeSection = visibleSections[0].section;
            if (visibleSections[0].amount < 0.15 && visibleSections.length > 1) {
                // less than 15% of the first section is visible and we have more than 1 section,
                // select the next section
                activeSection = visibleSections[1].section;
            }
        }

        // handle a case where we're at the bottom but there's the bottom section is not tall enough
        // to be the first visible section (which will cause the bottom section to never be
        // active)
        if (bottomSectionVisible && visibleSections.length > 1) {
            const bottomSection = visibleSections[visibleSections.length - 1];
            const previousSection = visibleSections[visibleSections.length - 2];
            if (previousSection.amount < 0.5 && bottomSection.amount === 1) {
                // less than half of the previous section is visible and all of the bottom section
                // is visible, select the bottom section
                activeSection = bottomSection.section;
            }
        }

        if (activeSection === this.state.activeSection) {
            // no change
            return;
        }

        this.setState({
            activeSection
        });
    }

    render() {
        return (
            <div className="agency-content-wrapper">
                <div className="agency-sidebar">
                    <AgencySidebar
                        active={this.state.activeSection}
                        sections={agencySections}
                        jumpToSection={this.jumpToSection} />
                </div>
                <div className="agency-content">
                    <div className="agency-padded-content">
                        <AgencyOverview agency={this.props.agency.overview} />
                        <ObligatedContainer
                            agencyName={this.props.agency.overview.name}
                            activeFY={this.props.agency.overview.activeFY}
                            id={this.props.agency.id} />
                        <ObjectClassContainer
                            id={this.props.agency.id}
                            activeFY={this.props.agency.overview.activeFY} />
                        <FederalAccountContainer
                            id={this.props.agency.id}
                            activeFY={this.props.agency.overview.activeFY}
                            obligatedAmount={this.props.agency.overview.obligatedAmount} />
                        <RecipientContainer
                            id={this.props.agency.id}
                            activeFY={this.props.agency.overview.activeFY} />
                    <AgencyFooterContainer id={this.props.agency.id} />
                    </div>
                </div>
            </div>
        );
    }
}

AgencyContent.propTypes = propTypes;
