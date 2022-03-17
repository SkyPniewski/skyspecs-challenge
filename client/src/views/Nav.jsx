import { Outlet, Link } from "react-router-dom";

const Nav = () => {
    return (
        <>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            </ul>
          </nav>
          <Outlet />
        </>
      )
}

export default Nav;