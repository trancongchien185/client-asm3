// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link, Redirect } from 'react-router-dom';
// import { deleteSession } from '../Redux/Action/ActionSession';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function LoginLink(props) {
  // const dispatch = useDispatch();

  // const onRedirect = () => {
  //   localStorage.clear();

  //   const action = deleteSession("");
  //   dispatch(action);
  // };
	const onLogout = () => {
		window.location.href = '/signin';
		localStorage.clear();
	};

  return (
    <li className="nav-item" onClick={onLogout}>
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;
