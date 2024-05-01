import { useContext, useEffect, useMemo, useRef, useState } from "react";
import HouseAnalyzingContext, {
  AVG_ANNUAL_YIELD,
  DOWN_PAYMENT_FIELD,
  HOME_PRICE_FIELD,
  MORTGAGE_RATE_FIELD,
  PROPERTY_TAX_FIELD,
  RENTAL_BASE_FIELD,
  RENTAL_RAISE_FIELD,
  YEARS_FIELD,
} from "../../../context/HouseAnalyzingProvider/HouseAnalyzingContext";
import ReactECharts, { EChartsInstance } from "echarts-for-react";
import { simulate } from "./utils";
import { Button, Group, Paper, Slider, Switch, Text, rem } from "@mantine/core";
import { IconArrowBack, IconSettings } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";

const homeFactorMapping: Record<string, number> = {
  0: 1,
  25: 3,
  50: 5,
  75: 7,
  100: 9,
};

export default ({ onPrev }: { onPrev: () => void }) => {
  const context = useContext(HouseAnalyzingContext);
  const [homePriceFactor, setHomePriceFactor] = useState(50);
  const [showAll, setShowAll] = useState(false);
  const echartsRefDiff = useRef<EChartsInstance>(null);

  const updateChartDifference = (newOptions: any) => {
    if (echartsRefDiff.current) {
      const echartsInstance = echartsRefDiff.current.getEchartsInstance();
      echartsInstance.clear();
      echartsInstance.setOption(newOptions, true);
    }
  };

  const options = useMemo(() => {
    const lines = simulate({
      homePrice: context[HOME_PRICE_FIELD],
      downPayment: context[DOWN_PAYMENT_FIELD],
      years: context[YEARS_FIELD],
      houseTaxRate: context[PROPERTY_TAX_FIELD] / 100,
      maxReturn: homeFactorMapping[homePriceFactor],
      rentalBaseMonthly: context[RENTAL_BASE_FIELD],
      rentalRaiseAnnual: context[RENTAL_RAISE_FIELD] / 100,
      mortgageInterestRate: context[MORTGAGE_RATE_FIELD] / 100,
      averageAnnualInvestmentYield: context[AVG_ANNUAL_YIELD] / 100,
    });
    const differenceTrendOptions = {
      title: {
        text: "Investment difference trends",
        subtext:
          "Home value (subtract debt) - Total value of the alernative investment method (subtract rental costs)",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [...Array(context[YEARS_FIELD]).keys()].map(
          (i) => `Year ${i + 1}`
        ),
      },
      yAxis: {
        type: "value",
      },
      series: showAll
        ? lines.map((line, i) => {
            return {
              name: `Home increase ${i * 100}% (${context[YEARS_FIELD]} years)`,
              type: "line",
              smooth: true,
              data: line.diffs,
            };
          })
        : [
            {
              name: `Home value increases ${
                (homeFactorMapping[homePriceFactor] - 1) * 100
              }%`,
              type: "line",
              smooth: true,
              data: lines.at(-1)?.diffs,
            },
          ],
    };
    const costsOverReturnOptions = {
      title: {
        text: "Buy home spends VS investment return (subtract rental costs)",
        subtext: `Assume home value increases ${
          homeFactorMapping[homePriceFactor] - 1
        } times`,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [...Array(context[YEARS_FIELD]).keys()].map(
          (i) => `Year ${i + 1}`
        ),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Cumulative Costs",
          type: "line",
          smooth: true,
          data: lines.at(-1)?.totalCosts,
        },
        {
          name: "Cumulative Investment return",
          type: "line",
          smooth: true,
          data: lines.at(-1)?.investmentReturns,
        },
      ],
    };
    return {
      differenceTrendOptions,
      costsOverReturnOptions,
    };
  }, [context, homePriceFactor, showAll]);

  useEffect(() => {
    updateChartDifference(options.differenceTrendOptions);
  }, [options]);

  return (
    <div className="flex flex-col w-[calc(100vw-120px)] min-w-[1200px]">
      <Paper className="mb-4" shadow="xs" pl="md" pt="sm" pb="xl">
        <Text size="xs" className="flex gap-2 items-center mb-4 w-full">
          <IconSettings size={16} />
          Options
        </Text>
        <Group>
          <div>
            <Text size="xs" fs="italic">
              The estimation of the home price
            </Text>
            <Slider
              color="blue"
              step={25}
              label={null}
              defaultValue={50}
              marks={Object.keys(homeFactorMapping).map((k) => {
                return {
                  value: Number(k),
                  label: String(homeFactorMapping[k]),
                };
              })}
              value={homePriceFactor}
              size="xs"
              onChange={(v) => {
                setHomePriceFactor(v);
              }}
              className="w-[300px]"
            />
          </div>
          <div className="pt-3 ml-8">
            <Text size="xs" fs="italic" className="mb-1">
              Show all trends
            </Text>
            <Switch
              checked={showAll}
              onChange={(v) => setShowAll(v.target.checked)}
              className="cursor-pointer"
            />
          </div>
          <div className="ml-auto mr-12">
            <Button
              size="xs"
              leftSection={<IconArrowBack size={14} />}
              onClick={onPrev}
            >
              Go back
            </Button>
          </div>
        </Group>
      </Paper>
      <Carousel slidesToScroll={1} align="start" withIndicators loop>
        <Carousel.Slide key="diff">
          <ReactECharts
            option={options.differenceTrendOptions}
            style={{ width: "100%", height: 480 }}
            ref={echartsRefDiff}
          />
        </Carousel.Slide>
        <Carousel.Slide key="costs-returns">
          <ReactECharts
            option={options.costsOverReturnOptions}
            style={{ width: "100%", height: 480 }}
          />
        </Carousel.Slide>
      </Carousel>
    </div>
  );
};
