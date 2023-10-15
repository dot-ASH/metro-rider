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
import Menu from "components/menu/MainMenu";
import { useState, useEffect } from "react";
// Assets
import supabase from "data/supabase";
import moment from "moment";

type RowObj = {
  user_index: number;
  reason: string;
  created_at: string;
};

export default function ComplexTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableData, setTableData] = useState<RowObj[]>([]);
  const [refresh, setRefresh] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const columnHelper = createColumnHelper<RowObj>();

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
          ml='-1rem'
        >
          <Text color="#d74a49" fontSize="md" fontWeight="700">
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
              {table
                .getRowModel()
                .rows
                .map((row) => {
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
    </Card>
  );
}
