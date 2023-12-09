import {
  Box,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  FormControl,
  Select
} from "@chakra-ui/react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  MdCancel,
  MdCheckCircle,
  MdDelete,
  MdErrorOutline,
} from "react-icons/md";
import { PiHourglassHighBold } from "react-icons/pi";
import supabase from "data/supabase";
import moment from "moment";
import Chance from "chance";
import { aesHashDecrypt, aesHashEncrypt, sha256HashPin } from "security/encrypt";
import sendmail from "data/sendmail";

type RowObj = {
  name: string;
  email: string;
  created_at: string;
  status: string;
  nid: string;
  approved: boolean;
  phn_no: string;
};

interface DropDownOptios {
  tag_id: number;
}

export default function ComplexTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableData, setTableData] = useState<RowObj[]>([]);
  const [refresh, setRefresh] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const columnHelper = createColumnHelper<RowObj>();
  const chance = new Chance();
  const toast = useToast();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhn, setUserPhn] = useState<string>("");
  const [userNid, setUserNid] = useState<string>("");
  const [userRfid, setRfidTag] = useState<number | null>();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState<DropDownOptios[]>([]);
  const [cardOption, setCardOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState("choose your tag");


  const getCardData = useCallback(async () => {
    const { data, error } = await supabase
      .from("cards")
      .select("tag_id")
      .eq("available", true)
    if (!error) {
      setCardData(data);
    } else {
      console.log(error.message);
    }
  }, []);

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    getCardData();
  }, [getCardData]);

  useEffect(() => {
    if (cardData) {
      setLoading(false);
      let newArrObj = cardData.map((obj) => {
        return { label: obj.tag_id, value: obj.tag_id };
      });
      setCardOption(newArrObj);
    } else {
      setLoading(true);
    }
  }, [cardData]);

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

  async function fetchReq() {
    try {
      const { data } = await supabase
        .from("user")
        .select("name, email, status, created_at, nid, approved, phn_no")
        .eq("approved", false);
      if (data) {
        setTableData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const refreshFunc = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    fetchReq();
  }, [refresh]);

  const dataFormat = (date: string) => {
    const dateObject = moment(date);
    const formattedDate = dateObject.format("MMM DD, YYYY h:mm:ss A");
    return formattedDate;
  };

  const onModalOpen = (email: string, phone: string, nid: string) => {
    setUserEmail(email);
    setUserPhn(phone);
    setUserNid(nid);
    onOpen();
  }

  const onModalClose = () => {
    setUserEmail("");
    setUserPhn("");
    setUserNid("");
    onClose();
  }

  const approve = async (email: string, phone: string, nid: string) => {
    setLoading(true);
    let hasMember = false;
    let randomInt = chance.integer({ min: 10000, max: 99999 });
    let userInt = chance.integer({ min: 100000000, max: 999999999 });
    let secureNum = sha256HashPin(randomInt.toString());

    const { data } = await supabase.from("user_data").select("verify_pin").eq("phn_no", phone);

    if (data.length > 0) {
      hasMember = true;
      secureNum = data[0].verify_pin;
    }

    const { error: userUpdateError } = await supabase
      .from("user")
      .update({
        approved: true,
        status: "approved",
      })
      .eq("nid", nid);

    if (userUpdateError) {
      console.log("Error adding user: ", userUpdateError);
      return;
    }

    const { error: userDataInsertError } = await supabase
      .from("user_data")
      .insert({
        user_index: userInt,
        verify_pin: secureNum,
        phn_no: phone,
        nid: nid,
      });

    if (userDataInsertError) {
      console.log("Error inserting user data: ", userDataInsertError);
      return;
    }

    const { error: cardsUpdateError } = await supabase
      .from("cards")
      .update({ user_index: userInt, available: false })
      .eq('tag_id', selectedOption);


    if (cardsUpdateError) {
      console.log("Error updating cards: ", cardsUpdateError);
      return;
    }

    const mailPin = hasMember ? "use same pin for both user" : String(randomInt);
    sendmail({ email: email, pin: mailPin });
    toastText(
      "Request accepted",
      `You have accepted the user: #${userInt}'s registration`,
      "success"
    );
    setSelectedOption("");
    onClose();
    refreshFunc();
    setLoading(false);
  };

  const reject = async (email: string) => {
    const { error } = await supabase
      .from("user")
      .update({ status: "rejected" })
      .eq("email", email);
    refreshFunc();
    if (error) {
      console.log(error);
    }
  };

  const deleteRecord = async (email: string) => {
    const { error } = await supabase.from("user").delete().eq("email", email);
    refreshFunc();
    if (error) {
      console.log(error);
    }
  };

  const onFocus = {
    borderColor: "teal",
    boxShadow: "0px 1px 0px 0px teal",
  };

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          NAME
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          EMAIL
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("nid", {
      id: "nid",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          NID NUMBER
        </Text>
      ),
      cell: (info) => (
        <Text
          color={textColor}
          fontSize="sm"
          fontWeight="700"
          bg="#F4F7FE"
          rounded="1rem"
          p="0.6rem"
          px="1rem"
        >
          {aesHashDecrypt(info.getValue())}
        </Text>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          STATUS
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Icon
            w="24px"
            h="24px"
            me="5px"
            color={
              info.getValue() === "approved"
                ? "green.500"
                : info.getValue() === "pending"
                  ? "orange.500"
                  : info.getValue() === "rejected"
                    ? "red.500"
                    : null
            }
            as={
              info.getValue() === "approved"
                ? MdCheckCircle
                : info.getValue() === "pending"
                  ? PiHourglassHighBold
                  : info.getValue() === "rejected"
                    ? MdErrorOutline
                    : null
            }
          />
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("created_at", {
      id: "created_at",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          DATE
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {dataFormat(info.getValue())}
        </Text>
      ),
    }),
    columnHelper.accessor("email", {
      id: "approve",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          ACTION
        </Text>
      ),
      cell: (info) =>
        info.cell.row.original.status === "pending" ? (
          <Flex gap="1rem">
            <Button
              variant="ghost"
              gap="1rem"
              ml="-1rem"
              onClick={() =>
                onModalOpen(
                  info.getValue(),
                  info.cell.row.original.phn_no,
                  info.cell.row.original.nid
                )
              }
            >
              <Icon
                w="24px"
                h="24px"
                me="5px"
                as={MdCheckCircle}
                color="green.500"
                size="24"
              />
              <Text color={textColor} fontSize="sm" fontWeight="700">
                Accept
              </Text>
            </Button>
            <Button
              variant="ghost"
              gap="1rem"
              onClick={() => reject(info.getValue())}
            >
              <Icon
                w="24px"
                h="24px"
                me="5px"
                as={MdCancel}
                color="red.500"
                size="24"
              />
              <Text color={textColor} fontSize="sm" fontWeight="700">
                Reject
              </Text>
            </Button>
          </Flex>
        ) : (
          <Button
            variant="ghost"
            gap="0.5rem"
            onClick={() => deleteRecord(info.getValue())}
            ml="-1rem"
          >
            <Icon
              w="24px"
              h="24px"
              me="5px"
              as={MdDelete}
              color="red.500"
              size="24"
            />
            <Text color={textColor} fontSize="sm" fontWeight="700">
              Delete
            </Text>
          </Button>
        ),
    }),
  ];
  const [data, setData] = useState(() => [...tableData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Attach a card to the user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Card Id</FormLabel>
              <Select
                value={selectedOption}
                onChange={handleSelectChange}
                variant={"outline"}
                fontFamily="'Vollkorn SC', serif"
                fontSize={18}
                _focus={onFocus}
                placeholder="select a tag"
                required
              >
                {cardOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={() => approve(userEmail, userPhn, userNid)} isLoading={loading}>
              Save
            </Button>
            <Button onClick={onModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Card
        flexDirection="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
        minHeight={280}
      >
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            User Registration Request
          </Text>
          <Menu />
        </Flex>
        <Box maxHeight={"330px"}>
          {table.getRowModel().rows.length > 0 ? (
            <Table variant="simple" color="gray.500" mb="24px" mt="12px">
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <Th
                          key={header.id}
                          colSpan={header.colSpan}
                          pe="10px"
                          borderColor={borderColor}
                          cursor="pointer"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <Flex
                            justifyContent="space-between"
                            align="center"
                            fontSize={{ sm: "10px", lg: "12px" }}
                            color="gray.400"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: "",
                              desc: "",
                            }[header.column.getIsSorted() as string] ?? null}
                          </Flex>
                        </Th>
                      );
                    })}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <Tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <Td
                            key={cell.id}
                            fontSize={{ sm: "14px" }}
                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                            borderColor="transparent"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          ) : (
            <Flex justifyContent="center" m="2rem">
              <Text color="">No Records Found!</Text>
            </Flex>
          )}
        </Box>
      </Card>
    </>
  );
}
