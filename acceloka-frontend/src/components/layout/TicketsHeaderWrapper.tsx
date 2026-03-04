import { Suspense } from "react"
import StyledSingleRowSkeleton from "../ui/skeletons/StyledSingleRowSkeleton"
import TicketsHeader from "./TicketsHeader"

export default function TicketsHeaderWrapper() {
    return (
        <Suspense fallback={<StyledSingleRowSkeleton height={"30px"} />}>
            <TicketsHeader />
        </Suspense>
    )
}