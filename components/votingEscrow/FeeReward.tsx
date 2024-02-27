import { Button, HStack, Box, chakra } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { StyledButton } from "components/shared/StyledButton";

export default function Reward({
  address,
  token,
}: {
  address?: `0x${string}`;
  token?: `0x${string}`;
}) {
  const { t } = useTranslation();

  return (
    <HStack spacing={2}>
      <Box fontSize={"2xl"}>
        {"0.0"}
        <chakra.span fontSize={"lg"} ml={1}>
          {"ETH"}
        </chakra.span>
      </Box>
      <StyledButton
        variant={"solid"}
        size={"sm"}
        onClick={() => {
          console.log("aaa");
        }}
      >
        {t("CLAIM")}
      </StyledButton>
    </HStack>
  );
}
