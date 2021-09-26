import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
	palette: {
		primary: {
			light: "#335361",
			main: "#00283A",
			dark: "#001C28",
			contrastText: "#fff",
		},
		secondary: {
			light: "#FBB053",
			main: "#FA9D28",
			dark: "#AF6D1C",
			contrastText: "#000",
		},
	},
});
