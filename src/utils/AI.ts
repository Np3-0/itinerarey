import { GoogleGenAI } from "@google/genai";
import * as z from "zod";
import type { cookieData } from "./cookies.ts";

export async function getResponseFromAI(cookieData: cookieData ) {
    const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});
    const aiInput = `Location: ${cookieData.destination} | 
                    Budget: ${cookieData.budgets.activity} | 
                    Startdate: ${cookieData.dates.startDate} | 
                    Enddate: ${cookieData.dates.endDate}`

    const activityJSONSchema = z.object({
        activity: z.string().describe("Name of the activity."),
        location: z.string().describe("Address of the activity."),
        desc:  z.string().describe("Description of the activity."),
        price: z.number().describe("Price of the activity."),
        additionalInfo: z.string().describe("Anything additional about the activity."),
    });
    const activityListSchema = z.array(activityJSONSchema);
    const fullSchema = z.toJSONSchema(activityListSchema);

    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        system_instruction: `You are an AI bot tasked with finding activities to do in specific places,
            for a specific amount of days. Return a wide variety of activities, each with its price,
            location, description, and any extra info. The total should fit within the given budget.`,
        input: aiInput,
        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: fullSchema
        }
    });

    if (!interaction.output_text) return [];
    const res = activityListSchema.parse(JSON.parse(interaction.output_text));
    return res;
}