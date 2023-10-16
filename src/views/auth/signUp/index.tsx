import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Image,
  useToast,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import supabase from "data/supabase";
import { Field, Form, Formik } from "formik";
import logo from "../../../assets/img/logo.png";
import { VSeparator } from "components/separator/Separator";

function SignUp() {
  const toast = useToast();
  const textColor = "#322E2F";
  const textColorSecondary = "#938585";

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

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  function validateEmail(value: string) {
    const EMAIL_REG = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!EMAIL_REG.test(value)) {
      error = "Enter a valid email address";
    }

    return error;
  }

  function validateNId(value: string) {
    const NID_REG = /^(\d{10})$/;
    let error;
    if (!value) {
      error = "NID number is required";
    } else if (!NID_REG.test(value)) {
      error = "Enter valid NID number";
    }
    return error;
  }

  const onFocus = {
    borderColor: "teal",
    boxShadow: "0px 1px 0px 0px teal",
  };

  function validatePhone(value: string) {
    const PHONE_REG = /0[1-9](\d{9})$/;
    const PHONE_REG_Z = /^\+880[1-9](\d{9})$/;
    let error;

    if (!value) {
      error = "Phone number is required";
    } else if (!PHONE_REG.test(value)) {
      error = "Invalid phone number";
    } else if (!PHONE_REG_Z.test(value)) {
      error = "Region code is needed eg. +880(num)";
    }
    return error;
  }

  const handleReg = async (values: any, actions: any) => {
    values.phn_no = values.phn_no.replace(/^\+/, "");
    const { error } = await supabase.from("user").insert(values);

    if (error) {
      let erroLog = "";
      error.message ===
      `duplicate key value violates unique constraint "user_phn_no_key"`
        ? (erroLog = "This phone number is already been used")
        : (erroLog = error.message);
      toastText("Error Creating Registration", erroLog, "error");
    } else {
      toastText(
        "Succesfully Applied",
        "Up on Verification, you will be notified",
        "success"
      );
      actions.setSubmitting(false);
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          values[key] = "";
        }
      }
    }
  };

  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      h="100vh "
      bg={"#f6f2ef"}
      mt={{ base: "2", md: "0" }}
    >
      <Flex
        h="95%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={{ base: "0", md: "5" }}
      >
        <Image src={logo} width={{ base: "80px", md: "100px" }} />
        <Box me="auto" w="100%" m="1.3rem" mb={{ base: "3", md: "3" }}>
          <Heading
            color={textColor}
            fontSize={{ base: "32px", md: "36px" }}
            textAlign="center"
            mb={"1.5rem"}
            fontFamily="'Bree Serif', serif"
          >
            Apply for registraion
          </Heading>
          <Text
            textAlign="center"
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize={{ md: "md" }}
            fontFamily="'Vollkorn', serif"
          >
            Enter inforamtion acccordingly to apply!
          </Text>
        </Box>
        <Formik
          initialValues={{ name: "", email: "", nid: "", phn_no: "" }}
          onSubmit={(values, actions) => handleReg(values, actions)}
        >
          {(props) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1.5rem",
                width: "100%",
              }}
            >
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                gap={{ base: "0.5rem", md: "5rem" }}
                width="100%"
                my={{ md: "1rem" }}
              >
                <Flex
                  flexDirection="column"
                  maxW="350px"
                  gap={{ base: "2rem", md: "3rem" }}
                  w={{ md: "320px", lg: "350px" }}
                >
                  <Field name="name" validate={validateName}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                        isRequired
                      >
                        <FormLabel
                          color={textColor}
                          fontFamily={"'Vollkorn SC', serif"}
                          fontWeight={500}
                        >
                          Your Full Name
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Your name. e.g. Sakir Ashker"
                          size="md"
                          variant="flushed"
                          _placeholder={{ color: textColorSecondary }}
                          fontFamily="'Vollkorn', serif"
                          _focus={onFocus}
                        />
                        <FormErrorMessage
                          fontFamily={"'Vollkorn SC', serif"}
                          fontSize={12}
                        >
                          {form.errors.name}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email" validate={validateEmail}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        isRequired
                      >
                        <FormLabel
                          color={textColor}
                          fontFamily="'Vollkorn SC', serif"
                        >
                          Your Email
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Your email. e.g. nafees@gmail.com"
                          variant="flushed"
                          _placeholder={{ color: textColorSecondary }}
                          fontFamily="'Vollkorn', serif"
                          _focus={onFocus}
                        />
                        <FormErrorMessage
                          fontFamily={"'Vollkorn SC', serif"}
                          fontSize={12}
                        >
                          {form.errors.email}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>
                <VSeparator />
                <Flex
                  flexDirection="column"
                  gap={{ base: "2rem", md: "3rem" }}
                  maxW="350px"
                  w={{ md: "320px", lg: "350px" }}
                >
                  <Field name="nid" validate={validateNId}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.nid && form.touched.nid}
                        isRequired
                      >
                        <FormLabel
                          color={textColor}
                          fontFamily="'Vollkorn SC', serif"
                        >
                          NID Number
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="you valid nid number!"
                          variant="flushed"
                          _placeholder={{ color: textColorSecondary }}
                          fontFamily="'Vollkorn', serif"
                          _focus={onFocus}
                        />
                        <FormErrorMessage
                          fontFamily={"'Vollkorn SC', serif"}
                          fontSize={12}
                        >
                          {form.errors.nid}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="phn_no" validate={validatePhone}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.phn_no && form.touched.phn_no}
                        isRequired
                      >
                        <FormLabel
                          color={textColor}
                          fontFamily="'Vollkorn SC', serif"
                        >
                          Phone Number
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="eg. +8801963606880"
                          variant="flushed"
                          _placeholder={{ color: textColorSecondary }}
                          fontFamily="'Vollkorn', serif"
                          _focus={onFocus}
                        />
                        <FormErrorMessage
                          fontFamily={"'Vollkorn SC', serif"}
                          fontSize={12}
                        >
                          {form.errors.phn_no}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>
              </Flex>
              <Button
                alignSelf="center"
                mt={8}
                bg={"#322E2F"}
                isLoading={props.isSubmitting}
                type="submit"
                rounded={8}
                fontFamily="'Bree Serif', serif"
                color={"#f6f2ef"}
                borderWidth={0.1}
                borderColor={"teal"}
                _hover={{ bg: "#d9d4cf", color: "teal" }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
}

export default SignUp;
