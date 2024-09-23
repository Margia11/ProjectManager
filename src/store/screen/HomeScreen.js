import React from "react";
import Hero from "./Hero";
import Card from "../components/Card";
import useTitle from "../../useTitle";
import image from "../../images/home.jpg";
import { valueCards } from "../utils/info";
import Lottie from "react-lottie";
import animationData from "../../images/animation.json";
import { Link } from "react-router-dom";

const HomeScreen = () => {
	useTitle("Home");
	  return (
		<>
		<Hero img={image}>
			<section className="main-hero">
				<div className="main-text">
						<h3>
							<q>Welcome to ProjectManager</q>
						</h3>
					<div className="underline"></div>
					<h3>Manage your projects with ease</h3>
				</div>
						<div className="home-hero-img">
							<Lottie
								options={{
								loop: true,
								autoplay: true,
								reverse: true,
								animationData: animationData,
								rendererSettings: {
									preserveAspectRatio: "xMidYMid slice",
								},
								}}
								height={450}
							/>
						</div>
			</section>
		</Hero>
		<section className="about-values">
		<div className="container about-value-content">
			<h3 className="brand-seconday-color" style={{marginTop: "2rem",marginBottom:"2rem", font:"bold 1.5rem 'Montserrat', sans-serif",
		}}>You Can:</h3>
			<div className="card-section">
			{valueCards.map((card) => {
				return (
					<Card key={card.title} {...card} className={"value-card"}/>
				);
				})}
				<br/>
			</div>
		</div>
		</section>
	</>
  );
}

export default HomeScreen;
