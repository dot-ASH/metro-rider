import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  useColorModeValue,
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
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";

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
    <>
      <Flex
        w="100%"
        justifyContent="center"
        alignItems="center"
        h="100vh "
        py={{ base: "10px", md: "0px" }}
      >
        <Flex
          h="95%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap={{ base: "0", md: "3" }}
        >
          <Image src={logo} width={{ base: "80px", md: "100px" }} />
          <Box me="auto" w="100%" m="2rem" mb={{ base: "0", md: "3" }}>
            <Heading
              color={textColor}
              fontSize={{ base: "28px", md: "36px" }}
              textAlign="center"
              mb={"1rem"}
            >
              Apply for registraion
            </Heading>
            <Text
              textAlign="center"
              mb="36px"
              ms="4px"
              color={textColorSecondary}
              fontWeight="400"
              fontSize={{ base: "sm", md: "md" }}
            >
              Enter inforamtion asccordingly to apply!
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
                  gap: "2rem",
                }}
              >
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  gap={{ base: "1rem", md: "5rem" }}
                >
                  <Flex flexDirection="column" gap="2rem" w="300px">
                    <Field name="name" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                          isRequired
                        >
                          <FormLabel>Your Full Name</FormLabel>
                          <Input
                            {...field}
                            placeholder="name"
                            size="md"
                            variant="flushed"
                          />
                          <FormErrorMessage>
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
                          <FormLabel>Your Email</FormLabel>
                          <Input
                            {...field}
                            placeholder="email"
                            variant="flushed"
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <VSeparator />
                  <Flex flexDirection="column" gap="2rem" w="300px">
                    <Field name="nid" validate={validateNId}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.nid && form.touched.nid}
                          isRequired
                        >
                          <FormLabel>NID Number</FormLabel>
                          <Input
                            {...field}
                            placeholder="nid"
                            variant="flushed"
                          />
                          <FormErrorMessage>{form.errors.nid}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="phn_no" validate={validatePhone}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.phn_no && form.touched.phn_no}
                          isRequired
                        >
                          <FormLabel>Phone Number</FormLabel>
                          <Input
                            {...field}
                            placeholder="eg. +8801963606880"
                            variant="flushed"
                          />
                          <FormErrorMessage>
                            {form.errors.phn_no}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                </Flex>
                <Button
                  alignSelf="center"
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
      </Flex>
    </>
  );
}

export default SignUp;
