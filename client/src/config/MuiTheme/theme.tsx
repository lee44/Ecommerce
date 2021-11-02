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
	typography: {
		h1: {
			fontSize: "2rem",
		},
		h2: {
			fontSize: "1.5rem",
		},
		h3: {
			fontSize: "1.17rem",
		},
		h4: {
			fontSize: "1rem",
		},
		h5: {
			fontSize: ".83rem",
		},
		h6: {
			fontSize: ".67rem",
		},
		subtitle1: {
			fontSize: ".67rem",
		},
		subtitle2: {
			fontSize: ".5rem",
		},
		body1: {
			fontSize: "1rem",
		},
		body2: {
			fontSize: "1rem",
		},
		button: {
			fontSize: "1rem",
		},
	},
	components: {
		MuiAlertTitle: {
			styleOverrides: {
				root: {
					fontWeight: 600,
				},
			},
		},
	},
});
