import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ContentTabs } from "./ContentTabs";
import { SHELL } from "@/constants/testIds";

export function AppShell() {
  return (
    <div
      data-testid={SHELL.app}
      className="flex h-screen w-full overflow-hidden bg-background text-foreground"
    >
      <Sidebar />
      <div className="flex h-full min-w-0 flex-1 flex-col">
        <Topbar />
        <ContentTabs />
        <main className="scrollbar-soft flex-1 overflow-y-auto px-8 py-8">
          <div className="mx-auto w-full max-w-[1400px] animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
