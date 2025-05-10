import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  id: string;
  label: string;
  icon: React.ElementType;
};

type TabsProps = {
  tabs: Tab[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
};

export function Tabs({
  tabs,
  defaultTabId = tabs[0]?.id,
  onChange,
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [indicatorLeft, setIndicatorLeft] = useState(0);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Update the indicator position when the active tab changes
  useEffect(() => {
    const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const activeTabRef = tabRefs.current[activeTabIndex];

    if (activeTabRef) {
      setIndicatorWidth(activeTabRef.offsetWidth);
      setIndicatorLeft(activeTabRef.offsetLeft);
    }
  }, [activeTab, tabs]);

  // Update indicator position on window resize
  useEffect(() => {
    const handleResize = () => {
      const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
      const activeTabRef = tabRefs.current[activeTabIndex];

      if (activeTabRef) {
        setIndicatorWidth(activeTabRef.offsetWidth);
        setIndicatorLeft(activeTabRef.offsetLeft);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab, tabs]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center justify-center md:justify-start border-slate-200 overflow-x-auto">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isActive
                  ? "text-green-700"
                  : "text-slate-600 hover:text-slate-900"
              )}
              aria-selected={isActive}
              role="tab"
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}

        {/* Animated indicator */}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-green-600 rounded-full"
          initial={false}
          animate={{
            width: indicatorWidth,
            left: indicatorLeft,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>
    </div>
  );
}

export function TabContent({
  tabId,
  activeTabId,
  children,
}: {
  tabId: string;
  activeTabId: string;
  children: React.ReactNode;
}) {
  const isActive = tabId === activeTabId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 10,
        zIndex: isActive ? 1 : 0,
        position: "relative",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={cn("w-full", isActive ? "block" : "hidden")}
      role="tabpanel"
    >
      {children}
    </motion.div>
  );
}
