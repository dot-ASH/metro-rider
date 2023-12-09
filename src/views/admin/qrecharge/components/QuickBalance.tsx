import { Flex, Box, useColorModeValue, Text, FormControl, FormLabel, NumberInput, NumberInputField, Button, Toast, useToast } from '@chakra-ui/react';
import Select from 'react-select'
// Custom components
import Card from 'components/card/Card';
import supabase from 'data/supabase';
import { useCallback, useContext, useEffect, useState } from 'react';
import { decryptHash, encryptHash } from 'security/encrypt';
import { Chance } from 'chance';
import AuthContext from 'contexts/AuthContext';

interface DropDownOptios {
  tag_id: number;
  user_index: number;
}

export default function CheckTable() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [amount, setAmount] = useState("");
  const { admin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState<DropDownOptios[]>([]);
  const [cardOption, setCardOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const onFocus = {
    borderColor: "teal",
    boxShadow: "0px 1px 0px 0px teal",
  };
  const toast = useToast();
  const getCardData = useCallback(async () => {
    const { data, error } = await supabase
      .from("cards")
      .select("tag_id, user_index")
      .eq("available", false)
    if (!error) {
      setCardData(data);
    } else {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    getCardData();
  }, [getCardData]);

  useEffect(() => {
    if (cardData) {
      setLoading(false);
      let newArrObj = cardData.map((obj) => {
        return { label: obj.tag_id, value: obj.user_index };
      });
      setCardOption(newArrObj);
    } else {
      setLoading(true);
    }
  }, [cardData]);

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


  const getBalance = async (id: string) => {
    const { data, error } = await supabase.from("user_data").select("balance").eq('user_index', id).single();
    if (!error) {
      let balance = decryptHash(data?.balance);
      return balance;
    } else {
      console.log(error.message);
    }
  }

  const handleQuickRecharge = async () => {
    setLoading(true);
    let balance = await getBalance(selectedOption);
    let newBalance = (balance + parseInt(amount, 10));
    let newBalanceHash = encryptHash(newBalance);
    console.log(newBalanceHash);
    const { error } = await supabase.from("user_data").update({ balance: newBalanceHash }).eq('user_index', selectedOption);
    if (!error) {
      const chance = new Chance();
      let randTranId = chance.string({ length: 20, symbols: false, alpha: true });
      const { error: transactionError } = await supabase
        .from('transaction')
        .insert({ transId: randTranId, amount: amount, type: 'rchrg', 'user_index': selectedOption })
      if (transactionError) {
        toastText('Recharge unsuccesful', transactionError.message, 'error')
        setLoading(false);
        return;
      }

      const { error: quickError } = await supabase.from('quick_recharge')
        .insert({ admin_id: admin[0].id, transId: randTranId });
      if (quickError) {
        toastText('Recharge unsuccessful', quickError.message, 'error')
        setLoading(false);

        return;
      }
      setLoading(false);
      toastText('Recharge successful', 'Reachage successfully done', 'success')
    }else{
      console.log(error.message);
    }
  }

  return (
    <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
          Quick Recharge
        </Text>
      </Flex>
      <Flex flexDirection='column' padding={{ sm: '1rem', lg: '3rem' }} gap={'1rem'} justifyContent='center' alignItems={'center'}>
        <FormControl flexDirection={'row'}>
          <FormLabel marginLeft={'0.5rem'}>Card Id</FormLabel>
          <Select options={cardOption} isSearchable onChange={(input) => setSelectedOption(input.value)} />
        </FormControl>

        <FormControl>
          <FormLabel marginLeft={'0.5rem'}>Recharge Amount</FormLabel>
          <NumberInput>
            <NumberInputField placeholder='amount' _focus={onFocus} onChange={(e) => setAmount(e.target.value)} />
          </NumberInput>
        </FormControl>
        <Button variant={'solid'} colorScheme={'teal'} maxW={'200px'} marginTop={'1rem'} onClick={handleQuickRecharge} isLoading={loading}>Reacharge </Button>
      </Flex>
      <Box>

      </Box>
    </Card>
  );
} 
