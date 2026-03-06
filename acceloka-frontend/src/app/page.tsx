import AccelokaLogo from "@/components/layout/AccelokaLogo";
import Menu from "@/components/layout/Menu";
import TicketContents from "@/components/layout/TicketContents";
import StyledTicketContentsSkeleton from "@/components/ui/skeletons/StyledTicketContentsSkeleton";
import ActiveCategoryContextProvider from "@/contexts/ActiveCategoryContext";
import { TicketsDataProvider } from "@/contexts/TicketsDataContext";
import { TicketMetadataProvider } from "@/contexts/TicketMetadataContext";
import TotalTicketsFilteredProvider from "@/contexts/TotalTicketsFilteredContext";
import { Suspense } from "react";
import Filters from "@/components/layout/Filters";
import StyledFiltersSkeleton from "@/components/ui/skeletons/StyledFiltersSkeleton";
import { BookOnlineRounded } from "@mui/icons-material";
import BookingButton from "@/components/ui/BookingButton";
import { Drawer } from "@mui/material";
import { BookingsCartContextProvider } from "@/contexts/BookingsCartContext";
import BookingsCartDrawer from "@/components/layout/BookingsCartDrawer";

export default function Home() {

  return (
    <>
      <BookingsCartContextProvider>
        <main className="relative scroll-smooth scroll no-scroll min-w-dvw min-h-dvh">
          <BookingButton />
          <BookingsCartDrawer />
          <div id="main-wrapper" className="h-fit mt-2 mx-22 mb-22 flex flex-col justify-center items-center">
            <div className="w-full flex flex-col gap-y-3 items-center">
              <AccelokaLogo />
              <div className="relative">
                <Menu />
                {/* <div className="p-2.5 absolute top-1/2 -right-[79px] transform: -translate-y-1/2 rounded-full bg-primary-500">
                <BookOnlineRounded sx={{ fontSize: "36px", color: "var(--color-white-900)" }} />
              </div> */}
              </div>
              <TicketMetadataProvider>
                <TicketsDataProvider>
                  <TotalTicketsFilteredProvider>
                    <div className="h-full w-full grid grid-cols-[360px_968px] grid-rows-[110px_1fr_48px] gap-x-4 gap-y-4 mt-2.5">
                      <Filters />
                      <TicketContents />
                    </div>
                  </TotalTicketsFilteredProvider>
                </TicketsDataProvider>
              </TicketMetadataProvider>
            </div>
          </div>
        </main >
      </BookingsCartContextProvider>
    </>
  );
}
