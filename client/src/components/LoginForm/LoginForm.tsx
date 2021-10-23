import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import { LoginBox } from "./styles";

const LoginForm = () => {
	return (
		<>
			<LoginBox>
				<Card>
					<CardHeader title="Log In" titleTypographyProps={{ variant: "h1" }}></CardHeader>
					<CardContent sx={{ display: "flex", flexDirection: "column" }}>
						<TextField id="outlined-basic" label="Email" variant="outlined" />
						<TextField id="outlined-basic" label="Password" variant="outlined" sx={{ mt: 2 }} />
					</CardContent>
				</Card>
			</LoginBox>
		</>
	);
};

export default LoginForm;
