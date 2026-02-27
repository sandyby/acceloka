import { Suspense } from "react"
import StyledTicketsHeaderSkeleton from "../ui/skeletons/StyledTicketCountDisplaySkeleton"
import TicketsHeader from "./TicketsHeader"

export default function TicketsHeaderWrapper() {
    return (
        <Suspense fallback={<StyledTicketsHeaderSkeleton height={"30px"} />}>
            <TicketsHeader />
        </Suspense>
    )
}