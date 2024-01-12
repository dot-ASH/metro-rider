import "assets/css/scroll.css";
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Input,
  useToast,
  FormControl,
  FormLabel,
  Select,
  Grid,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import { useState, useEffect, useContext, useCallback } from "react";
// Assets
import supabase from "data/supabase";
import moment from "moment";
import AuthContext from "contexts/AuthContext";
import { HSeparator } from "components/separator/Separator";

interface DropDownOptios {
  user_index: number;
}

export default function ComplexTable() {
  const { admin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const toastText = (
    title: string,
    description: string,
    status: "info" | "warning" | "success" | "error"
  ) => {
    setLoading(false);
    toast({
      title: title,
      description: description,
      status: status,
      duration: 6000,
      isClosable: true,
    });
  };
  const [userList, setUserListData] = useState<DropDownOptios[]>([]);
  const [userOption, setUserOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const getUserList = useCallback(async () => {
    const { data, error } = await supabase
      .from("user_data")
      .select("user_index");
    if (!error) {
      setUserListData(data);
    } else {
      console.log(error.message);
    }
  }, []);

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  useEffect(() => {
    let newArrObj = userList.map((obj) => {
      return { label: obj.user_index, value: obj.user_index };
    });
    setUserOption(newArrObj);
  }, [userList]);

  const onFocus = {
    borderColor: "teal",
    boxShadow: "0px 1px 0px 0px teal",
  };

  const deleteUser = async () => {
    if (selectedOption) {
      setLoading(true);

      let id = selectedOption;
      const { error } = await supabase
        .from("cards")
        .update({ available: true })
        .eq("user_index", id);
      if (!error) {
        const response = await supabase
          .from("user_data")
          .delete()
          .eq("user_index", id);
        response.error
          ? toastText("User deletion Failed", error.message, "error")
          : toastText("User Deleted", "User deleted Successfully", "success");
      } else {
        console.log(error);
      }
    }
  };
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Box>
      <Card bg="white" rounded={"15px"} h="100%">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Delete Admin
        </Text>

        <Flex
          h={"100%"}
          alignContent="center"
          flexDirection="column"
          padding={{ sm: "1rem", lg: "3rem" }}
          gap={"1rem"}
          justifyContent="center"
          alignItems={"center"}
        >
          <FormControl flexDirection={"row"} isRequired>
            <FormLabel marginLeft={"0.5rem"}>Username</FormLabel>
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              variant={"outline"}
              fontFamily="'Vollkorn SC', serif"
              fontSize={16}
              _focus={onFocus}
              placeholder="select user index"
              required
            >
              {userOption.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button
            variant={"solid"}
            colorScheme={"teal"}
            maxW={"200px"}
            marginTop={"1rem"}
            onClick={deleteUser}
            isLoading={loading}
          >
            Delete admin
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
