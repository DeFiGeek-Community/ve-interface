import { HStack, StackProps, chakra } from "@chakra-ui/react";

const StyledHStack: React.FC<
  StackProps & { title: string; value: string; unit: string }
> = ({ title, value, unit, ...props }) => {
  return (
    <HStack justifyContent={"space-between"} {...props}>
      <chakra.p>{title}</chakra.p>
      <chakra.p fontSize={"2xl"}>
        <>{value}</>
        <chakra.span fontSize={"lg"} ml={1}>
          {unit}
        </chakra.span>
      </chakra.p>
    </HStack>
  );
};

export default StyledHStack;
