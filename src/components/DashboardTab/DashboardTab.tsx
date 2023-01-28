import { TABS } from "../../constants/constants";
import "./tabs.css";

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTab = ({ activeTab, setActiveTab }: TabProps) => {
  return (
    <div className="tab-container">
      {TABS.map((tab) => (
        <div
          onClick={() => setActiveTab(tab)}
          className={`tab ${activeTab === tab ? "active" : ""}`}
          key={tab}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default DashboardTab;
