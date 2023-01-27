import "./dashboard.css";
import AddUser from "../components/AddUser/AddUser";
import { useState } from "react";
import { TABS } from "../constants/constants";
import DashboardTab from "../components/DashboardTab/DashboardTab";
import AddFriendship from "../components/FriendshipCard/FriendshipCard";
import UserList from "../components/UserList/UserList";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const changeTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="main-container">
      <DashboardTab activeTab={activeTab} setActiveTab={changeTab} />
      {TABS[0] === activeTab && <AddUser />}
      {TABS[1] === activeTab && <UserList />}
      {TABS[2] === activeTab && <AddFriendship tabName={TABS[2]} />}
      {TABS[3] === activeTab && <AddFriendship tabName={TABS[3]} />}
    </div>
  );
};

export default Dashboard;
