import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useHistory } from "react-router";
import logo from "../../logo.png";
import { getMemoizedNumItems } from "../../redux/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import CartDrawer from "../CartDrawer/CartDrawer";
import { Search, SearchIconWrapper, StyledInputBase, StyledLogo } from "./styles";

function NavBar() {
	const numItems = useAppSelector(getMemoizedNumItems);
	const [open, setOpen] = useState(false);
	const history = useHistory();

	const handleClick = () => {
		history.push("/login");
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
					<Box>
						<IconButton size="large" color="inherit" onClick={handleClick}>
							<AccountCircleIcon></AccountCircleIcon>
						</IconButton>
					</Box>
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
