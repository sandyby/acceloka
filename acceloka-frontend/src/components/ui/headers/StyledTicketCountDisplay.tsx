import StyledTypography from "../StyledTypography";

export default function StyledTicketCountDisplay({ count = 0 }: { count?: number }) {
    return (
        <>
            <StyledTypography fontSizeInput={20} colorInput="white" fontWeightInput="normal" >
                <span className="font-bold">{count}</span>{` tickets found`}
            </StyledTypography >
        </>
    );
}