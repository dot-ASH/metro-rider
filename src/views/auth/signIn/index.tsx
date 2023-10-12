/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Image,
  useToast,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import logo from "../../../assets/img/logo.png";
import Cookies from "universal-cookie";
import { sha256HashPin } from "../../../security/encrypt";
import supabase from "data/supabase";
import AuthContext from "contexts/AuthContext";
import Chance from "chance";

function SignIn() {
  const [show, setShow] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const { signin } = useContext(AuthContext);
  const history = useHistory();
  const toast = useToast();
  const chance = new Chance();

  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("tesl", "white");
  const brandStars = useColorModeValue("tesl", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );

  const toastText = (
    title: string,
    description: string,
    status: "info" | "warning" | "success" | "error"
  ) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 6000,
      isClosable: true,
    });
  };

  const handleClick = () => setShow(!show);
  let secretKey = chance.word({ length: 5 });

  const handleLogin = async () => {
    let hashedUserInput = sha256HashPin(password + secretKey);
    let hashedPassInput = sha256HashPin(password);
    const { data, error } = await supabase
      .from("admin")
      .select("*")
      .eq("username", username)
      .eq("password", hashedPassInput);

    if (error) {
      console.log(error);
    } else {
      if (data.length) {
        toastText("Success", "Signing in...", "success");

        const { data, error } = await supabase
          .from("admin")
          .update({ token: hashedUserInput })
          .eq("username", username);

        if (!error) {
          signin(hashedUserInput, remember);
          history.push("/admin");
        }
      } else {
        toastText(
          "Check you credential",
          "Wrong password or useranme",
          "error"
        );
      }
    }
  };

  return (
    <>
      <Flex w="100%" justifyContent="center" alignItems="center" h="100vh">
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w="100%"
          mx={{ base: "auto" }}
          me="auto"
          alignItems="center"
          justifyContent="center"
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "14vh" }}
          flexDirection="column"
        >
          <Image src={logo} width="100px" my="3rem" mt="-3rem" />
          <Box me="auto" w="100%">
            <Heading
              color={textColor}
              fontSize="36px"
              mb="10px"
              textAlign="center"
            >
              Sign In
            </Heading>
            <Text
              textAlign="center"
              mb="36px"
              ms="4px"
              color={textColorSecondary}
              fontWeight="400"
              fontSize="md"
            >
              Enter your email and password to sign in!
            </Text>
          </Box>
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "100%", md: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
          >
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Username<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="email"
                placeholder="mail@simmmple.com"
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={(event) => setUsername(event.target.value)}
                required
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  type={show ? "text" : "password"}
                  onChange={(event) => setPassword(event.target.value)}
                  variant="auth"
                  required
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent="space-between" align="center" mb="24px">
                <FormControl display="flex" alignItems="center">
                  <Checkbox
                    id="remember-login"
                    colorScheme="brandScheme"
                    me="10px"
                    onChange={() => setRemember((prev) => !prev)}
                  />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
                    fontWeight="normal"
                    color={textColor}
                    fontSize="sm"
                  >
                    Keep me logged in
                  </FormLabel>
                </FormControl>
              </Flex>
              <Button
                colorScheme="teal"
                variant="solid"
                fontSize="sm"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
                onClick={() => handleLogin()}
              >
                Sign In
              </Button>
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default SignIn;
