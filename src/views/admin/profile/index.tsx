// Chakra imports
import { Box, Grid, GridItem, Text, useColorModeValue, Flex, FormControl, FormLabel, Input, Button, useToast, Select } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "contexts/AuthContext";
import Card from "components/card/Card";
import { sha256HashPin } from "security/encrypt";
import { HSeparator } from "components/separator/Separator";
import Banner from "views/admin/profile/components/Banner";
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/nfts/Nft4.png";
import supabase from "data/supabase";
import { useHistory } from "react-router-dom";

interface DropDownOptios {
  id: number;
  username: string;
  position: string;
}

export default function Overview() {
  const { admin, signout } = useContext(AuthContext);
  const [loading, setLoading] = useState({changePass: false, createAdmin: false, delAdmin: false});
  const [passForm, setPassForm] = useState({ oldPassword: "", newPassword: "" });
  const [newAdminForm, setNewAdminForm] = useState({ name: "", userName: "", pos: "", password: "" });
  const toast = useToast();
  const toastText = (
    title: string,
    description: string,
    status: "info" | "warning" | "success" | "error"
  ) => {
    setLoading({changePass: false, createAdmin: false, delAdmin: false});
    toast({
      title: title,
      description: description,
      status: status,
      duration: 6000,
      isClosable: true,
    });
  };
  const [adminList, setAdminListData] = useState<DropDownOptios[]>([]);
  const [adminOption, setAdminOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const admin_pos = admin[0]?.position;

  const getAdminList = useCallback(async () => {
    const { data, error } = await supabase
      .from("admin")
      .select("id, username, position")
    if (!error) {
      setAdminListData(data);
    } else {
      console.log(error.message);
    }
  }, []);

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    getAdminList();
  }, [getAdminList]);

  useEffect(() => {
    if (adminList) {
      if (admin_pos === 'admin') {
        let newArrObj = adminList
          .filter(obj => obj.position !== 'sys_admin')
          .filter(obj => obj.position !== 'admin')
          .map((obj) => {
            return { label: obj.username, value: obj.id };
          });
        setAdminOption(newArrObj);
      } else {
        let newArrObj = adminList
          .filter(obj => obj.position !== 'sys_admin')
          .map((obj) => {
            return { label: obj.username, value: obj.id };
          });
        setAdminOption(newArrObj);
      }
    }
  }, [adminList]);

  const changePass = async () => {
    setLoading({...loading, changePass: true});
    const { data } = await supabase.from('admin').select('password').eq('id', admin[0].id).single();
    let oldPassHash = data?.password;
    let oldInputPassHash = sha256HashPin(passForm.oldPassword);
    if (oldPassHash === oldInputPassHash) {
      if (passForm.newPassword.length < 8) {
        toastText('Change Password Failed', "Strong Password", 'error');
      } else {
        let newPassHash = sha256HashPin(passForm.newPassword);
        const { error } = await supabase.from('admin').update({ password: newPassHash }).eq('id', admin[0].id);
        error ? toastText('Change Password Failed', error.message, 'error') : toastText('Password Changed', 'Password Changed Successfully', 'success');
      }
    } else {
      toastText('Change Password Failed', "Password don't match", 'error');
    }
  }

  const onFocus = {
    borderColor: "teal",
    boxShadow: "0px 1px 0px 0px teal",
  };

  const posOptions = [
    { label: 'sys_admin', value: 'sys_admin' },
    { label: 'admin', value: 'admin' },
    { label: 'csr', value: 'csr' }];

  const createNewAdmin = async () => {
    if (newAdminForm.pos.length < 1 || newAdminForm.password.length < 1 || newAdminForm.userName.length < 1 || newAdminForm.name.length < 1) {
      toastText('Admin creation Failed', "Fill up all the field", 'error');
      return;
    }
    setLoading({...loading, createAdmin: true});
    let newPassHash = sha256HashPin(newAdminForm.password);
    const { error } = await supabase.from('admin')
      .insert({
        name: newAdminForm.name, 
        position: newAdminForm.pos,
        username: newAdminForm.userName, 
        password: newPassHash
      });
    error ? toastText('Admin creation Failed', error.message, 'error') :
      toastText('Admin Created', 'Admin Created Successfully', 'success');
  }

  const deleteAdmin = async () => {
    if (selectedOption) {
          setLoading({...loading, delAdmin: true});
      let id = selectedOption;
      const { error } = await supabase
        .from('admin')
        .delete()
        .eq('id', id);
      error ? toastText('Admin deletion Failed', error.message, 'error') :
        toastText('Admin Deleted', 'Admin deleted Successfully', 'success');
    }
  }

  const history = useHistory();

  const signOut = async () => {
    await signout();
    history.push("/admin");
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <Banner
          banner={banner}
          avatar={avatar}
          name={admin[0]?.name}
          position={
            admin_pos === "sys_admin"
              ? "System Administrator"
              : admin_pos === "admin" ? "Admin" : "Customer Service Representative"
          }
        />
        <GridItem colSpan={2} flexGrow={1}>
          <Card bg="white" rounded={"15px"} h="95%">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
              mx='25px'
              mt='2rem'
            >
              Change Password
            </Text>
            <HSeparator my={"1rem"} />
            <Flex flexDirection='column' padding={{ sm: '1rem', lg: '3rem' }} gap={'1rem'} justifyContent='center' alignItems={'center'} mt={'-2rem'}>
              <FormControl flexDirection={'row'} isRequired>
                <FormLabel marginLeft={'0.5rem'}>Old Password</FormLabel>
                <Input
                  placeholder="Enter the old Password"
                  focusBorderColor="#008080"
                  variant='outline'
                  type={'password'}
                  onChange={(input) => setPassForm({ ...passForm, oldPassword: input.target.value })} required />
              </FormControl>

              <FormControl isRequired>
                <FormLabel marginLeft={'0.5rem'}>New Password</FormLabel>
                <Input
                  placeholder="Enter the new Password"
                  focusBorderColor="#008080"
                  variant='outline'
                  type='password'
                  onChange={(input) => setPassForm({ ...passForm, newPassword: input.target.value })} required />
              </FormControl>
              <Button 
                variant={'solid'} 
                colorScheme={'teal'} 
                maxW={'200px'} 
                marginTop={'1rem'} 
                onClick={changePass} 
                isLoading={loading.changePass}
              >
                Change Password 
              </Button>
            </Flex>
          </Card>
        </GridItem>
      </Grid>

      <Flex flexDirection={'row'} gap={'1rem'} justifyContent={'space-between'}>
        {admin_pos == 'sys_admin' ?
          <GridItem colSpan={2} flexGrow={1}>
            <Card bg="white" rounded={"15px"} h="100%">
              <Text
                color={textColor}
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
                mx='25px'
                mt='2rem'
              >
                Create new Admin
              </Text>
              <HSeparator my={"1rem"} />
              <Flex mt={'-2rem'} flexDirection='column' padding={{ sm: '1rem', lg: '3rem' }} gap={'1rem'} justifyContent='center' alignItems={'center'}>
                <FormControl flexDirection={'row'} isRequired>
                  <FormLabel marginLeft={'0.5rem'}>Name</FormLabel>
                  <Input
                    placeholder="Admin's Name"
                    focusBorderColor="#008080"
                    variant='outline'
                    type={'text'}
                    onChange={(input) => setNewAdminForm({ ...newAdminForm, name: input.target.value })} required />
                </FormControl>

                <FormControl flexDirection={'row'} isRequired>
                  <FormLabel marginLeft={'0.5rem'}>Username</FormLabel>
                  <Input
                    placeholder="Admin's Username"
                    focusBorderColor="#008080"
                    variant='outline'
                    type={'text'}
                    onChange={(input) => setNewAdminForm({ ...newAdminForm, userName: input.target.value })} required />
                </FormControl>


                <FormControl flexDirection={'row'} isRequired>
                  <FormLabel marginLeft={'0.5rem'}>Position</FormLabel>
                  <Select
                    value={newAdminForm.pos}
                    onChange={(input) => setNewAdminForm({ ...newAdminForm, pos: input.target.value })}
                    variant={"outline"}
                    fontFamily="'Vollkorn SC', serif"
                    fontSize={16}
                    _focus={onFocus}
                    placeholder="select the position"
                    required
                  >
                    {posOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>

                </FormControl>

                <FormControl flexDirection={'row'} isRequired>
                  <FormLabel marginLeft={'0.5rem'}>Temp Password</FormLabel>
                  <Input
                    placeholder="Admin's Password"
                    focusBorderColor="#008080"
                    variant='outline'
                    type={'text'}
                    onChange={(input) => setNewAdminForm({ ...newAdminForm, password: input.target.value })} required />
                </FormControl>

                <Button variant={'solid'} 
                  colorScheme={'teal'} 
                  maxW={'200px'} 
                  marginTop={'1rem'} 
                  onClick={createNewAdmin} 
                  isLoading={loading.createAdmin}
                >
                  Create Admin
                </Button>
              </Flex>
            </Card>
          </GridItem> : null}


        <GridItem colSpan={2} flexGrow={1}>
          {admin_pos != 'csr' ?
            <Card bg="white" rounded={"15px"} h="55%">
              <Text
                color={textColor}
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
                mx='25px'
                mt='2rem'
              >
                Delete Admin
              </Text>
              <HSeparator />
              <Flex h={'100%'}
                alignContent='center'
                flexDirection='column'
                padding={{ sm: '1rem', lg: '3rem' }}
                gap={'1rem'}
                justifyContent='center'
                alignItems={'center'}
              >
                <FormControl flexDirection={'row'} isRequired>
                  <FormLabel marginLeft={'0.5rem'}>Username</FormLabel>
                  <Select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    variant={"outline"}
                    fontFamily="'Vollkorn SC', serif"
                    fontSize={16}
                    _focus={onFocus}
                    placeholder="select a username"
                    required
                  >
                    {adminOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant={'solid'}
                  colorScheme={'teal'}
                  maxW={'200px'}
                  marginTop={'1rem'}
                  onClick={deleteAdmin}
                  isLoading={loading.delAdmin}
                >
                  Delete admin
                </Button>
              </Flex>
            </Card> : null}
          <Card bg="white" rounded={"15px"} h={ admin_pos === 'csr' ? "100%" : "42%"} mt={'1rem'}>
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
              mx='25px'
              mt='2rem'
            >
              Sign Out
            </Text>
            <Flex h={'100%'}
              mt={'2rem'}
              alignContent='center'
              flexDirection='column'
              gap={'1rem'}
              justifyContent='center'
              alignItems={'center'}
            >
              <Button
                variant={'solid'}
                colorScheme={'teal'}
                maxW={'200px'}
                marginTop={'1rem'}
                onClick={signOut}
              >
               Sign Out 
              </Button>
            </Flex>
          </Card>
        </GridItem>
      </Flex>
    </Box>
  );
}
