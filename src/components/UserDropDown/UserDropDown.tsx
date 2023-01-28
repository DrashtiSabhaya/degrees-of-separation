import "./dropdown.css";
import { ReactComponent as DownArrow } from "../../assets/down-arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState, User } from "../../constants/types";
import { getUsers } from "../../store/users/actions";
import { useEffect } from "react";

interface DropDownProps {
  toggleDropDown: () => void;
  onSelect: (user: User) => void;
  isOpen: boolean;
  selectedUser?: User;
}

const UserDropDown = ({ toggleDropDown, onSelect, isOpen, selectedUser }: DropDownProps) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.users);

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
    <div>
      <div className="drop-down-box" onClick={toggleDropDown}>
        <div>{selectedUser?.username ? selectedUser.username : "Select User"}</div>
        <DownArrow width={25} />
      </div>
      {isOpen && (
        <div className="drop-down-list">
          {users.map((user: User) => (
            <div
              className="drop-down-item"
              key={user.id + new Date().getMilliseconds()}
              onClick={() => {
                onSelect(user);
                toggleDropDown();
              }}
            >
              {user.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDropDown;
