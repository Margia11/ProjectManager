import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome} from "react-icons/ai";
import { IoIosAlbums } from "react-icons/io";
import { TfiAlignJustify } from "react-icons/tfi";

const links = [
	{
	  url: "/",
	  text: "Home",
	  icon: <AiFillHome className="nav-icon" />,
	},
	{
	  url: "/projects",
	  text: "Projects",
	  icon: <IoIosAlbums className="nav-icon" />,
	},
	{
	  url: "/category",
	  text: "Category",
	  icon: <TfiAlignJustify className="nav-icon" />,
	},
  ];

  const LinkComponent = ({ classLink }) => {
	return (
	  <ul className={classLink}>
		{links.map((link) => {
		  return (
			<Link key={link.text} to={link.url} className="nav-item">
			  <div className="nav-link">
				{link.icon}
				<h5 className="nav-text">{link.text}</h5>
			  </div>
			</Link>
		  );
		})}
	  </ul>
	);
  };

export { LinkComponent };
