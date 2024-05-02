import { useContext, useState } from "react";
import HouseAnalyzingContext, {
  DOWN_PAYMENT_FIELD,
  HOME_PRICE_FIELD,
  MORTGAGE_RATE_FIELD,
  RENTAL_BASE_FIELD,
  YEARS_FIELD,
} from "../../../context/HouseAnalyzingProvider/HouseAnalyzingContext";
import { Alert, Box, Button, Fieldset, Group, List, Text } from "@mantine/core";
import Money from "../../../components/Inputs/Money";
import { IconInfoSquareRounded } from "@tabler/icons-react";
import { BlockMath } from "react-katex";
import { useForm } from "@mantine/form";
import "katex/dist/katex.min.css";
import { isEmpty } from "lodash";

export default ({
  onNext,
  onPrev,
}: {
  onNext?: () => void;
  onPrev?: () => void;
}) => {
  const {
    homePrice,
    downPayment,
    rentalBaseMonthly,
    mortgageInterestRate,
    years,
    updateAll,
    updateSetting,
    ...rest
  } = useContext(HouseAnalyzingContext);

  const [showFormulas, setShowFormulas] = useState(true);

  const form = useForm({
    initialValues: {
      [HOME_PRICE_FIELD]: homePrice,
      [DOWN_PAYMENT_FIELD]: downPayment,
      [RENTAL_BASE_FIELD]: rentalBaseMonthly,
      [MORTGAGE_RATE_FIELD]: mortgageInterestRate,
      [YEARS_FIELD]: years,
    },
    validate: {
      [HOME_PRICE_FIELD]: (value, values) =>
        values[DOWN_PAYMENT_FIELD] > value
          ? "You are rich as hell, reduce the down payment"
          : null,
    },
  });

  return (
    <form>
      <div className="mt-2 max-w-[1440px] min-w-[1440px]">
        <Fieldset
          legend={<div className="mx-2 font-medium">Basic configuration</div>}
          className="w-full"
        >
          {showFormulas ? (
            <Alert
              variant="filled"
              color="blue"
              radius="sm"
              withCloseButton
              title="To ensure the accuracy of the model, the following assumptions are made:"
              icon={<IconInfoSquareRounded />}
              onClose={() => setShowFormulas(false)}
            >
              <List listStyleType="disc">
                <List.Item>
                  The down payment is your start money for the alternative
                  investment
                </List.Item>
                <List.Item>
                  We will invest the total amount of mortgage payments due each
                  year into the investment method you use for comparison in the
                  following year and rental will be deducted from this value
                </List.Item>
                <List.Item>
                  The investment method you have chosen offers relatively stable
                  returns over a long period of time, e.g. s&p 500 offers more
                  than 7% annual return in last 50 years (adjusted inflation)
                </List.Item>
                <List.Item>
                  Monthly mortgage payment formula:
                  <BlockMath math="p \cdot r \cdot \frac{{(1 + r)^n}}{{(1 + r)^n - 1}}" />
                  <Text fs="italic" display="inline">
                    p:
                  </Text>{" "}
                  the amount of money you borrowed from the lender
                  <br />
                  <Text fs="italic" display="inline">
                    r:
                  </Text>{" "}
                  monthly interest rate <br />
                  <Text fs="italic" display="inline">
                    n:
                  </Text>{" "}
                  the total number of payments
                </List.Item>
                <List.Item>A fixed annual rental percentage increase</List.Item>
                <List.Item>A fixed annual mortgage interest rate</List.Item>
                <List.Item>
                  A fixed property rate (The value that I use may be wrong)
                </List.Item>
              </List>
            </Alert>
          ) : (
            <Button
              variant="filled"
              color="blue"
              onClick={() => setShowFormulas(true)}
            >
              Show formulas
            </Button>
          )}
          <Box mt="8" className="flex gap-x-4 flex-wrap">
            <Money
              label="Years"
              min={1}
              key={form.key(YEARS_FIELD)}
              {...form.getInputProps(YEARS_FIELD)}
            />
            <Money
              prefix="$"
              label="Home price"
              min={0}
              key={form.key(HOME_PRICE_FIELD)}
              {...form.getInputProps(HOME_PRICE_FIELD)}
            />
            <Money
              prefix="$"
              label="Down payment"
              min={0}
              key={form.key(DOWN_PAYMENT_FIELD)}
              {...form.getInputProps(DOWN_PAYMENT_FIELD)}
            />
            <Money
              prefix="$"
              label="Rental (monthly)"
              min={0}
              key={form.key(RENTAL_BASE_FIELD)}
              {...form.getInputProps(RENTAL_BASE_FIELD)}
            />
            <Money
              suffix="%"
              label="Mortgage rate (%)"
              min={0}
              key={form.key(MORTGAGE_RATE_FIELD)}
              {...form.getInputProps(MORTGAGE_RATE_FIELD)}
            />
          </Box>
          <Group className="mt-4 justify-end">
            {onPrev && (
              <Button onClick={onPrev} variant="outline">
                Previous
              </Button>
            )}
            <Button
              variant="outline"
              disabled={!onNext}
              onClick={() => {
                form.validate();
                if (isEmpty(form.errors)) {
                  updateAll({ ...form.getValues(), ...rest });
                  onNext?.();
                }
              }}
            >
              Next
            </Button>
          </Group>
        </Fieldset>
      </div>
    </form>
  );
};
