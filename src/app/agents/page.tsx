// src/app/agents/page.tsx
"use client";  // Ensures it's a Client Component

import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

const AgentPage = () => {
  const [eipId, setEipId] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [result, setResult] = useState<string>('');

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
      console.error("Error fetching EIP details:", error);
      setResult('Error fetching the EIP details. Please try again.');
    }
  };

  return (
    <div>
      <Head>
        <title>Agent Page</title>
      </Head>

      <section className="bg-gray-800 text-white p-10 mb-8">
        <p className='text-3xl'>Get Detailed <b>Insights on a specific EIP regarding your Domain</b> using our Agents</p>
        <div className="mt-4">
          <p className='text-lg'>Choose the EIP you wish to get details on:</p>
          <input
            type="text"
            placeholder="Enter EIP ID [Example: 'eip-1']"
            value={eipId}
            onChange={(e) => setEipId(e.target.value)}
            className="p-2 rounded border border-gray-300 w-3/5"
          />
        </div>

        <div className="mt-4 flex flex-col w-3/5">
        <p className='text-lg'>Choose your domain agent to get detailed insights on them:</p>
        <div className='flex'>
          {['Technical', 'Community', 'Research', 'Other'].map(agentType => (
            <button
              key={agentType}
              className={`mr-2 p-2 w-2/5 rounded ${
                selectedAgent === agentType ? 'bg-blue-500' : 'bg-gray-500'
              } text-white`}
              onClick={() => setSelectedAgent(agentType)}
            >
              {agentType} Agent
            </button>
          ))}
        </div>
        </div>

        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={fetchEIPDetails}
          >
            Submit
          </button>
        </div>

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
