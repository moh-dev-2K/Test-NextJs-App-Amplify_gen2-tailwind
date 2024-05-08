import Header from "@/components/Header/Header";
import MainContainer from "@/components/MainContainer/MainContainer";
import Sidebar from "@/components/Sidebar/Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-[#ffffff] flex flex-col">
      <div className="h-fit">
        <Header />
      </div>
      <div className="flex flex-1">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 h-full">
          <MainContainer>{children}</MainContainer>
        </div>
      </div>
    </div>
  );
}

export default Layout;
