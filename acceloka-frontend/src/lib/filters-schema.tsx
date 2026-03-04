import { z } from "zod";

export const FilterSchema = z.object({
    maxprice: z.coerce.number().min(0, "The max. price can't be negative!").max(999999999, "The max. price limit is 999999999!"),
    airline: z.string().optional().catch(undefined),
    mindeparture: z.string().optional().catch(undefined),
    maxdeparture: z.string().optional().catch(undefined),
}).refine((filters) => {
    if (filters.mindeparture && filters.maxdeparture) {
        return new Date(filters.maxdeparture) >= new Date(filters.mindeparture);
    }
    return true;
}, {
    message: "Max. departure time must be after the min. departure time!",
    path: ["maxdeparture"],
});

export type FilterType = z.infer<typeof FilterSchema>;