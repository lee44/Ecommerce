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
import React from "react";
import logo from "../../logo.png";
import { getMemoizedNumItems } from "../../redux/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import { Search, SearchIconWrapper, StyledInputBase, StyledLogo } from "./styles";

function NavBar() {
	const numItems = useAppSelector(getMemoizedNumItems);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<StyledLogo src={logo}></StyledLogo>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
					</Search>
					<Box>
						<IconButton size="large" color="inherit">
							<AccountCircleIcon></AccountCircleIcon>
						</IconButton>
					</Box>
					<Box>
						<Badge badgeContent={numItems} color="secondary">
							<ShoppingCartIcon></ShoppingCartIcon>
						</Badge>
					</Box>
					<Box>
						<IconButton size="large" color="inherit">
							<SettingsIcon></SettingsIcon>
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default NavBar;
