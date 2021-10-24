import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();

	return <LoginForm />;
};

export default Login;
