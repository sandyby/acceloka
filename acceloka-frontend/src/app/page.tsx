import AccelokaLogo from "@/components/layout/AccelokaLogo";
import Filters from "@/components/layout/Filters";
import Menu from "@/components/layout/Menu";
import TicketContents from "@/components/layout/TicketContents";
import TicketsHeader from "@/components/layout/TicketsHeader";
import StyledTicketCardsSkeleton from "@/components/ui/skeletons/StyledTicketCardsSkeleton";
import StyledTicketContentsSkeleton from "@/components/ui/skeletons/StyledTicketContentsSkeleton";
import ActiveCategoryContextProvider from "@/contexts/ActiveCategoryContext/ActiveCategoryProvider";
import TotalTicketsFilteredProvider from "@/contexts/TotalTicketsFilteredContext/TotalTicketsFilteredContext";
import { Suspense } from "react";

export default function Home() {

  return (
    <>
      <ActiveCategoryContextProvider>
        <main className="relative scroll-smooth scroll no-scroll min-w-screen h-screen overflow-hidden">
          <div id="main-wrapper" className="h-fit mt-2 mx-22 mb-22 flex flex-col justify-center items-center">
            <div className="w-full flex flex-col gap-y-3 items-center">
              <AccelokaLogo />
              <Menu />
              <TotalTicketsFilteredProvider>
                <div className="h-fit w-full grid grid-cols-[360px_minmax(0,auto)] grid-rows-[110px_1fr_48px] gap-x-6 gap-y-4 mt-2.5">
                  <div className="bg-red-100 row-span-3 h-100 overflow-y-auto">
                    <Filters />
                  </div>
                  <Suspense fallback={<StyledTicketContentsSkeleton />}>
                    <TicketContents />
                  </Suspense>
                </div>
              </TotalTicketsFilteredProvider>
            </div>
          </div>
        </main >
      </ActiveCategoryContextProvider >
    </>
  );
}
