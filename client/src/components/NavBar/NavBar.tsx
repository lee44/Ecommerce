import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, createTheme, Grid, ThemeProvider, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import logo from "../../logo.png";
import { getMemoizedNumItems } from "../../redux/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import AccountMenu from "../AccountMenu/AccountMenu";
import CartDrawer from "../CartDrawer/CartDrawer";
import { Search, SearchIconWrapper, StyledInputBase, StyledLogo, StyledProfile } from "./styles";

function NavBar() {
	const numItems = useAppSelector(getMemoizedNumItems);
	const [open, setOpen] = useState(false);
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const showMenu = Boolean(anchorEl);
	const [cookie, setCookie] = useCookies(["username"]);
	const userStatus = useAppSelector((state) => {
		return state.user.status;
	});
	const userName = useAppSelector((state) => {
		return state.user.username;
	});
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

	const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
		if (userName) setAnchorEl(event.currentTarget);
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
			right: menu?.offsetLeft + menu?.offsetWidth,
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
					<IconButton size="large" color="inherit" aria-label="open drawer">
						<MenuIcon />
					</IconButton>
					<StyledLogo src={logo} onClick={() => history.push("/")} sx={{ cursor: "pointer" }}></StyledLogo>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase placeholder="Search???" inputProps={{ "aria-label": "search" }} />
					</Search>
					<StyledProfile
						container
						id="account_menu_button"
						onClick={() => (userStatus !== "succeeded" ? history.push("/login") : "")}
						onMouseOver={handleMouseOver}
						onMouseLeave={handleMouseLeave}
						sx={{ cursor: "pointer", zIndex: 1301 }}
					>
						<Grid item>
							<IconButton size="large" color="inherit" sx={{ padding: "6px" }}>
								<AccountCircleIcon></AccountCircleIcon>
							</IconButton>
						</Grid>
						<Grid item xs="auto" px={1}>
							<Typography
								variant="h5"
								noWrap
								textAlign="start"
								sx={{
									height: "100%",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									width: "max-content",
									whiteSpace: "pre-wrap",
								}}
							>
								{userStatus === "succeeded" ? `Welcome\n${userName}` : "Welcome\nSign In / Register"}
							</Typography>
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
				</Toolbar>
			</AppBar>
			<CartDrawer open={open} setOpen={setOpen}></CartDrawer>
		</Box>
	);
}

export default NavBar;
