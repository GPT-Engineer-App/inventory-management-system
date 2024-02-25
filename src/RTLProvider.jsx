import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  direction: "rtl", // Right-to-left support
});

const RTLProvider = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default RTLProvider;
