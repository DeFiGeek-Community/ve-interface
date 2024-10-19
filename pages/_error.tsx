import { NextPageContext } from "next";
import Render404 from "components/error/Render404";
import { Container, Heading } from "@chakra-ui/react";

interface ErrorProps {
  statusCode: number;
}

function Error({ statusCode }: ErrorProps) {
  if (statusCode === 404) {
    return <Render404 />;
  }

  return (
    <Container maxW={"container.md"} py={8}>
      <Heading fontSize={"2xl"}>Error: {statusCode}</Heading>
    </Container>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
