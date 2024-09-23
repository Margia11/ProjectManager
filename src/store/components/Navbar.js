import React from "react";
import{ Link } from "react-router-dom";
import{LinkComponent} from "../utils/links";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
	return (
		<nav className="nav">
			<div className="container nav-container">
				<header className="nav-header">
					<Link to="/" className="nav-brand">
						<h3>ProjectManager</h3>
					</Link>
					<div>
						<button className="icon-btn btn nav-toggler">
							<FaBars className="nav-icon" />
						</button>
					</div>
				</header>
				<LinkComponent classLink="nav-links"/>
			</div>
		</nav>
	)
}

export default Navbar;
