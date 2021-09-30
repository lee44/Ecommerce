import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { StyledListItemIcon } from "./style";

const BulletDetails = () => {
	return (
		<Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
			<List>
				<ListItem disablePadding>
					<StyledListItemIcon>
						<CircleIcon sx={{ fontSize: 10 }} color="primary"></CircleIcon>
					</StyledListItemIcon>
					<Typography variant="subtitle1">7nm Castle Peak (Zen 2) 280W</Typography>
				</ListItem>
				<ListItem disablePadding>
					<StyledListItemIcon>
						<CircleIcon sx={{ fontSize: 10 }} color="primary"></CircleIcon>
					</StyledListItemIcon>
					<Typography variant="subtitle1">64MB L3 Cache</Typography>
				</ListItem>
			</List>
		</Box>
	);
};

export default BulletDetails;
