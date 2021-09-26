import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ShoppingGrid from "../components/ShoppingGrid/ShoppingGrid";
import { Container, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { shoppingGridItems } from "../config/shoppingGridItems";
import { carouselSlides } from "../config/carouselSlides";

function Home() {
	return (
		<>
			<Carousel axis="horizontal" infiniteLoop={true} showThumbs={false} showStatus={false}>
				{carouselSlides.map((slide, index) => {
					return (
						<div key={index}>
							<img alt="first_slide" src={process.env.PUBLIC_URL + `assets/carouselSlides/${slide.images_src}`} />
						</div>
					);
				})}
			</Carousel>
			<Container sx={{ paddingBottom: 5 }}>
				<Box sx={{ padding: 3, marginTop: 5, border: 1, borderColor: "grey.300", borderRadius: 1, textAlign: "left" }}>
					<Typography variant="h4">Shop PC Components</Typography>
					<Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
						{shoppingGridItems.map((item, index) => {
							return (
								<ShoppingGrid
									key={index}
									category={item.category}
									subCategory={item.subCategory}
									url_parameter={item.url_parameter}
									image_src={item.image_src}
								/>
							);
						})}
					</Grid>
				</Box>
			</Container>
		</>
	);
}

export default Home;
