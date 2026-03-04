"use client";

import SliderWithTooltip from "@/components/ui/SliderWithTooltip";

export default async function TicketsPage() {

    return (
        <div className="absolute h-screen w-screen mt-50">
            <div className="absolute inset-0 bg-white-900 max-w-200 h-60 rounded-[16px] mask-[linear-gradient(white,white)] mask-no-repeat mask-exclude [-webkit-mask-composite:destination-out]">
                <div className="w-12 h-full absolute right-1/4 top-0">
                    <span className="absolute w-12 h-12 rounded-full bg-secondary-900 -top-1/10 mx-auto">
                    </span>
                    <span className="absolute w-12 h-12 rounded-full bg-secondary-900 -bottom-1/10 mx-auto">
                    </span>
                    <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full border-2 border-dashed border-secondary-900 mx-auto"></div>
                </div>
            </div>
            <div className="p-10">
                <SliderWithTooltip
                    min={0}
                    max={200}
                    step={5}
                    initialValue={100}
                    onChange={(val) => console.log("Slider value:", val)}
                />
            </div>
        </div>
    )
}