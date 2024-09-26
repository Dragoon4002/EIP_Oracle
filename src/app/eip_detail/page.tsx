"use client";  // This makes the component a Client Component

import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

interface Conversation {
  id: number;
  message: string;
  response: string;
}

const EipDetailPage = () => {
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("Fetching EIP from GitHub...");

      // Fetch EIP markdown content from GitHub
      const eipMarkdown = await fetchGithubEIPs(input);

      if (!eipMarkdown) {
        throw new Error('EIP not found or could not be fetched');
      }

      console.log("GitHub API response:", eipMarkdown);

      // Decode the fetched markdown content
      const decodedContent = await decodeBase64(eipMarkdown);
      console.log("Decoded content:", decodedContent);

      const newConversation: Conversation = {
        id: conversation.length + 1,
        message: input,
        response: decodedContent || 'Error fetching response from Llama',
      };

      setConversation([...conversation, newConversation]);
      setInput('');
    } catch (error) {
      console.error("Error during EIP fetching or decoding:", error);
      setConversation((prev) => [
        ...prev,
        {
          id: conversation.length + 1,
          message: input,
          response: 'Error occurred while fetching data.',
        },
      ]);
      setInput('');
    }
  };

  async function fetchGithubEIPs(EIPid: string) {
    try {
      const response = await axios.get(`https://api.github.com/repos/ethereum/EIPs/contents/EIPS/${EIPid}.md`);
      return response.data.content; // Ensure you return the Base64 content
    } catch (error) {
      console.error('Error fetching EIP from GitHub:', error);
      return null; // Return null on error
    }
  }

  async function decodeBase64(encodedString: string) {
    try {
      // Decode the Base64 string properly
      const decodedBytes = Buffer.from(encodedString, 'base64');
      return decodedBytes.toString('utf-8');
    } catch (error) {
      console.error("Error decoding Base64:", error);
      throw error;
    }
  }

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <Head>
        <title>EIP Detail Page</title>
      </Head>
      <h1 className="text-3xl font-bold">EIP Detail Page</h1>
      <p className="text-lg">This is the EIP detail page</p>
      <div className="conversation-container">
        {conversation.map((item) => (
          <div key={item.id} className="conversation-item">
            <div className="message">
              <span><strong>Question:</strong> {item.message}</span>
            </div>
            <div className="response">
              <span><strong>Response:</strong> {item.response}</span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question about the EIP"
          className="w-full p-2 pl-10 text-sm text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default EipDetailPage;
