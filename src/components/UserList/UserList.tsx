import { useEffect } from "react";
import { ReactComponent as People } from "../../assets/people.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../constants/types";
import { getUsers } from "../../store/users/actions";

const UserList = () => {
  const dispatch = useDispatch();
  const { status, error, users } = useSelector((state: RootState) => state.users);

  const getUsersData = async () => {
    await dispatch(getUsers());
  };

  useEffect(() => {
    if (!users.length) {
      getUsersData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container user-list">
      {status === "loading" ? (
        <div className="loader-container">
          <div className="loader loader-dark" />
        </div>
      ) : (
        users.map((user) => (
          <div className="user-list-container" key={user.id}>
            <div>
              <People height={40} />
            </div>
            <div>
              <div className="user-name">{user.username}</div>
              <div className="user-name">
                Friends:
                <table>
                  <tbody>
                    {user.friends?.map((friend, index) => (
                      <tr key={user.id + friend}>
                        <td>{index + 1}.</td>
                        <td>{users.find((user) => user.id === friend)?.username}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))
      )}
      {error && <div className="error-text">{error.message}</div>}
    </div>
  );
};

export default UserList;
