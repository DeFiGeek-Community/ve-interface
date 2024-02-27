import { Button, ButtonProps } from "@chakra-ui/react";

const StyledButton: React.FC<
  {
    isLoading?: boolean;
    children: string;
  } & ButtonProps
> = (props) => {
  return (
    <Button
      {...props}
      border="unset"
      borderRadius="unset"
      _active={{
        bottom: "-1px",
        right: "-1px",
        boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
      }}
      colorScheme="#FCFAF2"
      bg="#F9AEA5"
      boxShadow="2px 2px 0px rgba(0, 0, 0, 0.25)"
    >
      {props.children}
    </Button>
  );
};

export default StyledButton;
