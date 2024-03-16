import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Image,
  Text,
  Box,
  Grid,
  SimpleGrid,
  Heading,
  GridItem,
  Button,
} from "@chakra-ui/react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Card,
  CardHeader,
  CardBody,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

// import {
//   AlertDialog,
//   AlertDialogBody,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogContent,
//   AlertDialogOverlay,
// } from "@chakra-ui/react";

import { FaMobile } from "react-icons/fa";
import { CiMobile2 } from "react-icons/ci";
import { IoDesktop } from "react-icons/io5";
import { CiDesktop } from "react-icons/ci";
import { PiContactlessPaymentFill } from "react-icons/pi";
import { GrInsecure } from "react-icons/gr";
import { SiSpringsecurity } from "react-icons/si";
import { GiRobberMask } from "react-icons/gi";
import { SiContactlesspayment } from "react-icons/si";
import { MdOutlineSecurity } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrShieldSecurity } from "react-icons/gr";
import { CgMenuLeft } from "react-icons/cg";

const COLOR_SHADE = {
  shade1: "#eae2e1",
  shade2: "#dacccb",
  shade3: "#CAB7B6",
  shade4: "#221e1d",
  shade5: "#4d4544",
};

const features = [
  {
    name: "Mobile Application",
    description:
      "The mobile app allows for easy management of cards and includes features such as balance checking, schedule checking, trip fare, trip history, and user profiles with multi-user capabilities. ",
    icon: FaMobile,
    iconAlt: CiMobile2,
  },
  {
    name: "Admin Panel",
    description:
      "The Admin panel can be used for user management in the metro rail system and other card facilities such as validating user registration requests, quick recharge, and suspending users.",
    icon: IoDesktop,
    iconAlt: CiDesktop,
  },
  {
    name: "Contactless Transaction",
    description:
      "Online transactions through payment gateways enable a fully contactless experience on metro rails, reducing queues, saving time, and increasing security. ",
    icon: PiContactlessPaymentFill,
    iconAlt: SiContactlesspayment,
  },
  {
    name: "Intruder Prevention",
    description:
      "Our system provides real-time updates for each trip, allowing users to receive notifications and block intruders attempting to use the card, effectively stranding them at the station.",
    icon: SiSpringsecurity,
    iconAlt: GiRobberMask,
  },
];

const images = [
  "https://res.cloudinary.com/dtaysapbu/image/upload/f_auto,q_auto/v1/metro/vmd1k7ynn0tpbehjrllk",
  "https://res.cloudinary.com/dtaysapbu/image/upload/f_auto,q_auto/v1/metro/bb58qtfzevwpuk92w4of",
  "https://res.cloudinary.com/dtaysapbu/image/upload/f_auto,q_auto/v1/metro/fkowv4umzm5voosubm6o",
  "https://res.cloudinary.com/dtaysapbu/image/upload/f_auto,q_auto/v1/metro/q8ywxilplyo151v7r0fj",
  "https://res.cloudinary.com/dtaysapbu/image/upload/v1710369656/metro/guzd4bpgnm2hxfulckse.png",
  "https://res.cloudinary.com/dtaysapbu/image/upload/v1710369655/metro/z6oodcqybayia052ufzh.png",
  "https://res.cloudinary.com/dtaysapbu/image/upload/f_auto,q_auto/v1/metro/tfgyjkl8yyr3ygyl3h6o",
  "https://res.cloudinary.com/dtaysapbu/image/upload/f_auto,q_auto/v1/metro/zb7owocelo8qupsfhdce",
  "https://res.cloudinary.com/dtaysapbu/image/upload/f_auto,q_auto/v1/metro/nxnjjjtg1sherbpsrvtn",
];

const adminImages = [
  "https://res.cloudinary.com/dtaysapbu/image/upload/f_auto,q_auto/v1/metro/suno4t3yqzsxvlw26see",
  "https://res.cloudinary.com/dtaysapbu/image/upload/f_auto,q_auto/v1/metro/zjylupmey9vdkhhwbgkt",
  "https://res.cloudinary.com/dtaysapbu/image/upload/f_auto,q_auto/v1/metro/bmc4e9uaov905stihuzr",
  "",
];

