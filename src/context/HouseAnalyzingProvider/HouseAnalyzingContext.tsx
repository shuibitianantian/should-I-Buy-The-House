import { createContext, Dispatch, SetStateAction } from "react";

export const HOME_PRICE_FIELD = "homePrice";
export const DOWN_PAYMENT_FIELD = "downPayment";
export const RENTAL_BASE_FIELD = "rentalBaseMonthly";
export const RENTAL_RAISE_FIELD = "rentalRaiseAnnual";
export const MORTGAGE_RATE_FIELD = "mortgageInterestRate";
export const AVG_ANNUAL_YIELD = "averageAnnualInvestmentYield";
export const PROPERTY_TAX_FIELD = "houseTaxRate";
export const YEARS_FIELD = "years";

export const defaultHouseAnalyzingContext = {
  [HOME_PRICE_FIELD]: 700000,
  [DOWN_PAYMENT_FIELD]: 200000,
  [RENTAL_BASE_FIELD]: 4000,
  [RENTAL_RAISE_FIELD]: 3,
  [MORTGAGE_RATE_FIELD]: 6,
  [AVG_ANNUAL_YIELD]: 7.8, // default is the 50-year average stock market return (adjusted inflation)
  [PROPERTY_TAX_FIELD]: 2, // this is wrong
  [YEARS_FIELD]: 30,
};

export default createContext({
  ...defaultHouseAnalyzingContext,
  updateSetting: (field: string, value: any) => {},
  updateAll: (values: typeof defaultHouseAnalyzingContext) => {},
});
