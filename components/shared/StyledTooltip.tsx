import { Tooltip, Text, TooltipProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const StyledTooltip: React.FC<TooltipProps & { labelKey: string }> = ({
  labelKey,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      hasArrow
      bg={"#818181"}
      label={<Text whiteSpace={"pre-wrap"}>{t(labelKey)}</Text>}
      {...props}
    />
  );
};
export default StyledTooltip;