const intro = `A Human-Computer Interaction (HCI) system, designed to improve the security and stability of metro rail card monitoring and management. As the current Mass Rapid Transit System (MRTS) has a crucial limitation in that it only allows for making trips, we are here to integrate a Graphical User Interface (GUI) to the system to control and maintain the card from anywhere.`;

const info = `Our system features a centralized data server that seamlessly interacts with various sectors, including metro cards and intuitive GUI applications such as an admin panel and mobile app, ensuring user-friendly experiences. Our focus on contactless transactions drives the deployment of a secure server with a payment gateway for swift balance top-up. Enhanced security measures, including Transparent Data Encryption (TDE) with SHA256 and advanced cipher algorithms, bolster data protection. Intruder prevention algorithms thwart unauthorized access attempts, while data collection and analysis inform the development of a central server for data communication. User management emphasizes authentication and fraud prevention, supported by APIs and a transaction gateway for secure transactions. Integrated testing ensures system reliability, meeting the evolving needs of modern metro rail operations.`;

const frameworks = [
  {
    name: "Programming Language",
    tools: ["TypeScript", "JavaScript", "C++"],
  },
  {
    name: "Mobile Application",
    tools: ["React Native", "Supabase", "CryptoJs", "REST", "ESlint"],
  },
  {
    name: "Backend & Hardware",
    tools: ["NodeJs, PlatformIo, Arduino", "SSLCOMMERZ"],
  },
  {
    name: "Admin Panel",
    tools: ["React", "Supabase", "ChakreUI", "HorizonUI", "EmailJs"],
  },
];

