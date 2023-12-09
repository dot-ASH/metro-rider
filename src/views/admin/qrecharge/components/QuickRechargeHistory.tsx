import { Flex, Box, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { useState, useEffect, useCallback } from 'react';
// Custom components
import Card from 'components/card/Card';
import supabase from 'data/supabase';
import moment from 'moment';

type transType = {
  transId: string,
  amount: number,
}

type adminType = {
  name: string
}

type RowObj = {
  transId: string;
  admin_name: string;
  amount: number;
  date: string;
};

const columnHelper = createColumnHelper<RowObj>();

export default function CheckTable() {
  const [quickData, setQuickData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const [loading, setLoading] = useState(false);

  const getQuickData = useCallback(async () => {
    const { data, error } = await supabase.from('quick_recharge').select('transId(transId, amount), admin_id(name), created_at');
    if (!error) {
      setQuickData(data);
    } else {
      console.log(error.message);
    }
  }, [])

  const dataFormat = (date: string) => {
    const dateObject = moment(date);
    const formattedDate = dateObject.format("MMM DD, YYYY h:mm:ss A");
    return formattedDate;
  };

  useEffect(() => {
    getQuickData();
  }, [getQuickData]);

  useEffect(() => {
    if (quickData) {
      setLoading(false);
      let newArrObj = quickData.map((obj) => {
        return { transId: obj.transId.transId, admin_name: obj.admin_id.name, amount: obj.transId.amount, date: obj.created_at };
      });
      setTableData(newArrObj);
    } else {
      setLoading(true);
    }
  }, [quickData]);


  const columns = [
    columnHelper.accessor('transId', {
      id: 'transId',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          TRANSACTION_ID
        </Text>
      ),
      cell: (info: any) => (
        <Flex align='center'>
          <Text color={textColor} fontSize='sm' fontWeight='700'>
            {info.getValue()}
          </Text>
        </Flex>
      )
    }),
    columnHelper.accessor('admin_name', {
      id: 'admin_name',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          HANLDED_BY
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='700'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('amount', {
      id: 'amount',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          AMOUNT
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='700'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          DATE
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='700'>
          {dataFormat(info.getValue())}
        </Text>
      )
    })
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true
  });
  return (
    <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' py='3'>
         Quick Recharge History 
        </Text>
      </Flex>
      <Box>
        <Table variant='simple' color='gray.500' mb='24px' mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe='10px'
                      borderColor={borderColor}
                      cursor='pointer'
                      onClick={header.column.getToggleSortingHandler()}>
                      <Flex
                        justifyContent='space-between'
                        align='center'
                        fontSize={{ sm: '10px', lg: '12px' }}
                        color='gray.400'>
                        {flexRender(header.column.columnDef.header, header.getContext())}{{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.slice(0, 5).map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id}
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor='transparent'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
} 
