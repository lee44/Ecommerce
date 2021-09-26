import React from "react";
import { useParams } from "react-router-dom";

const Results = () => {
	let { id } = useParams<{ id?: string }>();
	console.log(id);

	return <div></div>;
};

export default Results;
