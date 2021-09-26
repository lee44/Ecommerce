import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Search, SearchIconWrapper, StyledInputBase, StyledLogo } from "./styles";
import logo from "../../logo.png";

function NavBar() {
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
						<IconButton size="large" color="inherit">
							<ShoppingCartIcon></ShoppingCartIcon>
						</IconButton>
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
