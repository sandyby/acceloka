import AccelokaLogo from "@/components/layout/AccelokaLogo";
import Filters from "@/components/layout/Filters";
import Menu from "@/components/layout/Menu";
import TicketCards from "@/components/layout/TicketCards";
import TicketsHeader from "@/components/layout/TicketsHeader";
import ActiveCategoryContextProvider from "@/contexts/ActiveCategoryContext/ActiveCategoryProvider";

export default function Home() {

  return (
    <>
      <ActiveCategoryContextProvider>
        <main className="relative scroll min-h-screen min-w-screen grid place-items-center">
          <div id="main-wrapper" className="w-full">
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <AccelokaLogo />
            </div>
            <div className="absolute top-40 left-1/2 -translate-x-1/2">
              <Menu />
            </div>

            <div className="h-fit mt-[264px] mx-[88px] mb-[88px] grid grid-cols-[360px_1fr] grid-rows-[110px_360px_48px] gap-x-6 gap-y-4">
              {/* <div id="filter" className="h-[403px] bg-red-100 row-span-3"></div> */}
              <div className="h-[403px] bg-red-100 row-span-3">
                <Filters />
              </div>
              <div id="header-wrapper" className="items-start w-full">
                <TicketsHeader />
              </div>
              <div id="cards" className="overflow-y-scroll no-scroll">
                <TicketCards />
              </div>
              <div
                id="pagination"
                className="mx-auto w-[404px] bg-emerald-100"
              ></div>
            </div>
          </div>
        </main>

        <footer>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam commodi facere nostrum odit ipsam, est error quia in modi! Sed harum qui nam, quo dignissimos quia fugit quas minima nihil aspernatur minus impedit distinctio aliquam, officia ab consequuntur corporis sint animi rerum nesciunt? Ut dolor hic, dignissimos voluptatem qui deleniti doloribus enim consequuntur sequi dolorem architecto similique tenetur commodi dolore veniam numquam veritatis, placeat autem tempora ratione blanditiis perferendis exercitationem molestias obcaecati. Vero molestias modi cupiditate amet assumenda inventore? Praesentium minima at fugiat esse similique expedita reprehenderit. Eos voluptatem id voluptas deserunt qui maxime non est quod dolorum fuga atque vero nobis magnam repudiandae possimus aliquam beatae corporis reprehenderit dolores impedit, neque, ipsa ratione? Minima beatae explicabo atque nostrum aliquid quos voluptatem provident. Aliquid veniam quasi possimus tempora odio! Quis nostrum reiciendis enim voluptate repudiandae odio animi illo ex laboriosam corrupti libero magni iusto quas ad aliquam maxime qui necessitatibus numquam nam sapiente minima ipsum, dignissimos distinctio quisquam? Quae, asperiores! Ipsam molestias, quo vero hic necessitatibus voluptatem quas porro tempore doloribus, qui atque ab assumenda nostrum reprehenderit! Iusto eos commodi magni cupiditate, maiores excepturi doloremque culpa eum vitae laborum deleniti provident reiciendis qui unde asperiores harum molestiae iste magnam quasi.
          </div>
        </footer>
      </ActiveCategoryContextProvider>
    </>
  );
}
