import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", selectedTheme);
  }, [theme]);

  const handleTheme = (name) => {
    localStorage.setItem("theme", name);
    if (name === "light") {
      setTheme(name);
    } else if (name === "dark") {
      setTheme(name);
    } else if (name === "synthwave") {
      setTheme(name);
    } else if (name === "retro") {
      setTheme(name);
    }
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Email Auth</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="relative z-50">
            <details>
              <summary>Themes</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li onClick={() => handleTheme("light")}>
                  <a>Light</a>
                </li>
                <li onClick={() => handleTheme("dark")}>
                  <a>Dark</a>
                </li>
                <li onClick={() => handleTheme("synthwave")}>
                  <a>Synthwave</a>
                </li>
                <li onClick={() => handleTheme("retro")}>
                  <a>Retro</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
