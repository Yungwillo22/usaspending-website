import { performSpendingOverTimeSearch } from "helpers/searchHelper";
import wrapPromise from "./wrapPromise";

// this is with only fy24 chosen from filters
const apiParamsFY24 =
    {
        group: "fiscal_year",
        filters: {
            time_period: [
                {
                    start_date: "2023-10-01",
                    end_date: "2024-09-30"
                }
            ]
        },
        subawards: false,
        auditTrail: "Spending Over Time Visualization"
    };

// all fy selected
const apiParamsAllFY =
    {
        group: "fiscal_year",
        filters: {
            time_period: [
                {
                    start_date: "2012-10-01",
                    end_date: "2013-09-30"
                },
                {
                    start_date: "2023-10-01",
                    end_date: "2024-09-30"
                },
                {
                    start_date: "2013-10-01",
                    end_date: "2014-09-30"
                },
                {
                    start_date: "2014-10-01",
                    end_date: "2015-09-30"
                },
                {
                    start_date: "2015-10-01",
                    end_date: "2016-09-30"
                },
                {
                    start_date: "2016-10-01",
                    end_date: "2017-09-30"
                },
                {
                    start_date: "2017-10-01",
                    end_date: "2018-09-30"
                },
                {
                    start_date: "2007-10-01",
                    end_date: "2008-09-30"
                },
                {
                    start_date: "2018-10-01",
                    end_date: "2019-09-30"
                },
                {
                    start_date: "2008-10-01",
                    end_date: "2009-09-30"
                },
                {
                    start_date: "2019-10-01",
                    end_date: "2020-09-30"
                },
                {
                    start_date: "2009-10-01",
                    end_date: "2010-09-30"
                },
                {
                    start_date: "2020-10-01",
                    end_date: "2021-09-30"
                },
                {
                    start_date: "2010-10-01",
                    end_date: "2011-09-30"
                },
                {
                    start_date: "2021-10-01",
                    end_date: "2022-09-30"
                },
                {
                    start_date: "2011-10-01",
                    end_date: "2012-09-30"
                },
                {
                    start_date: "2022-10-01",
                    end_date: "2023-09-30"
                }
            ]
        },
        subawards: false,
        auditTrail: "Spending Over Time Visualization"
    };

function fetchSpendingOverTimeData() {
    const promise = performSpendingOverTimeSearch(apiParamsAllFY).promise.then(({ data }) => data);

    return wrapPromise(promise);
}

export default fetchSpendingOverTimeData;
