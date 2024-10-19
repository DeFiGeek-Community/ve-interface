import {
  chakra,
  Heading,
  Divider,
  Card,
  CardBody,
  Container,
  Button,
} from "@chakra-ui/react";
import Link from "next/link"; // 追加

export default function Render404() {
  return (
    <Container maxW={"container.md"} py={8}>
      <Card p={8}>
        <CardBody>
          <Heading fontSize={"2xl"}>404 Not Found</Heading>
          <Divider my={4} />
          <chakra.p>This page does not exist.</chakra.p>
          <Link href="/" passHref>
            <Button mt={4} colorScheme="teal">
              Go to Home
            </Button>
          </Link>
        </CardBody>
      </Card>
    </Container>
  );
}
