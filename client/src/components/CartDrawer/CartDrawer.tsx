import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Divider, Drawer, IconButton, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type Props = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartDrawer = (prop: Props) => {
	const dispatch = useAppDispatch();

	const drawerWidth = 240;

	// Load products from cookies or local storage or find product in database using product_id
	const cart = useAppSelector((state) => {
		return state.cart.items;
	});

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
				},
			}}
			variant="persistent"
			anchor="right"
			open={prop.open}
		>
			<DrawerHeader>
				<IconButton onClick={() => prop.setOpen(!prop.open)}>
					<ChevronRightIcon />
				</IconButton>
			</DrawerHeader>
			<Divider />
			<Box></Box>
		</Drawer>
	);
};

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "flex-start",
}));

export default CartDrawer;
