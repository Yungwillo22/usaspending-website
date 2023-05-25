// TODO: [DEV-5665] TECH DEBT: Refactor Results Table to Utilize the Prototypical Inheritance Pattern with Models
// Refactor this table to use the model pattern?
// Doing the data parsing at the component level is nice but doesnt really allow for testing.
// Unless we migrate to snapshot testing?

// disable quote props because a lot of these keys actually do need quotes, so for consistency sake
/* eslint-disable quote-props */
// we'll do them all
export const awardTableColumnTypes = {
    'Award ID': 'string',
    'Recipient Name': 'string',
    'Start Date': 'date',
    'End Date': 'date',
    'Last Date to Order': 'date',
    'Award Amount': 'currency',
    'Total Outlays': 'currency',
    'COVID-19 Outlays': 'currency',
    'COVID-19 Obligations': 'currency',
    'Infrastructure Obligations': 'currency',
    'Infrastructure Outlays': 'currency',
    'Funding Agency': 'string',
    'Funding Sub Agency': 'string',
    'Contract Award Type': 'string',
    'Contract Description': 'string',
    'Signed Date': 'date',
    'Potential Award Amount': 'currency',
    'Awarding Agency': 'string',
    'Awarding Sub Agency': 'string',
    'Awarding Office': 'string',
    'Funding Office': 'string',
    'Recipient Address Line 1': 'string',
    'Recipient Address Line 2': 'string',
    'Recipient Address Line 3': 'string',
    'Recipient Country': 'string',
    'Recipient State': 'string',
    'Recipient Province': 'string',
    'Recipient County': 'string',
    'Recipient City': 'string',
    'Recipient Zip Code': 'string',
    'Place of Performance City': 'string',
    'Place of Performance Zip Code': 'string',
    'Place of Performance Country': 'string',
    'Place of Performance State': 'string',
    'Place of Performance Province': 'string',
    'Contract Pricing Type': 'string',
    'Recipient Congressional District': 'string',
    'Recipient Phone Number': 'string',
    'Recipient Fax Number': 'string',
    'Place of Performance Congressional District': 'string',
    'Place of Performance County': 'string',
    'Parent Award ID': 'string',
    'IDV Type': 'string',
    'IDC Type': 'string',
    'IDV Agency Identifier': 'string',
    'Multiple or Single Award IDV': 'string',
    'Solicitation ID': 'string',
    'Solicitation Procedures': 'string',
    'Number of Offers Received': 'number',
    'Extent Competed': 'string',
    'Set-Aside Type': 'string',
    'Commercial Item Acquisition Procedures': 'string',
    'Commercial Item Test Program': 'string',
    'Evaluated Preference': 'string',
    'FedBizOpps': 'string',
    'Small Business Competitiveness Demonstration Program': 'string',
    'PSC Code': 'string',
    'NAICS Code': 'string',
    'NAICS Description': 'string',
    'DoD Claimant Program Code': 'string',
    'Program, System, or Equipment Code': 'string',
    'Information Technology Commercial Item Category': 'string',
    'Sea Transportation': 'string',
    'Clinger-Cohen Act Compliant': 'string',
    'Subject To Construction Wage Rate Requirements': 'string',
    'Subject To Labor Standards': 'string',
    'Subject To Materials, Supplies, Articles & Equip': 'string',
    'Consolidated Contract': 'string',
    'Cost or Pricing Data': 'string',
    'Fair Opportunity Limited Sources': 'string',
    'Foreign Funding': 'string',
    'Interagency Contracting Authority': 'string',
    'Major program': 'string',
    'Multi Year Contract': 'string',
    'Price Evaluation Adjustment Preference Percent Difference': 'string',
    'Program Acronym': 'string',
    'Purchase Card as Payment Method': 'string',
    'Subcontracting Plan': 'string',
    'Issued Date': 'date',
    'Loan Value': 'currency',
    'Subsidy Cost': 'currency',
    'Sub-Award ID': 'string',
    'Sub-Award Type': 'string',
    'Action Date': 'date',
    'Sub-Awardee Name': 'string',
    'Sub-Award Amount': 'currency',
    'Prime Award ID': 'string',
    'Prime Recipient Name': 'string'
};
/* eslint-enable quote-props */
