import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
         
          <li>
            <Link to="/recipelist">Lista przepisów</Link>
          </li>

          <li>
            <Link to="/ranking">Ranking</Link>
          </li>
          
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;