import { Tooltip, Text, TooltipProps } from "@chakra-ui/react";

const StyledTooltip: React.FC<TooltipProps & { labelText: string }> = ({
  labelText,
  ...props
}) => {
  return (
    <Tooltip
      hasArrow
      bg={"#818181"}
      label={<Text whiteSpace={"pre-wrap"}>{labelText}</Text>}
      {...props}
    />
  );
};
export default StyledTooltip;
