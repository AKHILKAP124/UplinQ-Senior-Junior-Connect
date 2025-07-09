import React from 'react'
import { useSelector } from "react-redux";

const Dashboard = () => {

  const {user} = useSelector((state) => state.user);

  console.log(user);
  return (
    <div>Dashboard
      <div>{user.name}</div>
      <img src={user.avatar} alt="" />

    </div>
  )
}

export default Dashboard