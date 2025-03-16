import type { Config } from "tailwindcss"; // Importing the Config type from Tailwind CSS
import { createThemes } from "tw-colors"; // Importing createThemes function from tw-colors package
import colors from "tailwindcss/colors"; // Importing default colors from Tailwind CSS
import animate from 'tailwindcss-animate';

// Define an array of base color names to be used in the theme
const baseColorNames = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

// Mapping of shade keys to their corresponding values
const shadeKeyMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

// Function to generate a theme object based on provided colors and mapping
const createThemeObject = (colorPalette: any, mapping: any, invertShades = false) => {
  const themeObject: any = {}; // Initialize an empty theme object
  baseColorNames.forEach((color) => {
    themeObject[color] = {}; // Create an object for each base color
    Object.entries(mapping).forEach(([key, value]: any) => {
      const shadeKey = invertShades ? value : key; // Determine the shade key based on inversion
      themeObject[color][key] = colorPalette[color][shadeKey]; // Assign the color shade to the theme object
    });
  });
  return themeObject; // Return the constructed theme object
};

// Generate light and dark themes using the createThemeObject function
const lightThemeObject = createThemeObject(colors, shadeKeyMapping);
const darkThemeObject = createThemeObject(colors, shadeKeyMapping, true);

// Define the themes object containing light and dark themes
const themeConfigurations = {
  light: {
    ...lightThemeObject,
    white: "#ffffff", // Add white color for light theme
  },
  dark: {
    ...darkThemeObject,
    white: colors.gray["950"], // Add white color for dark theme
    black: colors.gray["50"], // Add black color for dark theme
  },
};

// Tailwind CSS configuration object
const tailwindConfig: Config = {
  darkMode: ["class", "class"], // Enable dark mode based on class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Specify paths to content files
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ], 
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [createThemes(themeConfigurations), require("tailwindcss-animate")], // Register the themes as plugins
};

export default tailwindConfig; // Export the configuration
