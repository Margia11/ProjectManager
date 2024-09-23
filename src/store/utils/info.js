import React from 'react';
import { IoDocumentAttach } from "react-icons/io5";
import { FcCalendar } from "react-icons/fc";
import { FaFilter } from "react-icons/fa";

export const valueCards = [
	{
	  title: "Organize",
	  icon: <FaFilter className="icon card-icon" />,
	  text:
		" Organize your projects by category and search for them by status or otherwise.",
	},
	{
	  title: "Attachments",
	  icon: <IoDocumentAttach className="icon card-icon" />,
	  text:
		"Adding attachments to projects.",
	},
	{
	  title: "Calendary",
	  icon: <FcCalendar className="icon card-icon" />,
	  text:
		"Add deadlines to your projects and see them in the calendar.",
	},
  ];
