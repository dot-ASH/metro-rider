import React from "react";
import { Flex, Image, Text, Button } from "@chakra-ui/react";
import logo from "assets/img/logo.png";
import { useHistory } from "react-router-dom";

function Success() {
  const history = useHistory();
  const textColor = "#322E2F";
  const textColorSecondary = "#938585";
  return (
    <Flex
      w={"100%"}
      minH={"100vh"}
      bg={"#f6f2ef"}
      justifyContent={{ base: "flex-start", md: "space-between" }}
      alignItems={"center"}
      flexDirection={"column"}
      position="relative"
      gap={20}
      py={"5rem"}
      px={{ base: "2rem", md: "8rem" }}
      pb={{ base: "10%", md: "15%" }}
    >
      <Flex>
        <Image src={logo} width={{ base: "80px", md: "100px" }} />
      </Flex>
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        gap={"2rem"}
        mx={{ base: "5%", md: "20%" }}
        mt={{ base: -10, md: "0" }}
      >
        <Flex
          flexDirection={"row"}
          alignItems="center"
          gap={{ base: "1rem", md: "5rem" }}
        >
          <Image
            src={require("../../assets/img/home.gif")}
            w={{ base: "50px", md: "70px" }}
            h={{ base: "50px", md: "70px" }}
            mt={-7}
          />
          <Text
            fontSize={{ base: "24px", md: "42px" }}
            textAlign="center"
            mb={"1.5rem"}
            fontFamily="'Bree Serif', serif"
            opacity={0.9}
            color={textColor}
            align={"center"}
          >
            Welcome to Metro Rider
          </Text>
        </Flex>
        <Flex flexDirection={"column"} gap={2} alignItems="center">
          <Text
            textAlign={{ base: "justify", md: "center" }}
            color={textColor}
            fontWeight="400"
            fontSize={"18px"}
            fontFamily="'Vollkorn', serif"
            lineHeight={2}
          >
            An advanced smart card solution can address MRTS balance and user
            management challenges, offering benefits such as seamless transfers,
            data insights for service optimization, and enhanced security
            against fraud. The smart card-based solution aims to create a
            user-centric and technologically advanced metro rail system, which
            includes a user-friendly mobile application.
          </Text>
          <Text
            fontFamily="'Vollkorn', serif"
            color={textColorSecondary}
            align={"center"}
          >
            <i>You can apply and download our android app from below links</i>
          </Text>
        </Flex>
      </Flex>

      <Flex
        gap={{ base: 0, md: 10 }}
        flexDirection={{ base: "column", md: "row" }}
        // mt={{ base: -10, md: "0" }}
      >
        <Button
          variant="outline"
          fontSize={"18px"}
          textAlign="center"
          mb={"1.5rem"}
          fontFamily="'Vollkorn', serif"
          colorScheme="teal"
          borderRadius={10}
          onClick={() => history.push("/registration")}
        >
          Apply for metro rider card!
        </Button>
        <Button
          variant={"solid"}
          fontSize={"18px"}
          fontFamily="'Vollkorn', serif"
          colorScheme="teal"
          borderRadius={10}
        >
          Download the App!
        </Button>
      </Flex>
    </Flex>
  );
}

export default Success;
