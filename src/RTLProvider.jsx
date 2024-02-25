import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = (direction) =>
  extendTheme({
    direction: direction, // Toggles between 'rtl' and 'ltr'
  });

const RTLProvider = ({ children, direction }) => {
  return <ChakraProvider theme={theme(direction)}>{children}</ChakraProvider>;
};

export default RTLProvider;
