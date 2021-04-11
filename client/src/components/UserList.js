import React from "react";
import { useQuery } from '@apollo/client';
import { GetUsers } from '../graphql/user-queries';

function UserList() {
  const { loading, error, data } = useQuery(GetUsers);

  if (loading) return <p className="errorMessage">Loading...</p>;
  if (error) return <p className="errorMessage">Error: {error.message}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {
          data.users.map(item => (
           <tr key={item.id}>
             <td>{item.username}</td>
             <td>{item.email}</td>
             <td>{item.isAdmin ? "ADMIN" : "MEMBER"}</td>
           </tr>
         ))
        }
      </tbody>
    </table>
  )
};

export default UserList;
