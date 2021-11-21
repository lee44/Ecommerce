import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useCookies } from "react-cookie";

type propTypes = {
	anchorEl: HTMLElement | null;
	open: boolean;
	handleClose: (event: React.MouseEvent<HTMLElement>) => void;
};

const AccountMenu = (props: propTypes) => {
	const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);

	const handleLogOut = () => {
		removeCookie("access_token");
	};

	return (
		<Menu
			id="account_menu"
			anchorEl={props.anchorEl}
			open={props.open}
			onClick={props.handleClose}
			PaperProps={{
				elevation: 0,
				sx: {
					overflow: "visible",
					filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
					mt: 1.5,
					"& .MuiAvatar-root": {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1,
					},
					"&:before": {
						content: '""',
						display: "block",
						position: "absolute",
						top: 0,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: "background.paper",
						transform: "translateY(-50%) rotate(45deg)",
						zIndex: 0,
					},
				},
			}}
			transformOrigin={{ horizontal: "right", vertical: "top" }}
			anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
		>
			<MenuItem>
				<Avatar /> Profile
			</MenuItem>
			<MenuItem>
				<Avatar /> My account
			</MenuItem>
			<Divider />
			<MenuItem>
				<ListItemIcon>
					<PersonAdd fontSize="small" />
				</ListItemIcon>
				Add another account
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<Settings fontSize="small" />
				</ListItemIcon>
				Settings
			</MenuItem>
			<MenuItem onClick={() => handleLogOut()}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>
				Logout
			</MenuItem>
		</Menu>
	);
};

export default AccountMenu;
