import { extendTheme, ThemeConfig, StyleFunctionProps } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      fontFamily: 'DM Sans, sans-serif',
      fontWeight: 700,
      bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
      color: props.colorMode === 'dark' ? 'gray.100' : '#545454',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
  }),
};

const theme = extendTheme({
  config,
  styles,
  textStyles: {
    h1: {
      fontSize: '78px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '52px',
      fontWeight: 700,
    },
    body: {
      fontSize: '20px',
      fontWeight: 700,
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '10px',
        backgroundColor: '#2F80ED',
        _dark: {
          backgroundColor: '#2F80ED',
        },
      },
    },
  },
});

export default theme;
