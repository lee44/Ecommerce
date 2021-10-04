import CircleIcon from "@mui/icons-material/Circle";
import { Box, List, ListItem, Typography } from "@mui/material";
import { StyledListItemIcon } from "./style";

type DetailType = {
	details: string[];
};
const BulletDetails = (props: DetailType) => {
	return (
		<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
			<List>
				{props.details.map((detail, index) => {
					return (
						<ListItem key={index} disablePadding>
							<StyledListItemIcon>
								<CircleIcon sx={{ fontSize: 10 }} color="primary"></CircleIcon>
							</StyledListItemIcon>
							<Typography variant="h4">{detail}</Typography>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
};

export default BulletDetails;
