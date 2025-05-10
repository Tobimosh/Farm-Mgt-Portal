"use client";

import { useState } from "react";
import { ClipboardList, BarChart3, Home } from "lucide-react";
import FarmRegistrationForm from "@/components/FarmRegistrationForm";
import DailyFarmReportForm from "@/components/DailyFarmReport";
import { Tabs, TabContent } from "@/components/Tabs";
import { Dashboard } from "@/components/Dashboard";

const tabs = [
  { id: "registration", label: "Farm Registration", icon: Home },
  { id: "daily-report", label: "Daily Report", icon: ClipboardList },
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("registration");

  return (
    <main className="min-h-screen  from-slate-50 to-slate-100 py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">
          Farm Management System
        </h1>
        <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
          Register and manage your farms, track daily reports, and analyze
          performance metrics.
        </p>

        <div className="bg-white rounded-lg shadow-sm mb-8">
          <Tabs
            tabs={tabs}
            defaultTabId="registration"
            onChange={setActiveTab}
          />
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
