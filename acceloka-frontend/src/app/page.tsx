import AccelokaLogo from "@/components/layout/AccelokaLogo";
import Filters from "@/components/layout/Filters";
import Menu from "@/components/layout/Menu";

export default function Home() {
  return (
    <>
      <main className="relative scroll-smooth h-screen w-screen overflow-hidden no-scroll">
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <AccelokaLogo />
        </div>
        <div className="absolute top-40 left-1/2 -translate-x-1/2">
          <Menu />
        </div>
        <div className="mt-[264px] mx-[88px] mb-[88px] grid grid-cols-[360px_1fr] grid-rows-[110px_1fr_48px] gap-x-6 gap-y-4 h-[calc(100vh-264px-88px)]">
          {/* <div id="filter" className="h-[403px] bg-red-100 row-span-3"></div> */}
          <div className="h-[403px] bg-red-100 row-span-3">
            <Filters />
          </div>
          <div id="header" className="items-start w-[234px] bg-zinc-100"></div>
          <div id="cards" className="bg-yellow-100 overflow-auto"></div>
          <div
            id="pagination"
            className="mx-auto w-[404px] bg-emerald-100"
          ></div>
        </div>
      </main>
    </>
  );
}
