import { NumberInput, NumberInputProps } from "@mantine/core";

export default (props: NumberInputProps) => {
  return (
    <NumberInput
      style={{ width: 180, minWidth: 150 }}
      thousandSeparator=","
      labelProps={{
        style: {
          fontSize: 12,
          ellipsis: true,
        },
      }}
      {...props}
    />
  );
};
