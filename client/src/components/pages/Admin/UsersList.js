import React from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants";
import { useHistory } from "react-router-dom";
import styles from "./UsersList.module.css";
import { logout } from "../../../utils/Auth";
import Logout from "../../commons/Logout";

const UsersList = () => {
  const [users, setUsers] = React.useState([]);
  const history = useHistory();

  const authAxios = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const handleLogout = () => {
    logout();
    history.push("/adminLogin");
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const result = await authAxios.get("/api/users");
      if (Math.floor(result.status / 100) === 2) {
        setUsers(result.data);
      } else {
        handleLogout();
      }
    } catch (err) {
      handleLogout();
      console.error("Invalid token");
    }
  };
  return (
    <div className={styles.mainContainer}>
      <Logout />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, id) => (
            <tr key={id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
