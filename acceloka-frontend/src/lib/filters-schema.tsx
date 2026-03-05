import { z } from "zod";

export const FilterSchema = z.object({
    maxprice: z.preprocess((val) => (
        val === "" || val === null || val === undefined ? undefined : val),
        z.coerce.number("Max. price must be a number!").min(0, "The max. price can't be below Rp 0!").max(999999999, "The max. price limit is Rp 999.999.999!").optional(),
    ),
    maxoccupancy: z.preprocess((val) => (
        val === "" || val === null || val === undefined ? undefined : val),
        z.coerce.number().min(1, "Max. occupancy can't be lower than 1!").max(999, "Max. occupancy can't be greater than 999!").optional(),
    ),
    baggagekg: z.preprocess((val) => (
        val === "" || val === null || val === undefined ? undefined : val),
        z.coerce.number("Max. baggage (kg) must be a number!")
            .min(0, "Max. baggage (kg) can't be lighter than 0kg!")
            .max(100, "Max. baggage (kg) can't be heavier than 100kg!").optional(),
    ),
    direct: z.preprocess((val) => {
        if (typeof val === "string") {
            const loweredVal = val.toLowerCase();
            if (loweredVal === "false") {
                return false;
            } else if (loweredVal === "true") {
                return true;
            }
        }
        if (typeof val === "boolean") {
            return val;
        }
        return undefined;
    }, z.boolean().optional()),
    maxduration: z.preprocess(
        (val) => (val === "" || val === null ? undefined : val),
        z.string().optional()
    ).pipe(
        z.string()
            .regex(/^(00|\d{2}):([0-5]\d)$/, "Max. duration must have a valid Format HH:mm!")
            .transform((val) => {
                const [hours, minutes] = val.split(":").map(Number);
                return hours * 60 + minutes;
            })
            .refine((val) => val > 0, "Max. duration must be at least 1 minute!")
            .optional()
    ),
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
    cinemas: z.preprocess((val) => {
        if (Array.isArray(val) && val.length === 0) {
            return undefined;
        }
        return val;
    }, z.array(z.string()).optional()).catch(undefined),
    types: z.preprocess((val) => {
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
    minscreening: z.string().optional().catch(undefined),
    maxscreening: z.string().optional().catch(undefined),
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
    checkPastDateTime(filters.minscreening, "minscreening", "Min. screening time");
    checkPastDateTime(filters.maxscreening, "maxscreening", "Max. screening time");

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

    if (filters.minscreening && filters.maxscreening && (new Date(filters.maxscreening) < new Date(filters.minscreening))) {
        ctx.addIssue({
            code: 'custom',
            message: "Max. screening time must be greater than the min. screening time!",
            path: ["maxscreening"],
        });
    }
});

export type FilterType = z.infer<typeof FilterSchema>;