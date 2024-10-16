import { Card, CardProps } from "@chakra-ui/react";
import { useContractContext } from "lib/contexts/ContractContext";

const StyledCard: React.FC<CardProps> = ({ children, ...props }) => {
  const { config } = useContractContext();
  const themeColors = config.themeColors;
  return (
    <Card
      flex={1}
      maxW="xl"
      bg={themeColors.backgroundColor}
      boxShadow={"rgba(0, 0, 0, 0.25) 3px 3px 0px"}
      borderRadius={"0px"}
      color={themeColors.primaryText}
      {...props}
    >
      {children}
    </Card>
  );
};

export default StyledCard;
