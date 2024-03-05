import { HStack, StackProps, chakra, Box } from "@chakra-ui/react";

const StyledHStack: React.FC<StackProps & { title: string; unit: string }> = ({
  title,
  children,
  unit,
  ...props
}) => {
  return (
    <HStack justifyContent={"space-between"} {...props}>
      <Box>{title}</Box>
      <Box fontSize={"2xl"}>
        {children}
        <chakra.span fontSize={"lg"} ml={1}>
          {unit}
        </chakra.span>
      </Box>
    </HStack>
  );
};

export default StyledHStack;
