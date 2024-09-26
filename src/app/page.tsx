// app/page.tsx
"use client";  // Add this to make the component a Client Component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface EIP {
  id: number;
  title: string;
  description: string;
  url: string;
}

interface Update {
  title: string;
  date: string;
  url: string;
}

interface Card {
  profile: string;
  subheading: string;
  text: string;
}

export default function Home() {
  const [recentEIP, setRecentEIP] = useState<EIP | null>(null);
  const [suggestedFeatures, setSuggestedFeatures] = useState<string[]>([]);
  const [ecosystemUpdates, setEcosystemUpdates] = useState<Update[]>([]);
  const [cards, setCards] = useState<Card[]>([
    {
      profile: 'https://via.placeholder.com/50',
      subheading: 'Increase transaction throughput for L2s',
      text: 'This change will allow for faster transactions on Layer 2 solutions.',
    },
    {
      profile: 'https://via.placeholder.com/50',
      subheading: 'Improve EVM compatibility for ZK-rollups',
      text: 'This update will enable better compatibility with ZK-rollups.',
    },
    {
      profile: 'https://via.placeholder.com/50',
      subheading: 'Cross-chain interoperability improvements',
      text: 'This change will improve communication between different blockchain networks.',
    },
  ]);

  useEffect(() => {
    const fetchRecentEIP = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/ethereum/EIPs/master/EIPS/eip-1.md'
        );
        setRecentEIP({
          id: 1,
          title: 'EIP 1: Ethereum Improvement Proposal',
          description: 'This is the latest EIP recently launched.',
          url: '/eip/1',
        });
      } catch (error) {
        console.error('Error fetching recent EIP', error);
      }
    };

    fetchRecentEIP();
  }, []);

  useEffect(() => {
    const features = [
      'Increase transaction throughput for L2s',
      'Improve EVM compatibility for ZK-rollups',
      'Cross-chain interoperability improvements',
    ];
    setSuggestedFeatures(features);
  }, []);

  useEffect(() => {
    const updates = [
      {
        title: 'Ethereum Mainnet Merge completed successfully',
        date: '2024-09-10',
        url: 'https://ethereum.org/en/merge/',
      },
      {
        title: 'EIP-4844 brings proto-danksharding to reduce gas fees',
        date: '2024-08-20',
        url: 'https://eips.ethereum.org/EIPS/eip-4844',
      },
    ];
    setEcosystemUpdates(updates);
  }, []);

  return (
    <div>
      <div className="hero" style={{ height: '60vh' }}>
        <div>
          <div>
            <h2>Slide 1</h2>
            <p>This is the first slide.</p>
          </div>
          <div>
            <h2>Slide 2</h2>
            <p>This is the second slide.</p>
          </div>
          <div>
            <h2>Slide 3</h2>
            <p>This is the third slide.</p>
          </div>
        </div>
      </div>
      <div className="changes-section">
        <h2>Changes to be made in next EIP</h2>
        <div className="cards">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <img src={card.profile} alt="Profile" />
              <h3>{card.subheading}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}