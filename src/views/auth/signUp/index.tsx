import { useCallback, useEffect, useState } from "react";
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
  InputLeftElement,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import supabase from "data/supabase";
import { Field, Form, Formik } from "formik";
import logo from "../../../assets/img/logo.png";
import { VSeparator } from "components/separator/Separator";
import { TbLetterB, TbLetterN } from "react-icons/tb";
import { aesHashEncrypt } from "security/encrypt";

interface DropDownOptios {
  station_name: string;
  station_code: string;
}

function SignUp() {
  const toast = useToast();
  const textColor = "#322E2F";
  const textColorSecondary = "#938585";
  const [nidIcon, setNidIcon] = useState(true);
  const [loading, setLoading] = useState(false);
  const [stationData, setStationData] = useState<DropDownOptios[]>([]);
  const [stationOption, setStationOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState(
    "choose your nearest station"
  );

  const getStationData = useCallback(async () => {
    const { data, error } = await supabase
      .from("station")
      .select("station_name, station_code")
      .order("distance");
    if (!error) {
      setStationData(data);
    } else {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    getStationData();
  }, [getStationData]);

  useEffect(() => {
    if (stationData) {
      setLoading(false);
      let newArrObj = stationData.map((obj) => {
        return { label: obj.station_name, value: obj.station_code };
      });
      setStationOption(newArrObj);
    } else {
      setLoading(true);
    }
  }, [stationData]);

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

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

    if (value.length > 0 && !EMAIL_REG.test(value)) {
      error = "Enter a valid email address";
    }

    return error;
  }

  function validateNId(value: string) {
    value.length < 11 ? setNidIcon(true) : setNidIcon(false);

    const NID_REG = /^(\d{10})$/;
    const BIRTH_REG = /^(\d{17})$/;
    let error;
    if (!value) {
      error = "NID number is required";
    } else if (!(NID_REG.test(value) || BIRTH_REG.test(value))) {
      error = "Enter valid NID or Birth certificate number";
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
    values.address = selectedOption;
    let secureNid = aesHashEncrypt(values.nid);
    values.nid = secureNid;

    const { data } = await supabase.from("user").select("*").eq("phn_no", values.phn_no);
    if (data.length > 0) {
      values.email = data[0].email;
    }
    const { error } = await supabase.from("user").insert(values);
    if (error) {
      let errorLog = "";
      errorLog = error.message.includes("user_nid_key")
        ? "This nid or birth cert. number is already in use"
        : error.message.includes("user_address_fkey")
          ? "Select a station"
          : error.message;
      toastText("Error Creating Registration", errorLog, "error");
      actions.setSubmitting(false);
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          values[key] = "";
        }
      }
      setSelectedOption("");

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
      setSelectedOption("");
    }
  };

  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      bg={"#f6f2ef"}
      minHeight={"100vh"}
      py={{ base: "3rem", md: "2rem" }}
    >
      <Flex
        h="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={{ base: "0", md: "5" }}
      >
        <Image src={logo} width={{ base: "80px", md: "100px" }} />
        <Box me="auto" w="100%" m="1.3rem" mb={{ base: "2", md: "-2" }}>
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
            mb="10px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize={{ md: "md" }}
            fontFamily="'Vollkorn', serif"
          >
            Enter inforamtion acccordingly to apply!
          </Text>
          <Text textAlign="center"
            mb="30px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize={{ md: "xs" }}
            fontFamily="'Vollkorn', serif"
            fontStyle={'italic'}
          >*if you already have an id then you dont have to enter any email.</Text>
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
                height: "100%",
              }}
            >
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                gap={{ base: "1rem", md: "5rem" }}
                width="100%"
                my={{ md: "2rem" }}
                mx={{ md: "1rem" }}
                justifyContent={"center"}
                alignItems={"center"}
                h={"100%"}
              >
                <Flex
                  flexDirection="column"
                  maxW="350px"
                  gap={{ base: "2rem", md: "3rem" }}
                  w={{ base: "85%", md: "250px", lg: "350px" }}
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
                          placeholder="e.g. Sakir Ashker"
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
                      >
                        <FormLabel
                          color={textColor}
                          fontFamily="'Vollkorn SC', serif"
                        >
                          Your Email
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="e.g. nafees@gmail.com"
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
                  w={{ base: "85%", md: "250px", lg: "350px" }}
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
                          NID or Birth Certificate Number
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={
                              nidIcon ? (
                                <TbLetterN
                                  size={16}
                                  color={textColorSecondary}
                                  style={{
                                    marginLeft: "-1rem",
                                    marginTop: "-0.2rem",
                                  }}
                                />
                              ) : (
                                <TbLetterB
                                  size={16}
                                  color={textColorSecondary}
                                  style={{
                                    marginLeft: "-1rem",
                                    marginTop: "-0.2rem",
                                  }}
                                />
                              )
                            }
                          />
                          <Input
                            {...field}
                            placeholder="Your valid nid number!"
                            variant="flushed"
                            _placeholder={{ color: textColorSecondary }}
                            fontFamily="'Vollkorn', serif"
                            _focus={onFocus}
                          />
                        </InputGroup>
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
              <Flex flexDirection={"row"} mt={{ base: "0.7rem", md: "0rem" }}>
                <Field name="addrs">
                  {({ field, form }: any) => (
                    <FormControl
                      isRequired
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                      display={"flex"}
                      flexDirection={{ base: "column", md: "row" }}
                    >
                      <FormLabel
                        color={textColor}
                        fontFamily="'Vollkorn SC', serif"
                        textAlign={"left"}
                        width={{ base: "85%", md: "auto" }}
                      >
                        &nbsp;Address
                      </FormLabel>
                      <Select
                        {...field}
                        value={selectedOption}
                        onChange={handleSelectChange}
                        variant={"flushed"}
                        maxW="350px"
                        w={{ base: "85%", md: "250px", lg: "350px" }}
                        fontFamily="'Vollkorn SC', serif"
                        fontSize={14}
                        _focus={onFocus}
                        onLoad={loading}
                      >
                        {stationOption.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>
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
