import {
  Box,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import MiniCalendar from "components/calendar/MiniCalendar";
import UserRequestData from "views/admin/default/components/UserRequestData";
import UserSuspendData from "views/admin/default/components/UserSuspendData";
import UserDeletion from "views/admin/default/components/UserDeletion";

export default function UserReports() {
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} bg={boxBg}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <UserRequestData />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
        <UserSuspendData />
        <UserDeletion />
      </SimpleGrid>
    </Box>
  );
}