function Home() {
  const [border, setBorder] = useState(false);
  const [position, setPosition] = useState<number>();
  const [windowWidth, setWindowWidth] = useState<number>();
  const [aboutVisible, setAboutVisible] = useState(false);
  const [diagramVisible, setDiagramVisible] = useState(false);
  const [impVisible, setImpVisible] = useState(false);
  const [demoVisible, setDemoVisible] = useState(false);
  const [secuVisible, setSecuVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const navbar = useRef<HTMLDivElement>(null);
  const container1Ref = useRef(null);
  const container2Ref = useRef(null);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    containerRef: React.MutableRefObject<any>
  ) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    containerRef: React.MutableRefObject<any>
  ) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setPosition(position);
  };

  const handleResize = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {

    setNavbarHeight(navbar.current.clientWidth)
    position > 100 ? setBorder(true) : setBorder(false);
    const aboutId = document.getElementById("about");
    const diaId = document.getElementById("diagram");
    const impId = document.getElementById("imp");
    const demoId = document.getElementById("demo");
    const secId = document.getElementById("security");

    position > aboutId.offsetHeight - 500
      ? setAboutVisible(true)
      : setAboutVisible(false);
    position > aboutId.offsetHeight + diaId.offsetHeight
      ? setDiagramVisible(true)
      : setDiagramVisible(false);
    position > aboutId.offsetHeight + impId.offsetHeight
      ? setImpVisible(true)
      : setImpVisible(false);
    position > aboutId.offsetHeight + demoId.offsetHeight
      ? setDemoVisible(true)
      : setDemoVisible(false);

    position > aboutId.offsetHeight + secId.offsetHeight
      ? setSecuVisible(true)
      : setSecuVisible(false);

  }, [position]);

  return (
    <Flex
      id="home"
      backgroundColor={COLOR_SHADE.shade1}
      width={"100vw"}
      minHeight={"100vh"}
      px={{ base: "2rem", lg: "5rem" }}
      py={{ base: "0.5rem", lg: "1.5rem" }}
      gap={{ base: "2rem", lg: "3rem" }}
      flexDirection={"column"}
    >
      {/* <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={() => { }}
        // isOpen={windowWidth < 800 ? true : false}
        isOpen={false}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent backgroundColor={COLOR_SHADE.shade1} w="90%">
          <AlertDialogHeader className="chromate" textTransform={"uppercase"}>
            Viewport Alert!
          </AlertDialogHeader>
          <AlertDialogBody className="aber">
            View this webpage on desktop only
          </AlertDialogBody>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
      {/* 
      <Flex></Flex> */}

      <Flex
        id="navbar"
        w={"100%"}
        backgroundColor="#dacccb"
        borderRadius={"1rem"}
        py="0.8rem"
        px={{ base: "1rem", lg: "2rem" }}
        position={"sticky"}
        top={"15px"}
        zIndex={100}
        border={border ? "1px" : "0px"}
        borderColor={COLOR_SHADE.shade5}
        ref={navbar}
      >
        <Flex id="navbar" flex={1} alignItems="center">
          <Flex display={{ base: "block", lg: "none" }} backgroundColor={COLOR_SHADE.shade3} borderRadius={"0.5rem"}>
            <Menu>
              <MenuButton as={Button} backgroundColor={COLOR_SHADE.shade3} py={"0.3rem"} px={"0.5rem"} height="auto" variant='none' borderRadius={"0.5rem"}>
                <CgMenuLeft color={COLOR_SHADE.shade4} size={20} />
              </MenuButton>
              <MenuList backgroundColor={COLOR_SHADE.shade2} borderColor={COLOR_SHADE.shade5} className="aber" fontSize={16}>
                <MenuItem backgroundColor={COLOR_SHADE.shade2}><a href="#about">About</a></MenuItem>
                <MenuItem backgroundColor={COLOR_SHADE.shade2}><a href="#feature">Features</a></MenuItem>
                <MenuItem backgroundColor={COLOR_SHADE.shade2}><a href="#snapshot">Snapshots</a></MenuItem>
              </MenuList>
            </Menu>
            {/* <CgMenuLeft color={COLOR_SHADE.shade4} size={20} /> */}
          </Flex>

          <Breadcrumb fontWeight="medium" fontSize="md" display={{ base: "none", lg: "flex" }}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {aboutVisible ? (
              <BreadcrumbItem>
                <BreadcrumbLink href="#about">About</BreadcrumbLink>
              </BreadcrumbItem>
            ) : null}
            {aboutVisible && impVisible ? (
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#imp">Implementation</BreadcrumbLink>
              </BreadcrumbItem>
            ) : null}
            {aboutVisible && diagramVisible ? (
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#features">Diagram</BreadcrumbLink>
              </BreadcrumbItem>
            ) : null}

            {aboutVisible && demoVisible ? (
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#demo">Demo</BreadcrumbLink>
              </BreadcrumbItem>
            ) : null}
            {aboutVisible && secuVisible ? (
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#security">Security</BreadcrumbLink>
              </BreadcrumbItem>
            ) : null}
          </Breadcrumb>
        </Flex>
        <Flex
          flex={1}
          gap={"2.5rem"}
          justifyContent={"flex-end"}
          alignItems="center"
        >
          <Link href="#features" display={{ base: "none", lg: "flex" }}>Features</Link>
          <Link href="#snapshot" display={{ base: "none", lg: "flex" }}>Snapshots</Link>
          <Link
            href="https://github.com/dot-ASH/metro-rail-smart-card-system"
            isExternal
            backgroundColor={COLOR_SHADE.shade4}
            py={"0.3rem"}
            px={"1rem"}
            borderRadius={"0.5rem"}
            color={COLOR_SHADE.shade1}
            fontSize={{ base: 14, lg: 16 }}
            whiteSpace="nowrap"
          >
            Source Code
          </Link>
        </Flex>
      </Flex>

      <Grid
        id="hero"
        width={"100%"}
        height="82%"
        backgroundColor={COLOR_SHADE.shade2}
        borderRadius={"1rem"}
        padding={{ base: "2rem", lg: "2.5rem" }}
        gridTemplateColumns={{ base: "100%", lg: "58% 40%" }}
        gap="2rem"
        mt="-0.5rem"
      >
        <Box
          backgroundColor={COLOR_SHADE.shade3}
          borderRadius="1rem"
          width={"100%"}
          height="350px"
          position="relative"
          display={{ base: "block", lg: "none" }}
        >
          <Image
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            src="herro.svg"
            width={"100%"}
            height="70%"
          />
        </Box>
        <Flex flexDirection={"column"} justifyContent="center" padding={{ lg: "1rem" }}>
          <Text
            fontSize={{ base: "16vw", lg: "9vw", "2xl": "11vw" }}
            lineHeight={1.2}
            textAlign={{ base: "center", lg: "left" }}
            className="misto"
            color={COLOR_SHADE.shade4}
          >
            METRO
          </Text>
          <Text
            fontSize={{ base: "20vw", lg: "10vw", "2xl": "13vw" }}
            lineHeight={1.2}
            textAlign={{ base: "center", lg: "right" }}
            className="misto"
            color={COLOR_SHADE.shade4}
          >
            RIDER
          </Text>
          <Text
            fontSize={{ base: "14px", lg: "18px" }}
            textAlign="justify"
            mt={{ base: "1rem", lg: "2rem" }}
            ml={{ lg: "0.5rem" }}
            className="classy-vogue"
          >
            {intro}
          </Text>
        </Flex>
        <Box
          backgroundColor={COLOR_SHADE.shade3}
          borderRadius="1rem"
          width={"100%"}
          height="100%"
          position="relative"
          display={{ base: "none", lg: "block" }}
        >
          <Image
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            src="herro.svg"
            width={"100%"}
            height="70%"
          />
        </Box>
      </Grid>

      <Flex
        id="features"
        mt={{ base: "4rem", lg: "6rem" }}
        flexDirection="column"
        gap={{ base: "2rem", lg: "4rem" }}
        w="100%"
      >
        <Text
          fontSize={{ base: "24px", lg: "32px" }}
          className="chromate"
          textTransform={"uppercase"}
          textAlign={{ base: "center", lg: "left" }}
          color={COLOR_SHADE.shade4}
        >
          Major services that we offer to the mertro rail system
        </Text>
        <SimpleGrid
          spacing={4}
          templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
          w={"100%"}
          gap="4rem"
        >
          {features.map((item, index) => {
            return (
              <Card
                borderRadius={"1rem"}
                padding="1rem"
                backgroundColor={
                  index === 0 || index === 3
                    ? COLOR_SHADE.shade2
                    : COLOR_SHADE.shade4
                }
                key={index}
                color={
                  index === 0 || index === 3
                    ? COLOR_SHADE.shade4
                    : COLOR_SHADE.shade1
                }
                display="Grid"
                gridTemplateColumns={{ base: "100%", lg: "65% 35%" }}
              >
                <Flex position={"relative"} w={"100%"} display={{ base: "flex", lg: "none" }} height={150}>
                  <item.icon
                    size={100}
                    color={
                      index === 0 || index === 3
                        ? COLOR_SHADE.shade3
                        : COLOR_SHADE.shade5
                    }
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      rotate: "-10deg",
                    }}
                  />
                  <item.iconAlt
                    size={100}
                    color={
                      index === 0 || index === 3
                        ? COLOR_SHADE.shade5
                        : COLOR_SHADE.shade3
                    }
                    style={{
                      position: "absolute",
                      top: "60%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      rotate: "10deg",
                    }}
                  />
                </Flex>
                <Box>
                  <CardHeader>
                    <Heading
                      size="md"
                      style={{
                        fontFamily: "Classy Vogue",
                        letterSpacing: "2px",
                      }}
                      fontSize={28}
                      textTransform="uppercase"
                    >
                      {item.name}
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text className="aber" fontWeight={400} fontSize={{ base: 14, lg: 16 }}>
                      {item.description}
                    </Text>
                  </CardBody>
                </Box>
                <Flex position={"relative"} w={"100%"} display={{ base: "none", lg: "flex" }}>
                  <item.icon
                    size={120}
                    color={
                      index === 0 || index === 3
                        ? COLOR_SHADE.shade3
                        : COLOR_SHADE.shade5
                    }
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      rotate: "-10deg",
                    }}
                  />
                  <item.iconAlt
                    size={120}
                    color={
                      index === 0 || index === 3
                        ? COLOR_SHADE.shade5
                        : COLOR_SHADE.shade3
                    }
                    style={{
                      position: "absolute",
                      top: "60%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      rotate: "10deg",
                    }}
                  />
                </Flex>
              </Card>
            );
          })}
        </SimpleGrid>
      </Flex>

      <Grid
        id="snapshot"
        mt={{ base: "3rem", lg: "7rem" }}
        templateRows={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        gap={{ base: "3rem", lg: "7rem" }}
        w={"100%"}
      // overflow={{ base: "hidden", lg: "auto" }}
      >
        <Text display={{ base: "block", lg: "none" }} className="chromate" fontSize={24}
          color={COLOR_SHADE.shade4} textAlign="center"
          width={"90vw"}
        >SNAPSHOTS</Text>
        <Flex gap={"3rem"} alignItems="center" w={{ base: navbarHeight, lg: "100%" }} >

          <Flex
            flexDirection={"column"}
            justifyContent="space-between"
            w={"25%"}
            display={{ base: "none", lg: "flex" }}
          >

            <Text fontSize={92} className="margaret" color={COLOR_SHADE.shade4}>
              TAKE
            </Text>
            <Text
              fontSize={92}
              textAlign="center"
              className="margaret"
              color={COLOR_SHADE.shade4}
            >
              A
            </Text>
            <Text
              fontSize={92}
              textAlign="right"
              className="margaret"
              color={COLOR_SHADE.shade4}
            >
              PEEK
            </Text>
            <Text
              className="classy-vogue"
              fontSize={"2vw"}
              textAlign="right"
              color={COLOR_SHADE.shade4}
              opacity={0.5}
              whiteSpace="nowrap"
              letterSpacing={1.5}
            >
              Mobile Application
            </Text>
          </Flex>
          <Flex
            padding={{ lg: "2rem" }}
            w={"100%"}
            h={"100%"}
            backgroundColor={COLOR_SHADE.shade2}
            borderRadius="1rem"
          >
            <Box padding={"1rem"} overflow="hidden" borderRadius="1rem" py="1rem" >
              <Flex
                gap={"2.5rem"}
                overflowX="scroll"
                w={"100%"}
                backgroundColor={COLOR_SHADE.shade2}
                borderRadius="1rem"
                ref={container1Ref}
                className="draggable-scroll"
                onMouseDown={(e) => handleMouseDown(e, container1Ref)}
                onMouseMove={(e) => handleMouseMove(e, container1Ref)}
                onMouseUp={handleMouseUp}
              >
                {images.map((image, index) => {
                  return (
                    <Image
                      key={index}
                      src={image}
                      height={"25rem"}
                      borderRadius={"1rem"}
                    />
                  );
                })}
              </Flex>
            </Box>
          </Flex>
        </Flex>

        <Flex gap={"3rem"} alignItems="center" w={{ base: navbarHeight, lg: "100%" }}>
          <Flex
            px={{ base: "1rem", lg: "2rem" }}
            w={"100%"}
            h={"100%"}
            backgroundColor={COLOR_SHADE.shade2}
            borderRadius="1rem"
            py="1rem"
          >
            <Flex overflow="hidden" borderRadius="1rem">
              <Flex
                height={"auto"}
                borderRadius="1rem"
                gap={"1rem"}
                overflowX="scroll"
                ref={container2Ref}
                className="draggable-scroll"
                onMouseDown={(e) => handleMouseDown(e, container2Ref)}
                onMouseMove={(e) => handleMouseMove(e, container2Ref)}
                onMouseUp={handleMouseUp}
                alignItems="center"
              >
                {adminImages.map((image, key) => {
                  return (
                    <Image
                      src={image}
                      height={{ base: "auto", lg: "24rem" }}
                      borderRadius={"1rem"}
                      key={key}
                      objectFit={"contain"}
                    />
                  );
                })}
              </Flex>
            </Flex>
          </Flex>

          <Flex
            flexDirection={"column"}
            justifyContent="space-between"
            w={"25%"}
            display={{ base: "none", lg: "flex" }}
          >
            <Text
              fontSize={92}
              textAlign="right"
              className="margaret"
              color={COLOR_SHADE.shade4}
            >
              TAKE
            </Text>
            <Text
              fontSize={92}
              textAlign="center"
              className="margaret"
              color={COLOR_SHADE.shade4}
            >
              A
            </Text>
            <Text fontSize={92} className="margaret" color={COLOR_SHADE.shade4}>
              PEEK
            </Text>
            <Text
              className="classy-vogue"
              fontSize={"2vw"}
              textAlign="left"
              color={COLOR_SHADE.shade4}
              opacity={0.5}
              whiteSpace="nowrap"
              letterSpacing={1.5}
            >
              Admin Panel
            </Text>
          </Flex>
        </Flex>
      </Grid >

      <Flex id="about" flexDirection={"column"} mt={{ base: "4rem", lg: "7rem" }}>
        <Flex
          id="imp"
          backgroundColor={COLOR_SHADE.shade2}
          borderRadius={"1rem"}
          px="1.5rem"
          py="2rem"
          flexDirection={{ base: "column", lg: "row" }}
          gap={{ base: "3rem", lg: "0rem" }}
        >
          <Flex
            backgroundColor={COLOR_SHADE.shade3}
            borderRadius="1rem"
            borderWidth={"0px"}
            minWidth={"30%"}
            overflow="hidden"
            flexDirection={"column"}

          >
            <Text
              className="chromate"
              fontSize={{ base: 28, lg: 32 }}
              mx={"1.5rem"}
              my="1rem"
              color={COLOR_SHADE.shade4}
            >
              Frameworks & Tools
            </Text>
            <Accordion w="100%">
              {frameworks.map((framework, key) => {
                return (
                  <AccordionItem
                    borderTopWidth={"0px"}
                    style={{ borderBottomWidth: "0px" }}
                    key={key}
                    w="100%"
                  >
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          className="classy-vogue"
                          padding={"0.5rem"}
                          textTransform="uppercase"
                          fontSize={{ base: 16, lg: 20 }}
                        >
                          {framework.name}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      pb={4}
                      px={"1.5rem"}
                      display="flex"
                      gap={"0.5rem"}
                      flexWrap="wrap"
                    >
                      {framework.tools.map((tool, key) => {
                        return (
                          <Text className="aber" key={key}>
                            {`${tool}${key < framework.tools.length - 1 ? "," : ""
                              }`}
                          </Text>
                        );
                      })}
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Flex>
          <Flex className="aber" flexDirection="column" px={{ base: "1rem", lg: "3rem" }} gap="1rem">
            <Text className="chromate" fontSize={{ base: 32, lg: 62 }} color={COLOR_SHADE.shade4}>
              WHAT'S THIS ALL ABOUT
            </Text>
            <Text fontSize={{ base: 14, lg: 16 }}>{info}</Text>
            <Text fontWeight={800} fontSize={{ base: 14, lg: 16 }}>
              The data flow (on the left) and the ER diagram (on the right) are
              shown below!
            </Text>
          </Flex>
        </Flex>
        <Flex id="diagram" mt={{ base: "3rem", lg: "8rem" }}>
          <Grid templateColumns={{ base: "100%", lg: "repeat(2, 1fr)" }} gap={"3rem"}>
            <Box>
              <Image src="payment.png" />
            </Box>
            <Flex
              backgroundColor={"#181818"}
              borderRadius={"0.7rem"}
              overflow="hidden"
            >
              <Image src="supabase.png" objectFit={"contain"} />
            </Flex>
          </Grid>
        </Flex>

        <Flex id="demo" mt={{ base: "5rem", lg: "10rem" }} gap={"4rem"} w={"100%"} flexDirection={{ base: "column", lg: "row" }}>
          <Flex
            justifyContent="space-between"
            flexDirection={"column"}
            w={{ base: "100%", lg: "35%" }}
            gap={"3rem"}
          >
            <Text
              fontSize={{ base: "8vw", lg: "4vw", "2xl": "7vw" }}
              lineHeight={1}
              className="margaret"
              whiteSpace={{ sm: "nowrap", "2xl": "normal" }}
              color={COLOR_SHADE.shade4}
              textAlign={{ base: "center", lg: "left" }}
            >
              VIDEO DEMO
            </Text>
            <Flex
              backgroundColor={COLOR_SHADE.shade2}
              borderRadius={"1rem"}
              padding={"1rem"}
              height="100%"
              justifyContent={"center"}
              alignItems="center"
            >
              <Text textAlign={"justify"} className="aber" px="1rem" fontSize={{ base: 14, lg: 16 }}>
                The primary objective of our system is to conduct in-depth
                research aimed at enhancing the security and stability of
                metro rail operations. While the core focus remains on
                advancing these critical aspects, an application has been
                developed to showcase the system's capabilities.
                <b> The video serves as a compelling demonstration, </b>
                highlighting the interaciton usage and efficiency of our
                innovative system in action.
              </Text>
            </Flex>
          </Flex>

          <Flex grow={1}>
            <video
              height="100%"
              preload="auto"
              style={{ borderRadius: "1rem" }}
              muted
              autoPlay={true}
              loop={true}
              playsInline
            >
              <source
                src={
                  "https://res.cloudinary.com/dtaysapbu/video/upload/v1710315309/metro/rzn6gfziy951mndmctsc.mp4"
                }
                type="video/mp4"
                className="aber"
                style={{ borderRadius: "1rem" }}
              />
              Your browser does not support the video tag.
            </video>
          </Flex>
        </Flex>

        <Flex id="security" mt={{ base: "3rem", lg: "6rem" }}>
          <Grid
            templateColumns={{ base: "100%", lg: "repeat(2, 1fr)" }}
            rowGap={"3rem"}
            columnGap="4rem"
          >
            <Flex alignItems={"center"} justifyContent="flex-start" display={{ base: "none", lg: "flex" }}>
              <Image
                src="block.png"
                borderRadius={"2rem"}
                width={"100%"}
                height="auto"
                objectFit="contain"
              ></Image>
            </Flex>
            <Flex alignContent={"center"} justifyContent="center" w={"100%"}>
              <Text
                fontSize={{ base: "8vw", lg: "13vw" }}
                mt={"1rem"}
                className="chromate"
                color={COLOR_SHADE.shade4}
                textAlign={{ base: "center", lg: "left" }}
              >
                SECURITY
              </Text>
            </Flex>
            <GridItem
              colSpan={2}
              display={"flex"}
              flexDirection={{ sm: "column", "2xl": "row" }}
              alignItems="center"
              backgroundColor={COLOR_SHADE.shade2}
              borderRadius="1rem"
              padding={{ base: "1rem", lg: "2rem" }}
              gap={{ base: "2rem", lg: "4rem" }}
              w={{ base: navbarHeight, lg: "100%" }}
            >
              <Flex
                backgroundColor={{ lg: COLOR_SHADE.shade3 }}
                borderRadius="1rem"
                padding={{ base: "1rem", lg: "2rem" }}
                className="aber"
                height={"100%"}
                flexDirection="column"
                gap={{ base: "1rem", lg: "2rem" }}

              >
                <Flex flexDirection={{ base: "column", lg: "row" }} gap={"2rem"} >
                  <Text
                    style={{ writingMode: "vertical-lr" }}
                    fontSize={{ sm: "30px", "2xl": "42px" }}
                    className="chromate"
                    ml={{ lg: "-1rem" }}
                    color={COLOR_SHADE.shade4}
                    display={{ base: "none", lg: "block" }}
                  >
                    STRIDE
                  </Text>
                  <Text fontSize={{ base: 14, lg: 16 }}>
                    To prevent the security vulnerabilities, we used{" "}
                    <b>
                      Spoofing, Tampering, Repudiation, Information Dis-
                      closure, Denial of service and Elevation of privilege
                      (STRIDE) threat model.
                    </b>
                    Our system ensures secure authentication, encryption, and
                    transparent user data handling. With multi-factor
                    authentication (MFA) and role-based access control (RBAC),
                    we safeguard passenger information and financial data,
                    adding an extra layer of protection during travel.
                  </Text>
                </Flex>
                <Flex flexDirection={{ base: "column", lg: "row" }} gap="3rem" >
                  <Flex
                    textAlign={"justify"}
                    flexDirection="column"
                    gap={"1rem"}

                  >
                    <Flex gap={"0.5rem"} justifyContent="space-between" >
                      <MdOutlineSecurity />
                      <GrInsecure />
                      <GrShieldSecurity />
                      <RiSecurePaymentLine />
                      <GrInsecure />
                      <GrShieldSecurity />
                      <RiSecurePaymentLine />
                      <MdOutlineSecurity />
                    </Flex>
                    <Text fontSize={{ base: 14, lg: 16 }}>
                      We categorized data on the scale of sensitivity and
                      confidentiality of the data. We used one-way or two-way
                      function cryptography depending on the risk of the data
                      getting hacked or breached.
                    </Text>
                  </Flex>
                  <ul>
                    <li style={{ textAlign: "justify", fontSize: windowWidth < 600 ? 14 : 16 }}>
                      <b>SHA256: </b>
                      SHAH256 algorithm was used to encrypt the more sensitive
                      data such as authentication and transaction data across
                      our system.
                    </li>
                    <li style={{ textAlign: "justify", fontSize: windowWidth < 600 ? 14 : 16 }}>
                      <b>Enhanced cipher hashing: </b> We used cipher hashing
                      but with an additional layer to encrypt less sensitive
                      data such as user basic data, admin data, nodeMCU number,
                      etc. This extra layer enables the two-way activities of
                      the algorithm and allows the data to function across
                      multiple platforms, including mobile software, card
                      hardware, and web cloud.
                    </li>
                  </ul>
                </Flex>
              </Flex>
              <Flex justifyContent={"flex-end"}>
                <Image src="flow.png" maxWidth={{ base: 300, lg: 750 }} />
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
      <Flex
        id="footer"
        backgroundColor={COLOR_SHADE.shade4}
        borderRadius="1rem"
        gap={"1rem"}
        color={COLOR_SHADE.shade2}
        padding="1rem"
        mt={{ base: "1rem", lg: "3rem" }}
        minHeight={{ lg: 350 }}
        className="aber"
        justifyContent={{ base: "center", lg: "space-around" }}
        alignItems={{ base: "center", lg: "flex-end" }}
        px={{ base: "2rem", lg: "4rem", "2xl": "6rem" }}
        py={{ base: "3rem", lg: "5rem" }}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Flex>
          <Text
            fontSize={{ base: "24px", lg: "32px" }}
            lineHeight={1.2}
            textAlign="left"
            className="misto"
          >
            METRO_
          </Text>
          <Text
            fontSize={{ base: "24px", lg: "32px" }}
            lineHeight={1.2}
            textAlign="right"
            className="misto"
          >
            RIDER
          </Text>
        </Flex>
        <Flex flexDirection={"column"} gap="1rem" fontSize={{ base: 14, lg: 18 }} justifyContent={{ base: "center" }} alignItems={{ base: "center" }}>
          <Link
            href="https://github.com/dot-ASH/metro-rail-smart-card-system"
            isExternal
          >
            Source Code(Github)
          </Link>
          <Link href="https://sakirashker.vercel.app" isExternal>
            Developed By Sakir Ashker
          </Link>
          <Text>@2024 all right reserved</Text>
        </Flex>
        <Flex flexDirection={{ base: "row", lg: "column" }} gap="1rem" fontSize={{ base: 14, lg: 18 }}>
          <Link href="features">Feature</Link>
          <Link href="Snapshots">Snapshots</Link>
          <Link href="#about">About</Link>
          <Link href="#" display={{ base: "none", lg: "block" }}>Back To Top</Link>
        </Flex>
      </Flex>
    </Flex >
  );
}

export default Home;
