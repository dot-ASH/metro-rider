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
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
// Custom components
import Card from "components/card/Card";
import { useState, useEffect } from "react";
// Assets
import supabase from "data/supabase";
import moment from "moment";

type RowObj = {
  user_index: number;
  reason: string;
  created_at: string;
};

type BlockData = {
  user_index?: string;
  reason?: string;
};

export default function ComplexTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableData, setTableData] = useState<RowObj[]>([]);
  const [refresh, setRefresh] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const columnHelper = createColumnHelper<RowObj>();
  const [blockData, setBlockData] = useState<BlockData>({
    user_index: "",
    reason: "",
  });
  const toast = useToast();

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

  async function fetchSuspend() {
    try {
      const { data } = await supabase
        .from("suspend")
        .select("user_index, reason, created_at");
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
    fetchSuspend();
  }, [refresh]);

  const dataFormat = (date: string) => {
    const dateObject = moment(date);
    const formattedDate = dateObject.format("MMM DD, YYYY h:mm:ss A");
    return formattedDate;
  };

  const unBLocked = async (user_index: number) => {
    const { error } = await supabase
      .from("suspend")
      .delete()
      .eq("user_index", user_index);
    refreshFunc();
    if (error) {
      console.log(error);
    }
  };

  const columns = [
    columnHelper.accessor("user_index", {
      id: "user_index",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          USER
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            #{info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("reason", {
      id: "reason",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          REASON
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
    columnHelper.accessor("user_index", {
      id: "block",
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
      cell: (info) => (
        <Button
          variant="ghost"
          onClick={() => unBLocked(info.getValue())}
          ml="-1rem"
        >
          <Text color="#d74a49" fontSize="md" fontWeight="700">
            unblock
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

  const blockEm = async () => {
    const USER_REG = /^\d{9}$/;
    let error = "";
    if (
      !blockData.user_index ||
      !USER_REG.test(blockData.user_index.toString())
    ) {
      error = "Invalid User Index";
    } else if (!blockData.reason) {
      error = "Give a Reason";
    }

    if (error) {
      toastText("You have error", error, "error");
    } else {
      const respose = await supabase
        .from("suspend")
        .insert({ user_index: blockData.user_index, reason: blockData.reason });
      if (respose.error) {
        if (respose.error.message.includes("violates foreign key constraint")) {
          toastText("You have error", "No user on that user_index", "warning");
        } else if (respose.error.message.includes("duplicate")) {
          toastText("You have error", "He/She is already blocked", "error");
        } else {
          toastText("You have error", respose.error.message, "error");
        }
      } else {
        setBlockData({ user_index: "", reason: "" });
        toastText(
          "Suspension successful",
          `user${blockData.user_index} is blocked`,
          "info"
        );
        refreshFunc();
      }
    }
  };

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      minHeight={300}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Suspended User
        </Text>
      </Flex>
      <Box
        maxHeight={300}
        width={"100%"}
        overflow={"scroll"}
        display="flex"
        flexDirection={"column"}
        gap={50}
      >
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
            <Text>No Records Found!</Text>
          </Flex>
        )}
      </Box>
      <Flex
        position={"absolute"}
        bottom={0}
        w={"100%"}
        px={5}
        py={3}
        boxShadow={"0px 7px 10px teal"}
        bg={"whiteAlpha"}
        rounded={10}
      >
        <Flex gap={"1rem"} alignItems={"center"}>
          <Text minW={20}>User Index:</Text>
          <Input
            required
            type={"number"}
            focusBorderColor={"#78938a"}
            width={"70%"}
            p={1}
            value={blockData.user_index}
            onChange={(event) =>
              setBlockData({
                user_index: event.target.value,
                reason: blockData?.reason,
              })
            }
          />
          <label>Reason:</label>
          <Input
            required
            focusBorderColor={"#78938a"}
            p={1}
            value={blockData.reason}
            onChange={(event) =>
              setBlockData({
                user_index: blockData?.user_index,
                reason: event.target.value,
              })
            }
          />
          <Button
            variant={"outline"}
            px={8}
            rounded={10}
            colorScheme={"teal"}
            onClick={blockEm}
          >
            Block
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
