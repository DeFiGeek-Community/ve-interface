import { Card, CardProps } from "@chakra-ui/react";

const StyledCard: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <Card
      flex={1}
      maxW="xl"
      bg={"#fcfaf2"}
      boxShadow={"rgba(0, 0, 0, 0.25) 3px 3px 0px"}
      borderRadius={"0px"}
      color={"#818181"}
      {...props}
    >
      {children}
    </Card>
  );
};

export default StyledCard;
