import React from "react";
import { NavLink as NavLinkBase } from "react-router-dom";

const NavLink = React.forwardRef((props, ref) => (
	<NavLinkBase
		ref={ref}
		{...props}
		className={({ isActive }) =>
			isActive ? props.className + " Mui-selected" : props.className
		}
	/>
));

export default NavLink;
