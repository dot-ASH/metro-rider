import React from "react";
import { Flex, Image, Text, Link } from "@chakra-ui/react";
import logo from "assets/img/logo.png";

function Success() {
  return (
    <Flex
      w={"100%"}
      minH={"100vh"}
      bg={"#f6f2ef"}
      justifyContent="center"
      alignItems={"center"}
      flexDirection={"column"}
      position="relative"
      gap={5}
    >
      <Flex position={"absolute"} top={"10%"}>
        <Image src={logo} width={{ base: "80px", md: "100px" }} />
      </Flex>

      <Flex flexDirection={"row"} alignItems="center" gap={5}>
        <Image
          src={require("../../assets/img/success.gif")}
          alt="success"
          w={20}
          h={20}
          mt={-7}
        />
        <Text
          fontSize={{ base: "28px", md: "32px" }}
          textAlign="center"
          mb={"1.5rem"}
          fontFamily="'Bree Serif', serif"
          opacity={0.9}
          color={"teal"}
        >
          Recharge successfull!
        </Text>
      </Flex>
      <Flex>
        <Text
          fontSize={"18px"}
          textAlign="center"
          mb={"1.5rem"}
          fontFamily="'Vollkorn', serif"
        >
          Now you can close the tab &nbsp;
        </Text>
        <Link
          href="https://chakra-ui.com"
          isExternal
          fontSize={"18px"}
          fontFamily="'Vollkorn', serif"
          textDecoration={"underline"}
        >
          close
        </Link>
      </Flex>
    </Flex>
  );
}

export default Success;
