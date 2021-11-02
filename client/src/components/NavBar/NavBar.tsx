import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, createTheme, Grid, ThemeProvider, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useHistory } from "react-router";
import logo from "../../logo.png";
import { getMemoizedNumItems } from "../../redux/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import AccountMenu from "../AccountMenu/AccountMenu";
import CartDrawer from "../CartDrawer/CartDrawer";
import { Search, SearchIconWrapper, StyledInputBase, StyledLogo, StyledProfile } from "./styles";

function NavBar() {
	const theme = createTheme({
		components: {
			MuiList: {
				defaultProps: {
					onMouseLeave: (e) => {
						handleClose(e);
					},
				},
			},
		},
	});
	const numItems = useAppSelector(getMemoizedNumItems);
	const [open, setOpen] = useState(false);
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const showMenu = Boolean(anchorEl);

	const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
		const menu = document.getElementById("account_menu_button") as HTMLElement;
		const menuBoundary = {
			left: menu.offsetLeft,
			top: menu.offsetTop,
			right: menu.offsetLeft + menu.offsetWidth,
			bottom: menu.offsetTop + menu.offsetHeight,
		};
		if (e.clientX >= menuBoundary.left && e.clientX < menuBoundary.right && e.clientY < menuBoundary.bottom + 25 && e.clientY >= menuBoundary.top) {
			return;
		}
		setAnchorEl(null);
	};

	const handleClose = (e: React.MouseEvent<HTMLElement>) => {
		const menu = document.getElementById("account_menu")?.children[2] as HTMLElement;
		const menuBoundary = {
			left: menu?.offsetLeft,
			top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
			right: menu?.offsetLeft + menu?.offsetHeight,
			bottom: menu?.offsetTop + menu?.offsetHeight,
		};
		if (e.clientX >= menuBoundary.left && e.clientX < menuBoundary.right && e.clientY < menuBoundary.bottom && e.clientY >= menuBoundary.top) {
			return;
		}
		setAnchorEl(null);
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<StyledLogo src={logo} onClick={() => history.push("/")} sx={{ cursor: "pointer" }}></StyledLogo>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
					</Search>
					<StyledProfile
						container
						id="account_menu_button"
						onMouseOver={handleMouseOver}
						onMouseLeave={handleMouseLeave}
						sx={{ cursor: "pointer", zIndex: 1301 }}
					>
						<Grid item xs={4}>
							<IconButton size="large" color="inherit" sx={{ padding: "6px 0px 6px 6px" }}>
								<AccountCircleIcon></AccountCircleIcon>
							</IconButton>
						</Grid>
						<Grid item xs={8}>
							<Typography variant="h5">Welcome Joshua</Typography>
						</Grid>
					</StyledProfile>
					<ThemeProvider theme={theme}>
						<AccountMenu anchorEl={anchorEl} open={showMenu} handleClose={handleClose} />
					</ThemeProvider>
					<Box>
						<Badge badgeContent={numItems} color="secondary">
							<ShoppingCartIcon sx={{ cursor: "pointer" }} onClick={() => setOpen(!open)} />
						</Badge>
					</Box>
					<Box>
						<IconButton size="large" color="inherit">
							<SettingsIcon></SettingsIcon>
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<CartDrawer open={open} setOpen={setOpen}></CartDrawer>
		</Box>
	);
}

export default NavBar;
