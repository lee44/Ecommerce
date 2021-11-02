import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import { useHistory } from "react-router";
import { axios_api } from "../../config/Axios/api";

const Private = () => {
	// const history = useHistory();
	const [error, setError] = useState("");
	const [privateData, setPrivateData] = useState("");
	// const [cookies, setCookie] = useCookies(["refresh_token"]);

	useEffect(() => {
		const fetchPermission = async () => {
			try {
				const { data } = await axios_api.get("/api/private");
			} catch (error) {
				// history.push("/login");
				setError("You are not authorized please login");
			}
		};

		fetchPermission();
	}, []);
	return error ? <span className="error-message">{error}</span> : <div>{privateData}</div>;
};

export default Private;
