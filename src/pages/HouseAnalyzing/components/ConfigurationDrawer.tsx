import { Box, Button, Drawer, Group, Modal, Text } from "@mantine/core";
import { useContext } from "react";
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
import { useForm } from "@mantine/form";
import Money from "../../../components/Inputs/Money";

export default ({ onClose }: { onClose: () => void }) => {
  const {
    homePrice,
    downPayment,
    rentalBaseMonthly,
    mortgageInterestRate,
    years,
    rentalRaiseAnnual,
    averageAnnualInvestmentYield,
    houseTaxRate,
    updateAll,
  } = useContext(HouseAnalyzingContext);

  const form = useForm({
    initialValues: {
      [HOME_PRICE_FIELD]: homePrice,
      [DOWN_PAYMENT_FIELD]: downPayment,
      [RENTAL_BASE_FIELD]: rentalBaseMonthly,
      [MORTGAGE_RATE_FIELD]: mortgageInterestRate,
      [YEARS_FIELD]: years,
      [RENTAL_RAISE_FIELD]: rentalRaiseAnnual,
      [AVG_ANNUAL_YIELD]: averageAnnualInvestmentYield,
      [PROPERTY_TAX_FIELD]: houseTaxRate,
    },
    validate: {
      [HOME_PRICE_FIELD]: (value, values) =>
        values[DOWN_PAYMENT_FIELD] > value
          ? "You are rich as hell, reduce the down payment"
          : null,
    },
  });
  return (
    <Modal
      opened={true}
      onClose={onClose}
      title={<Text>Update configuration</Text>}
      size="lg"
    >
      <form>
        <Group>
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
        </Group>
      </form>
      <Button
        className=" mt-4"
        onClick={() => {
          updateAll({ ...form.getValues() });
          onClose();
        }}
      >
        Apply
      </Button>
    </Modal>
  );
};
