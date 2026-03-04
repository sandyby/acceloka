import { z } from "zod";

export const FilterSchema = z.object({
    maxprice: z.preprocess((val) => (
        val === "" || val === null || val === undefined ? undefined : val),
        z.coerce.number().min(0, "The max. price can't be below Rp 0!").max(999999999, "The max. price limit is Rp 999.999.999!").optional(),
    ).catch(undefined),
    airlines: z.preprocess((val) => {
        if (Array.isArray(val) && val.length === 0) {
            return undefined;
        }
        return val;
    }, z.array(z.string()).optional()).catch(undefined),
    seatclasses: z.preprocess((val) => {
        if (Array.isArray(val) && val.length === 0) {
            return undefined;
        }
        return val;
    }, z.array(z.string()).optional()).catch(undefined),
    amenities: z.preprocess((val) => {
        if (Array.isArray(val) && val.length === 0) {
            return undefined;
        }
        return val;
    }, z.array(z.string()).optional()).catch(undefined),
    mindeparture: z.string().optional().catch(undefined),
    maxdeparture: z.string().optional().catch(undefined),
    minarrival: z.string().optional().catch(undefined),
    maxarrival: z.string().optional().catch(undefined),
}).superRefine((filters, ctx) => {
    const now = new Date();

    const checkPast = (dateStr: string | undefined, fieldName: string, label: string) => {
        if (dateStr && new Date(dateStr) < now) {
            ctx.addIssue({
                code: 'custom',
                message: `${label} can't be in the past!`,
                path: [fieldName],
            });
        }
    };

    checkPast(filters.mindeparture, "mindeparture", "Min. departure");
    checkPast(filters.maxdeparture, "maxdeparture", "Max. departure");
    checkPast(filters.minarrival, "minarrival", "Min. arrival");
    checkPast(filters.maxarrival, "maxarrival", "Max. arrival");

    if (filters.mindeparture && filters.maxdeparture && (new Date(filters.maxdeparture) < new Date(filters.mindeparture))) {
        ctx.addIssue({
            code: 'custom',
            message: "Max. departure must be greater than or equal to min. departure!",
            path: ["maxdeparture"],
        });
    }

    if (filters.minarrival && filters.maxarrival && (new Date(filters.maxarrival) < new Date(filters.minarrival))) {
        ctx.addIssue({
            code: 'custom',
            message: "Max. arrival must be greater than or equal to min. arrival!",
            path: ["maxarrival"],
        });
    }

    if (filters.maxdeparture && filters.minarrival && (new Date(filters.minarrival) < new Date(filters.maxdeparture))) {
        ctx.addIssue({
            code: 'custom',
            message: "Arrival time must after the departure time!",
            path: ["minarrival"],
        });
    }

    if (filters.mindeparture && filters.maxarrival && (new Date(filters.maxarrival) < new Date(filters.mindeparture))) {
        ctx.addIssue({
            code: 'custom',
            message: "Arrival time must at least be after the departure time starts!",
            path: ["maxarrival"],
        });
    }
});

export type FilterType = z.infer<typeof FilterSchema>;