import { z } from "zod";

export const FilterSchema = z.object({
    maxprice: z.preprocess((val) => (
        val === "" || val === null || val === undefined ? undefined : val),
        z.coerce.number().min(0, "The max. price can't be below Rp 0!").max(999999999, "The max. price limit is Rp 999.999.999!").optional(),
    ).catch(undefined),
    maxoccupancy: z.preprocess((val) => (
        val === "" || val === null || val === undefined ? undefined : val),
        z.coerce.number().min(1, "Max. occupancy can't be lower than 1!").max(999, "Max. occupancy can't be greater than 999!").optional(),
    ).catch(undefined),
    seatclasses: z.preprocess((val) => {
        if (Array.isArray(val) && val.length === 0) {
            return undefined;
        }
        return val;
    }, z.array(z.string()).optional()).catch(undefined),
    seatsections: z.preprocess((val) => {
        if (Array.isArray(val) && val.length === 0) {
            return undefined;
        }
        return val;
    }, z.array(z.string()).optional()).catch(undefined),
    airlines: z.preprocess((val) => {
        if (Array.isArray(val) && val.length === 0) {
            return undefined;
        }
        return val;
    }, z.array(z.string()).optional()).catch(undefined),
    hotelnames: z.preprocess((val) => {
        if (Array.isArray(val) && val.length === 0) {
            return undefined;
        }
        return val;
    }, z.array(z.string()).optional()).catch(undefined),
    venues: z.preprocess((val) => {
        if (Array.isArray(val) && val.length === 0) {
            return undefined;
        }
        return val;
    }, z.array(z.string()).optional()).catch(undefined),
    roomtypes: z.preprocess((val) => {
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
    packages: z.preprocess((val) => {
        if (Array.isArray(val) && val.length === 0) {
            return undefined;
        }
        return val;
    }, z.array(z.string()).optional()).catch(undefined),
    mindeparture: z.string().optional().catch(undefined),
    maxdeparture: z.string().optional().catch(undefined),
    minarrival: z.string().optional().catch(undefined),
    maxarrival: z.string().optional().catch(undefined),
    mincheckin: z.string().optional().catch(undefined),
    maxcheckout: z.string().optional().catch(undefined),
    minconcert: z.string().optional().catch(undefined),
    maxconcert: z.string().optional().catch(undefined),
}).superRefine((filters, ctx) => {
    const now = new Date();

    const checkPastDateTime = (dateStr: string | undefined, fieldName: string, label: string) => {
        if (dateStr && new Date(dateStr) < now) {
            ctx.addIssue({
                code: 'custom',
                message: `${label} can't be in the past!`,
                path: [fieldName],
            });
        }
    };

    const checkPastDateonly = (dateStr: string | undefined, fieldName: string, label: string) => {
        if (dateStr && new Date(dateStr).getDate() < now.getDate()) {
            ctx.addIssue({
                code: 'custom',
                message: `${label} can't be in the past!`,
                path: [fieldName],
            });
        }
    };

    checkPastDateTime(filters.mindeparture, "mindeparture", "Min. departure time");
    checkPastDateTime(filters.maxdeparture, "maxdeparture", "Max. departure time");
    checkPastDateTime(filters.minarrival, "minarrival", "Min. arrival time");
    checkPastDateTime(filters.maxarrival, "maxarrival", "Max. arrival time");
    checkPastDateTime(filters.mincheckin, "mincheckin", "Min. check in time");
    checkPastDateTime(filters.maxcheckout, "maxcheckout", "Max. check out time");
    checkPastDateonly(filters.minconcert, "minconcert", "Min. concert date");
    checkPastDateonly(filters.maxconcert, "maxconcert", "Max. concert date");

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

    if (filters.mincheckin && filters.maxcheckout && (new Date(filters.maxcheckout) < new Date(filters.mincheckin))) {
        ctx.addIssue({
            code: 'custom',
            message: "Check out time must be after the check in time!",
            path: ["maxcheckout"],
        });
    }

    if (filters.minconcert && filters.maxconcert && (new Date(filters.maxconcert) < new Date(filters.minconcert))) {
        ctx.addIssue({
            code: 'custom',
            message: "Max. concert date must be greater than the min. concert date!",
            path: ["maxconcert"],
        });
    }
});

export type FilterType = z.infer<typeof FilterSchema>;