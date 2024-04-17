import { extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans';
import '@fontsource/raleway';

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: {
      // Apply font weight globally to all text elements
      body: {
        fontWeight: 1000, // Example: Make all text bold
      },
    }
  },
})

export default theme