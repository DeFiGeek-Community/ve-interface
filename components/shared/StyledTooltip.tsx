import { Tooltip, Text, TooltipProps } from "@chakra-ui/react";
import { useContractContext } from "lib/contexts/ContractContext";

const StyledTooltip: React.FC<TooltipProps & { labelText: string }> = ({
  labelText,
  ...props
}) => {
  const { config } = useContractContext();
  const themeColors = config.themeColors;
  return (
    <Tooltip
      hasArrow
      bg={themeColors.primaryText}
      label={<Text whiteSpace={"pre-wrap"}>{labelText}</Text>}
      {...props}
    />
  );
};
export default StyledTooltip;
