import { useContext, useState } from "react";
import HouseAnalyzingContext, {
  AVG_ANNUAL_YIELD,
  PROPERTY_TAX_FIELD,
  RENTAL_RAISE_FIELD,
} from "../../../context/HouseAnalyzingProvider/HouseAnalyzingContext";
import { Alert, Box, Button, Fieldset, Group, List, Text } from "@mantine/core";
import Money from "../../../components/Inputs/Money";
import { IconInfoSquareRounded } from "@tabler/icons-react";
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
    rentalRaiseAnnual,
    averageAnnualInvestmentYield,
    houseTaxRate,
    updateAll,
    updateSetting,
    ...rest
  } = useContext(HouseAnalyzingContext);

  const [showAlert, setShowAlert] = useState(true);

  const form = useForm({
    initialValues: {
      [RENTAL_RAISE_FIELD]: rentalRaiseAnnual,
      [AVG_ANNUAL_YIELD]: averageAnnualInvestmentYield,
      [PROPERTY_TAX_FIELD]: houseTaxRate,
    },
  });

  return (
    <form>
      <div className="mt-2 max-w-[1200px] min-w-[1200px]">
        <Fieldset
          legend={<div className="mx-2 font-medium">Advance configuration</div>}
          className="w-full"
        >
          {showAlert ? (
            <Alert
              variant="filled"
              color="orange"
              radius="sm"
              withCloseButton
              title="Warning"
              icon={<IconInfoSquareRounded />}
              onClose={() => setShowAlert(false)}
            >
              <Text>
                The values in this section have a high level of uncertainty and
                have a significant impact on the simulation results.
              </Text>
            </Alert>
          ) : (
            <Button
              variant="filled"
              color="orange"
              onClick={() => setShowAlert(true)}
            >
              Show alert
            </Button>
          )}
          <Box mt="8" className="flex gap-x-4 flex-wrap">
            <Money
              label="Annual rental increase rate (%)"
              suffix="%"
              min={0}
              key={form.key(RENTAL_RAISE_FIELD)}
              {...form.getInputProps(RENTAL_RAISE_FIELD)}
            />
            <Money
              label="Annual investment yield (%)"
              suffix="%"
              min={0}
              key={form.key(AVG_ANNUAL_YIELD)}
              {...form.getInputProps(AVG_ANNUAL_YIELD)}
            />
            <Money
              label="Property tax (%)"
              suffix="%"
              min={0}
              key={form.key(PROPERTY_TAX_FIELD)}
              {...form.getInputProps(PROPERTY_TAX_FIELD)}
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
