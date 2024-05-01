const calculateMonthlyPaymentOfLoan = (p: number, r: number, n: number) => {
    return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};

const calculateAnnualizedReturn = (totalReturn: number, years: number) => {
    return Math.pow(1 + totalReturn, 1 / years) - 1;
};

const calculateTotalInvestmentReturns = (
    initValue: number,
    annualRate: number,
    newInvest: number,
    baseRental: number,
    rentIncreaseRate: number,
    years: number
) => {
    const rets: number[] = [];

    [...Array(years).keys()].reduce((acc, i) => {
        const currentRent = baseRental * Math.pow(1 + rentIncreaseRate, i) * 12;
        const ret = acc * (1 + annualRate) + (newInvest - currentRent);
        rets.push(Math.round(ret));
        return ret;
    }, initValue);

    return rets;
};

export const simulate = ({
    homePrice,
    downPayment,
    years,
    houseTaxRate,
    maxReturn,
    rentalBaseMonthly,
    rentalRaiseAnnual,
    mortgageInterestRate,
    averageAnnualInvestmentYield,
}: {
    homePrice: number;
    downPayment: number;
    years: number;
    houseTaxRate: number;
    maxReturn: number; // the return of investing real estate
    rentalBaseMonthly: number;
    rentalRaiseAnnual: number;
    mortgageInterestRate: number;
    averageAnnualInvestmentYield: number;
}) => {
    const loan = homePrice - downPayment;

    const lines: { totalCosts: number[]; investmentReturns: number[]; diffs: number[] }[] = [];

    const monthlyPayment = calculateMonthlyPaymentOfLoan(
        loan,
        mortgageInterestRate / 12,
        years * 12
    );

    [...Array(maxReturn).keys()].forEach((i) => {
        const annualizedReturn = calculateAnnualizedReturn(i, years);

        const totalCosts: number[] = [];

        [...Array(years).keys()].reduce((acc, j) => {
            const ret =
                acc +
                monthlyPayment * 12 +
                houseTaxRate * homePrice * Math.pow(1 + annualizedReturn, j);

            totalCosts.push(Math.round(ret));

            return ret;
        }, 0);


        const annualNewInvestment = ((totalCosts.at(-2) || 0) - downPayment) / years;

        const investmentReturns = calculateTotalInvestmentReturns(
            downPayment,
            averageAnnualInvestmentYield,
            annualNewInvestment,
            rentalBaseMonthly,
            rentalRaiseAnnual,
            years
        );

        lines.push({
            totalCosts,
            investmentReturns,
            diffs: investmentReturns.map((ret, l) => {
                return Math.round(homePrice * Math.pow(1 + annualizedReturn, l + 1) - totalCosts[l] - ret - (years - l - 1) * 12 * monthlyPayment);
            })
        });
    });
    return lines;
};
