import { NumberInput, NumberInputProps } from "@mantine/core";

export default (props: NumberInputProps) => {
  return (
    <NumberInput
      style={{ width: 200, minWidth: 200 }}
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
