
import {  Box,  SimpleGrid, useColorModeValue } from '@chakra-ui/react';

import CheckTable from 'views/admin/qrecharge/components/QuickRechargeHistory';
import QuickBalance from 'views/admin/qrecharge/components/QuickBalance'

export default function UserReports() {

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <QuickBalance  />
        <CheckTable />
      </SimpleGrid>
    </Box>
  );
}
