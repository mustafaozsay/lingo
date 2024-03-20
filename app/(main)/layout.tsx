import MobileHeader from "@/components/mobile-header";
import SideBar from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <>
      <MobileHeader />
      <SideBar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto h-full pt-6">{children}</div>
      </main>
    </>
  );
}
