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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

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

  const cancelRef = useRef();
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
      px={{ base: "1rem", sm: "3rem", lg: "5rem" }}
      py={"1.5rem"}
      gap="2rem"
      flexDirection={"column"}
      overflowY={{ base: "hidden", sm: "auto" }}
    >
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={() => {}}
        isOpen={windowWidth < 800 ? true : false}
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
      </AlertDialog>

      <Flex
        id="navbar"
        w={"100%"}
        backgroundColor="#dacccb"
        borderRadius={"1rem"}
        py="0.8rem"
        px="2rem"
        position={"sticky"}
        top={"15px"}
        zIndex={100}
        border={border ? "1px" : "0px"}
        borderColor={COLOR_SHADE.shade5}
      >
        <Flex id="navbar" flex={1} alignItems="center">
          <Breadcrumb fontWeight="medium" fontSize="md">
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
          <Link href="#features">Features</Link>
          <Link href="#snapshot">Snapshots</Link>
          <Link
            href="https://github.com/dot-ASH/metro-rail-smart-card-system"
            isExternal
            backgroundColor={COLOR_SHADE.shade4}
            py={"0.3rem"}
            px={"1rem"}
            borderRadius={"0.5rem"}
            color={COLOR_SHADE.shade1}
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
        padding={"2.5rem"}
        gridTemplateColumns={"58% 40%"}
        gap="2rem"
        mt="0.5rem"
      >
        <Flex flexDirection={"column"} justifyContent="center" padding={"1rem"}>
          <Text
            fontSize={{ sm: "9vw", "2xl": "11vw" }}
            lineHeight={1.2}
            textAlign="left"
            className="misto"
            color={COLOR_SHADE.shade4}
          >
            METRO
          </Text>
          <Text
            fontSize={{ sm: "10vw", "2xl": "13vw" }}
            lineHeight={1.2}
            textAlign="right"
            className="misto"
            color={COLOR_SHADE.shade4}
          >
            RIDER
          </Text>
          <Text
            fontSize={"18px"}
            textAlign="justify"
            mt={"2rem"}
            ml={"0.5rem"}
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
        mt={"6rem"}
        flexDirection="column"
        gap="4rem"
        w="100%"
      >
        <Text
          fontSize={"32px"}
          className="chromate"
          textTransform={"uppercase"}
          color={COLOR_SHADE.shade4}
        >
          Major services that we offer to the mertro rail system
        </Text>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(2, 1fr)"
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
                gridTemplateColumns={"65% 35%"}
              >
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
                    <Text className="aber" fontWeight={400}>
                      {item.description}
                    </Text>
                  </CardBody>
                </Box>
                <Flex position={"relative"} w={"100%"}>
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
        mt={"7rem"}
        templateRows="repeat(2, 1fr)"
        gap={"7rem"}
      >
        <Flex gap={"3rem"} alignItems="center">
          <Flex
            flexDirection={"column"}
            justifyContent="space-between"
            w={"25%"}
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
            padding={"2rem"}
            w={"100%"}
            h={"100%"}
            backgroundColor={COLOR_SHADE.shade2}
            borderRadius="1rem"
          >
            <Box overflow="hidden" borderRadius="1rem" py="1rem">
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

        <Flex gap={"3rem"} alignItems="center">
          <Flex
            px={"2rem"}
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
                      height={"24rem"}
                      borderRadius={"1rem"}
                      key={key}
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
      </Grid>

      <Flex id="about" flexDirection={"column"} mt={"5rem"}>
        <Flex
          id="imp"
          backgroundColor={COLOR_SHADE.shade2}
          borderRadius={"1rem"}
          px="1.5rem"
          py="2rem"
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
              fontSize={32}
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
                          fontSize={20}
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
                    >
                      {framework.tools.map((tool, key) => {
                        return (
                          <Text className="aber" key={key}>
                            {`${tool}${
                              key < framework.tools.length - 1 ? "," : ""
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
          <Flex className="aber" flexDirection="column" px={"3rem"} gap="1rem">
            <Text className="chromate" fontSize={62} color={COLOR_SHADE.shade4}>
              WHAT'S THIS ALL ABOUT
            </Text>
            <Text>{info}</Text>
            <Text fontWeight={800}>
              The data flow (on the left) and the ER diagram (on the right) are
              shown below!
            </Text>
          </Flex>
        </Flex>
        <Flex id="diagram" mt={"8rem"}>
          <Grid templateColumns={"repeat(2, 1fr)"} gap={"3rem"}>
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
        <Flex id="demo" mt={"8rem"}>
          <Flex gap={"4rem"} w={"100%"}>
            <Flex
              justifyContent="space-between"
              flexDirection={"column"}
              w={"35%"}
              gap={"3rem"}
            >
              <Text
                fontSize={{ sm: "4vw", "2xl": "7vw" }}
                lineHeight={1}
                className="margaret"
                whiteSpace={{ sm: "nowrap", "2xl": "normal" }}
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
                <Text textAlign={"justify"} className="aber" px="1rem">
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
                />
                Your browser does not support the video tag.
              </video>
            </Flex>
          </Flex>
        </Flex>
        <Flex id="security" mt="6rem">
          <Grid
            templateColumns={"repeat(2, 1fr)"}
            rowGap={"3rem"}
            columnGap="4rem"
          >
            <Flex alignItems={"center"} justifyContent="flex-start">
              <Image
                src="block.png"
                borderRadius={"2rem"}
                width={"100%"}
                height="auto"
                objectFit="contain"
              ></Image>
            </Flex>
            <Flex alignContent={"center"} justifyContent="center">
              <Text
                fontSize={"13vw"}
                mt={"1rem"}
                className="chromate"
                color={COLOR_SHADE.shade4}
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
              padding={"2rem"}
              gap="4rem"
            >
              <Flex
                backgroundColor={COLOR_SHADE.shade3}
                borderRadius="1rem"
                padding={"2rem"}
                className="aber"
                height={"100%"}
                flexDirection="column"
                gap={"2rem"}
              >
                <Flex gap={"2rem"}>
                  <Text
                    style={{ writingMode: "vertical-lr" }}
                    fontSize={{ sm: "30px", "2xl": "42px" }}
                    className="chromate"
                    ml={"-1rem"}
                  >
                    STRIDE
                  </Text>
                  <Text>
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
                <Flex flexDirection={"row"} gap="3rem">
                  <Flex
                    textAlign={"justify"}
                    flexDirection="column"
                    gap={"1rem"}
                  >
                    <Flex gap={"0.5rem"} justifyContent="space-between">
                      <MdOutlineSecurity />
                      <GrInsecure />
                      <GrShieldSecurity />
                      <RiSecurePaymentLine />
                      <GrInsecure />
                      <GrShieldSecurity />
                      <RiSecurePaymentLine />
                      <MdOutlineSecurity />
                    </Flex>
                    <Text>
                      We categorized data on the scale of sensitivity and
                      confidentiality of the data. We used one-way or two-way
                      function cryptography depending on the risk of the data
                      getting hacked or breached.
                    </Text>
                  </Flex>
                  <ul>
                    <li style={{ textAlign: "justify" }}>
                      <b>SHA256: </b>
                      SHAH256 algorithm was used to encrypt the more sensitive
                      data such as authentication and transaction data across
                      our system.
                    </li>
                    <li style={{ textAlign: "justify" }}>
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
                <Image src="flow.png" maxWidth={750} />
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
        mt={"3rem"}
        minHeight={350}
        className="aber"
        justifyContent={"space-around"}
        alignItems="flex-end"
        px={{ sm: "4rem", lg: "6rem" }}
        py="5rem"
      >
        <Flex>
          <Text
            fontSize={"32px"}
            lineHeight={1.2}
            textAlign="left"
            className="misto"
          >
            METRO_
          </Text>
          <Text
            fontSize={"32px"}
            lineHeight={1.2}
            textAlign="right"
            className="misto"
          >
            RIDER
          </Text>
        </Flex>
        <Flex flexDirection={"column"} gap="1rem">
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
        <Flex flexDirection={"column"} gap="1rem">
          <Link href="features">Feature</Link>
          <Link href="Snapshots">Snapshots</Link>
          <Link href="#about">About</Link>
          <Link href="#">Back To Top</Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Home;
