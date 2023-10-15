import { Avatar, Box, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";

export default function Banner(props: {
  banner: string;
  avatar: string;
  name: string;
  position: string;
}) {
  const { banner, avatar, name, position } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Card mb={{ base: "0px", lg: "10px" }} alignItems="center">
      <Box
        bg={`url(${banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="131px"
        w="100%"
      />
      <Avatar
        mx="auto"
        src={avatar}
        h="87px"
        w="87px"
        mt="-43px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize="sm">
        {position}
      </Text>
    </Card>
  );
}
