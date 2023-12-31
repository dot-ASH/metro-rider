import { Flex } from "@chakra-ui/react";
import React from "react";

const HSeparator = (props: { variant?: string; [x: string]: any }) => {
  const { variant, ...rest } = props;
  return <Flex h="1px" w="100%" bg="rgba(135, 140, 189, 0.2)" {...rest} />;
};

const VSeparator = (props: { variant?: string; [x: string]: any }) => {
  const { variant, ...rest } = props;
  return (
    <Flex
      w="1px"
      h={{ base: "0px", md: "250px" }}
      bg="rgba(135, 140, 189, 0.2)"
      {...rest}
    />
  );
};

export { HSeparator, VSeparator };
