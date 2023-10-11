// Chakra imports
import { Flex, Image } from "@chakra-ui/react";

// Custom components
import logo from "../../../assets/img/logo.png";

export function SidebarBrand() {
  return (
    <Flex alignItems="center" flexDirection="column">
      <Image src={logo} width="80px" mr={10} my={8} />
    </Flex>
  );
}

export default SidebarBrand;
