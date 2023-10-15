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
import { useState, useEffect } from "react";
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
import { sha256HashPin } from "security/encrypt";
// import sendmail from "data/sendmail";

type RowObj = {
  name: string;
  email: string;
  created_at: string;
  status: string;
  nid: string;
  approved: boolean;
  phn_no: string;
};

export default function ComplexTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableData, setTableData] = useState<RowObj[]>([]);
  const [refresh, setRefresh] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const columnHelper = createColumnHelper<RowObj>();
  // const RESEND_KEY = process.env.REACT_APP_RESEND_API_KEY;
  const chance = new Chance();

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

  const approve = async (email: string, phone: string) => {
    let randomInt = chance.integer({ min: 10000, max: 99999 });
    let userInt = chance.integer({ min: 100000000, max: 999999999 });
    let secureNum = sha256HashPin(randomInt.toString());

    const { error } = await supabase
      .from("user")
      .update({
        approved: true,
        nid: null,
        status: "approved",
      })
      .eq("email", email);

    if (error) {
      console.log(error);
    } else {
      const { error } = await supabase
        .from("user_data")
        .insert({ user_index: userInt, verify_pin: secureNum, phn_no: phone })
        .eq("email", email);
      if (!error) {
        // sendmail(email, randomInt);
        refreshFunc();
      }
    }
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
          {info.getValue()}
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
                : undefined
            }
            as={
              info.getValue() === "approved"
                ? MdCheckCircle
                : info.getValue() === "pending"
                ? PiHourglassHighBold
                : info.getValue() === "rejected"
                ? MdErrorOutline
                : undefined
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
                approve(info.getValue(), info.cell.row.original.phn_no)
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
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      // maxHeight={"400px"}
      mt="10"
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
  );
}
