import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null);
    });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        <img
          src="https://img.freepik.com/premium-vector/word-concept-color-geometric-shapes-blog_205544-12899.jpg"
          alt="logo"
          width="145px"
        />
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/create">Create New</Link>
            <a href="/login" onClick={logout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/"> Home </Link>
            <Link to="/login"> Login </Link>
            <Link to="/register"> Register </Link>
          </>
        )}
      </nav>
    </header>
  );
}
