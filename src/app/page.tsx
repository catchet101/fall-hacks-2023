"use client";
import React, { useState, useEffect } from "react";
import OpenAI from "openai";

export default function Home() {
  const [userInput, setUserInput] = useState(""); // State to hold user input
  const [responseText, setResponseText] = useState(""); // State to hold the response text

  const openAIBearerToken = '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';
  const openai = new OpenAI({
    apiKey: openAIBearerToken,
    dangerouslyAllowBrowser: true,
  });

  let messages: any = [];

  // Function to handle user input
  const handleUserInput = (event: any) => {
    setUserInput(event.target.value);
  };

  // Function to fetch OpenAI response
  const fetchOpenAIResponse = async () => {
    try {
      messages.push({
        role: "system",
        content: "You",
      });
      messages.push({
        role: "user",
        content: userInput,
      });

      // Fetch OpenAI response
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.8,
        max_tokens: 256,
      });

      // Set the response text in the component state
      let responseMessage = response.choices[0].message.content
      if (responseMessage != null) {
        setResponseText(responseMessage)
      }
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }
  };

  return (
    <div>
      <h1>OpenAI Response:</h1>
      <input
        type="text"
        placeholder="Enter your text"
        value={userInput}
        onChange={handleUserInput}
      />
      <button onClick={fetchOpenAIResponse}>Submit</button>
      <p>{responseText}</p>
    </div>
  );
}