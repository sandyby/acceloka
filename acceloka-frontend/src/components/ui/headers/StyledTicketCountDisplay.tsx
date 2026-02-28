import StyledTicketCountDisplaySkeleton from "../skeletons/StyledTicketCountDisplaySkeleton";
import StyledTypography from "../StyledTypography";

export default function StyledTicketCountDisplay({ count }: { count?: number }) {
    if (count === undefined) {
        return <StyledTicketCountDisplaySkeleton height={"20px"} />;
    }

    return (
        <StyledTypography fontSizeInput={20} colorInput="white" fontWeightInput="normal">
            <span className="font-bold">{count}</span> tickets found
        </StyledTypography>
    );
}