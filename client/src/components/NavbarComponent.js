import { Link,useNavigate } from "react-router-dom"
import { getUser,logout } from "./services/authorize"
const NavbarComponent =()=>{
    const navigate = useNavigate()
    return (
    <nav>
        <ul className="nav nav-tabs">
            <li className="nav-item pr-3 pt-3 pb-3">
                <Link to="/" className="nav-link">Home</Link>
            </li>
            {
            getUser() && (
            <li className="nav-item pr-3 pt-3 pb-3">
                <Link to="/create" className="nav-link"> เขียนบทความ</Link>
            </li>
              )
            }

          {
            !getUser() && (
                <li className="nav-item pr-3 pt-3 pb-3">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
            )
          }

{
            getUser() && (
                <li className="nav-item pr-3 pt-3 pb-3">
                <button to="/login" className="nav-link" onClick={()=>logout(()=>navigate(`/login`))}>Logout</button>
            </li>
            )
          }



        </ul>
       </nav>
    )
}
export default NavbarComponent