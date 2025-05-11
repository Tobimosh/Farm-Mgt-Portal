import { useState } from "react";
import { ClipboardList, BarChart3, Home, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearFarmsData } from "@/slices/farmSlices";
import FarmRegistrationForm from "@/components/FarmRegistrationForm";
import DailyFarmReportForm from "@/components/DailyFarmReport";
import { Tabs, TabContent } from "@/components/Tabs";
import { Dashboard } from "@/components/Dashboard";
import { saveState } from "@/lib/localStorage";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "registration", label: "Farm Registration", icon: Home },
  { id: "daily-report", label: "Daily Report", icon: ClipboardList },
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const dispatch = useDispatch();

  const handleClearFarmData = () => {
    dispatch(clearFarmsData());
    localStorage.removeItem("farms");
    saveState("farms", []);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-slate-50 to-slate-100 py-10 px-4">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">
          Farm Management System
        </h1>
        <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
          Register and manage your farms, track daily reports, and analyze
          performance metrics.
        </p>

        <div className=" max-w-3xl mx-auto mb-8">
          <Tabs tabs={tabs} defaultTabId="dashboard" onChange={setActiveTab} />
        </div>

        <div className="flex justify-center mb-4">
          <button
            onClick={handleClearFarmData}
            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="mr-2" />
            Clear Farm Data
          </button>
        </div>

        <div className="mt-8">
          <TabContent tabId="dashboard" activeTabId={activeTab}>
            <Dashboard />
          </TabContent>

          <TabContent tabId="registration" activeTabId={activeTab}>
            <FarmRegistrationForm />
          </TabContent>

          <TabContent tabId="daily-report" activeTabId={activeTab}>
            <DailyFarmReportForm />
          </TabContent>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
