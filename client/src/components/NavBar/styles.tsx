import { Grid } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";

export const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	right: "0px",
	cursor: "pointer",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	zIndex: 99,
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",

	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 2, 1, 2),
		width: "90%",
	},
}));

export const StyledLogo = styled("img")(({ theme }) => ({
	width: "100px",
	height: "50px",
	padding: theme.spacing(1, 1, 1, 1),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "flex-start",
}));

export const StyledProfile = styled(Grid)(({ theme }) => ({
	width: "auto",
	flexWrap: "nowrap",
	margin: theme.spacing(0, 1),
	border: `1px solid transparent`,
	":hover": {
		border: "1px solid white",
	},
}));
