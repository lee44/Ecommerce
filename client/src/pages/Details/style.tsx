import { Carousel } from "react-responsive-carousel";
import { styled } from "@mui/material/styles";

export const StyleCarousel = styled(Carousel)(({ theme }) => ({
	".carousel .thumb": {
		"&.selected": { border: `2px solid ${theme.palette.primary.main}` },
		"&:hover": {
			border: `2px solid ${theme.palette.primary.main}`,
		},
	},
}));
