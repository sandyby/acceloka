import { useTicketsData } from "@/contexts/TicketsDataContext";
import StyledTicketCountDisplaySkeleton from "../skeletons/StyledTicketCountDisplaySkeleton";
import StyledTypography from "../StyledTypography";

export default function StyledTicketCountDisplay({ count }: { count?: number }) {
    const { isFetching, isError } = useTicketsData();

    if (isFetching && count === undefined) {
        return <StyledTicketCountDisplaySkeleton height={"40px"} />;
    }

    if (!isFetching && (isError || count === undefined)) {
        return <StyledTypography fontSizeInput={20} colorInput="white" fontWeightInput="normal">
            <span className="font-bold">0</span> tickets found
        </StyledTypography>
    }

    return (
        <StyledTypography fontSizeInput={20} colorInput="white" fontWeightInput="normal">
            <span className="font-bold">{count}</span> tickets found
        </StyledTypography>
    );
}