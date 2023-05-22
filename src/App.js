import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

function App() {
  // eslint-disable-next-line no-undef
  chrome.webRequest?.onBeforeSendHeaders?.addListener(
    function (details) {
      var headers = details.requestHeaders;
      for (var i = 0; i < headers.length; i++) {
        console.log(headers[i].name);
        if (headers[i].name === 'X-Forwarded-For') {
          headers[i].value = '45.76.208.195'; // 修改請求標頭
          break;
        }
      }
      return { requestHeaders: headers };
    },
    { urls: ['<all_urls>'] },
    ['blocking', 'requestHeaders']
  );
  console.log('1');
  const handleClick = () => {
    console.log('2');
    // eslint-disable-next-line no-undef
    chrome.tabs.create({ url: 'https://www.google.com' });
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" w="320px">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code>
            </Text>
            <Button onClick={handleClick}>test</Button>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
