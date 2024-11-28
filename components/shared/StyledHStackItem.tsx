import { HStack, StackProps, Box } from "@chakra-ui/react";

const StyledHStackItem: React.FC<StackProps & { title: string }> = ({
  title,
  children,
  ...props
}) => {
  return (
    <HStack justifyContent={"space-between"} {...props}>
      <Box>{title}</Box>
      <Box fontSize={"2xl"}>
        {children}
      </Box>
    </HStack>
  );
};

export default StyledHStackItem;