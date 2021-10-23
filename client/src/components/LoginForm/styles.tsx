import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

export const LoginBox = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px)`,
}));
