import { z } from "zod";

export const NameInfo = z.object({
    name: z.object({
        common: z.string(),
        official: z.string(),
        nativeName: z.record(z.string(), z.object({
            official: z.string(),
            common: z.string(),
        }))
    }),
})

export const DetailInfo = z.object({
    tld: z.string().array().optional(),
    cca3: z.string(),
    currencies: z.record(z.string(), z.object({
        name: z.string(),
        symbol: z.string(),
    })),
    capital: z.string().array(),
    region: z.string(),
    subregion: z.string().optional(),
    languages: z.record(z.string(), z.string()),
    borders: z.string().array().optional(),
    population: z.number(),
    flags: z.object({
        png: z.string(),
        svg: z.string(),
        alt: z.string().optional(),
    })
}).merge(NameInfo)

export const CodeInfo = z.object({
    cca3: z.string(),
}).merge(NameInfo).array();

export const DetailsInfo = DetailInfo.array();

export type DetailsInfo = z.infer<typeof DetailsInfo>;
export type DetailInfo = z.infer<typeof DetailInfo>;
export type NameInfo = z.infer<typeof NameInfo>;
export type CodeInfo = z.infer<typeof CodeInfo>;