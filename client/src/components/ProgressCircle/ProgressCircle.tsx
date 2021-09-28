import { Box } from "@mui/system";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const ProgressCircle = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<CircularProgress />
		</Box>
	);
};

export default CircularProgress;
