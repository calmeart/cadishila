import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../context/auth";

function Profile() {

  const { id } = useParams();
  const { user } = useContext(AuthContext);

  return (
    id === user.id ? (
      <div>
        <div>
          <h2>Profile Details</h2>
          <p>username: {user.username}</p>
          <p>email: {user.email}</p>
          <p>member status: {user.isAdmin ? 'ADMIN' : 'MEMBER'} </p>
        </div>
        <div>
          <h2>Saved Items</h2>
        </div>
        <div>
          <h2>Order Track</h2>
        </div>
        <div>
          <h2>Reviews</h2>
        </div>
        {user.isAdmin && (
          <div>
            <h2>Admin Portal</h2>
          </div>
        )}

      </div>
    ) : (
      <h2>This account does not exist</h2>
    )

  )
};

export default Profile;
