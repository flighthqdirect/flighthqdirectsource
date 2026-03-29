import { GoogleGenAI, Type } from "@google/genai";


export interface LiveFlightInfo {
  flightNumber: string;
  airline: string;
  status: string;
  departureTime: string;
  arrivalTime: string;
  gate?: string;
  terminal?: string;
  delay?: string;
}

export interface MarketInsight {
  route: string;
  averagePrice: string;
  bestTimeToBook: string;
  trend: "up" | "down" | "stable";
  summary: string;
}

export const getLiveFlightStatus = async (flightNumber: string): Promise<LiveFlightInfo | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find the current real-time status for flight ${flightNumber}. Provide details in JSON format.`,
      config: {
        temperature: 0.2, // Low temperature for factual data
        topP: 0.8,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            flightNumber: { type: Type.STRING },
            airline: { type: Type.STRING },
            status: { type: Type.STRING, description: "e.g., Scheduled, On Time, Delayed, Landed" },
            departureTime: { type: Type.STRING },
            arrivalTime: { type: Type.STRING },
            gate: { type: Type.STRING },
            terminal: { type: Type.STRING },
            delay: { type: Type.STRING },
          },
          required: ["flightNumber", "airline", "status", "departureTime", "arrivalTime"],
        },
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as LiveFlightInfo;
  } catch (error) {
    console.error("Error fetching live flight status:", error);
    return null;
  }
};

export const getMarketInsights = async (from: string, to: string): Promise<MarketInsight | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
    const origin = from || "any major hub";
    const destination = to || "any major destination";
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide real-time market insights for the flight route from ${origin} to ${destination}. 
      If one of the locations is not specified, provide general market trends for the specified location.
      Include current price trends and best time to book.`,
      config: {
        temperature: 0.4, // Slightly higher for insights/summaries
        topP: 0.8,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            route: { type: Type.STRING },
            averagePrice: { type: Type.STRING },
            bestTimeToBook: { type: Type.STRING },
            trend: { type: Type.STRING, enum: ["up", "down", "stable"] },
            summary: { type: Type.STRING },
          },
          required: ["route", "averagePrice", "bestTimeToBook", "trend", "summary"],
        },
      },
    });

    const text = response.text;
    console.log("Gemini Market Insights Response:", text);
    if (!text) {
      console.warn("No response text from Gemini for market insights");
      return null;
    }
    return JSON.parse(text) as MarketInsight;
  } catch (error) {
    console.error("Error fetching market insights:", error);
    return null;
  }
};
