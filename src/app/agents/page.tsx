// app/AgentPage.tsx
"use client";  // This makes the component a Client Component

import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

interface AgentProps {
  agent?: {
    name: string;
    description: string;
  };
}

const AgentPage = ({ agent }: AgentProps) => {
  const [eipId, setEipId] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const fetchEIPDetails = async () => {
    if (!eipId || !selectedAgent) {
      setResult('Please provide an EIP ID and select an agent.');
      return;
    }

    try {
      const response = await axios.get(`https://api.eip-service.com/eips/${eipId}`);
      const eipDetails = response.data;

      const aiGeneratedResponse = `The EIP ${eipId} is ${eipDetails.title} - ${eipDetails.description}. Agent ${selectedAgent} will guide you through more technical or community details based on this EIP.`;
      
      setResult(aiGeneratedResponse);
    } catch (error) {
      setResult('Error fetching the EIP details. Please try again.');
    }
  };


  return (
    <div>
      <Head>
        <title> Agent Page</title>
      </Head>

      {/* Hero Section */}
      <section className="bg-gray-800 text-white p-6 rounded-lg mb-8">

        {/* EIP ID Input */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter EIP ID"
            value={eipId}
            onChange={(e) => setEipId(e.target.value)}
            className="p-2 rounded border border-gray-300"
          />
        </div>

        {/* Agent Selection */}
        <div className="mt-4 flex justify-center">
          <button
            className={`mr-2 p-2 rounded ${selectedAgent === 'Technical' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
            onClick={() => setSelectedAgent('Technical')}
          >
            Technical Agent
          </button>
          <button
            className={`mr-2 p-2 rounded ${selectedAgent === 'Community' ? 'bg-green-500' : 'bg-gray-500'} text-white`}
            onClick={() => setSelectedAgent('Community')}
          >
            Community Agent
          </button>
          <button
            className={`mr-2 p-2 rounded ${selectedAgent === 'Research' ? 'bg-purple-500' : 'bg-gray-500'} text-white`}
            onClick={() => setSelectedAgent('Research')}
          >
            Research Agent
          </button>
          {/* Additional agents */}
          <button
            className={`mr-2 p-2 rounded ${selectedAgent === 'Other' ? 'bg-orange-500' : 'bg-gray-500'} text-white`}
            onClick={() => setSelectedAgent('Other')}
          >
            Other Agent
          </button>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={fetchEIPDetails}
          >
            Submit
          </button>
        </div>

        {/* Display AI Result */}
        {result && (
          <div className="mt-6 bg-white p-4 rounded shadow-md">
            <h3 className="font-bold text-lg">AI Response:</h3>
            <p>{result}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AgentPage;