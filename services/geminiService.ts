
import { GoogleGenAI, Modality } from "@google/genai";
import type { EditedImageResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function editImageWithNanoBanana(
  base64ImageDataUrl: string,
  prompt: string
): Promise<EditedImageResult> {
    
  const [header, base64Data] = base64ImageDataUrl.split(',');
  const mimeType = header.match(/:(.*?);/)?.[1];

  if (!mimeType || !base64Data) {
    throw new Error("Invalid image data URL format.");
  }

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: prompt,
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let editedImageUrl = '';
    let editedText = "The AI didn't provide any text feedback.";

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData) {
        editedImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      } else if (part.text) {
        editedText = part.text;
      }
    }

    if (!editedImageUrl) {
        throw new Error("The AI model did not return an image. Please try again with a different prompt.");
    }

    return { imageUrl: editedImageUrl, text: editedText };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to edit image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while editing the image.");
  }
}
