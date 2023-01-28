import { useEffect, useState } from "react";
import UserDropDown from "../UserDropDown/UserDropDown";
import { User, Friendship, RootState } from "../../constants/types";
import { useDispatch, useSelector } from "react-redux";
import { addFriendship, clearMessages, getUsers } from "../../store/users/actions";
import { findDegree } from "../../utils/helper";

interface FriendshipProps {
  tabName: string;
}

const FriendshipCard = ({ tabName }: FriendshipProps) => {
  const dispatch = useDispatch();
  const { status, error, sucessMessage, users } = useSelector((state: RootState) => state.users);

  const emptyUserState: User = {
    id: "",
    username: "",
    friends: [],
  };

  const [friend1, setFriend1] = useState<User>(emptyUserState);
  const [friend2, setFriend2] = useState<User>(emptyUserState);
  const [isFriendList1Open, setFriendList1Open] = useState<boolean>(false);
  const [isFriendList2Open, setFriendList2Open] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [path, setPath] = useState<User[][]>();

  const toggleDropDown = (number: string) => {
    number === "one"
      ? setFriendList1Open(!isFriendList1Open)
      : setFriendList2Open(!isFriendList2Open);
  };

  const onSetFriendShip = () => {
    if (friend1?.id === friend2?.id) {
      setErrorMessage("Please select different friend!");
      return;
    }
    if (!friend1 || !friend2) {
      setErrorMessage("Please select both users!");
      return;
    }
    if (friend1.friends?.includes(friend2.id)) {
      setErrorMessage("User are already Friends!");
      return;
    }
    const friendship: Friendship = {
      user1: friend1,
      user2: friend2,
    };
    dispatch(addFriendship(friendship));
  };

  const onFindRelation = () => {
    if (friend1?.id === friend2?.id) {
      setErrorMessage("Please select different friend!");
      return;
    }
    if (!friend1 || !friend2) {
      setErrorMessage("Please select both users!");
      return;
    }
    const degrees = findDegree(friend1, friend2, users);
    setPath(degrees);
  };

  const getUsersData = async () => {
    await dispatch(getUsers());
  };

  useEffect(() => {
    if (!users.length) {
      getUsersData();
    }
    return () => {
      dispatch(clearMessages());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="drop-down">
        <label>1st Friend Name</label>
        <UserDropDown
          toggleDropDown={() => toggleDropDown("one")}
          onSelect={(user) => setFriend1(user)}
          isOpen={isFriendList1Open}
          selectedUser={friend1}
        />
      </div>
      <div className="drop-down">
        <label>2nd Friend Name</label>
        <UserDropDown
          toggleDropDown={() => toggleDropDown("two")}
          onSelect={(user) => setFriend2(user)}
          isOpen={isFriendList2Open}
          selectedUser={friend2}
        />
        <button
          type="submit"
          onClick={tabName === "Set Friendship" ? onSetFriendShip : onFindRelation}
        >
          {tabName === "Set Friendship" ? (
            status === "saving" ? (
              <div className="loader" />
            ) : (
              "Save"
            )
          ) : (
            "Find"
          )}
        </button>
        {errorMessage && <div className="error-text">{errorMessage}</div>}
        {error && <div className="error-text">{error.message}</div>}
        {sucessMessage && <div className="success-message">{sucessMessage}</div>}
        {path && (
          <div className="user-path-container">
            <div>
              {path?.[0]?.map(
                (user, i) => `${user.username} ${i < path[0].length - 1 ? ">>" : ""}`
              ) || "Not Related"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendshipCard;
