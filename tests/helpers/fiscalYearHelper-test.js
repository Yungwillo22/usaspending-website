/**
 * fiscalYearHelper-test.js
 * Created by Kevin Li 1/25/17
 */

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import moment from 'moment';

const expectedStartYear = 2009;

describe('Fiscal Year helper functions', () => {
    it(`should use ${expectedStartYear} as its earliest available fiscal year`, () => {
        // if this test fails, it usually just means we need to update our tests to use the current
        // fiscalYearHelper's earliest fiscal year
        expect(FiscalYearHelper.earliestFiscalYear).toEqual(expectedStartYear);
    });

    describe('currentFiscalYear', () => {
        it('should use the current calendar year as the fiscal year for every month before October', () => {
            // override the moment's library's internal time to a known mocked date
            const mockedDate = moment('2015-04-01', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.currentFiscalYear();
            expect(currentFY).toEqual(2015);

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });
        it('should use the next calendar year as the fiscal year for months on or after October', () => {
            // override the moment's library's internal time to a known mocked date
            const mockedDate = moment('2015-11-01', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.currentFiscalYear();
            expect(currentFY).toEqual(2016);

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });
    });
});
