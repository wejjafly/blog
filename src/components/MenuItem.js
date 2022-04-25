import { NavLink } from "react-router-dom";

export const MenuItem = ({ to, ...rest }) => (
  <NavLink
    to={to}
    {...rest}
    style={(info) => {
      return {
        textDecoration: "none",
        color: "#000000",
        display: "block",
        padding: 10,
        cursor: "pointer",
        fontWeight: info.isActive ? "800" : "normal",
        background: info.isActive ? "#ED9F93" : "#42526A",
      };
    }}
  />
);