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

interface Sliders{
  name : string;
  link : string;
  html : string;
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
  const [sliders, setSlides] = useState<Sliders[]>([
    {
      name: 'EIP-1',
      link: 'https://api.github.com/repos/ethereum/EIPs/contents/EIPS/eip-1.md?ref=master',
      html: 'https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md',
    },
  ])

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
      <div className="hero h-99 bg-[url('/images/dark-ethereum-background.webp')] bg-cover bg-center grid place-items-center" >
        <div className="text-white p-6 w-auto text-center text-4xl m-10 font-black">
          <h1>WELCOME TO EIP ORACLE</h1>
          <sub>A Easy way to deal with the EIP changes occuring in Ethereum chain and helps to get how it helps/ affects your field of work</sub>
        </div>
      </div>
      <div className="w-full h-1 bg-blue-950 animate-breathe"></div>
      {sliders.map((slide,index) =>(
          <a key={index} className="slides bg-white/[.06] backdrop-blur  p-6 w-1/3" href={slide.link}>
            <h2>{slide.name}</h2>
            <p><a href={slide.html}>The link to this EIP html</a></p>
          </a>
        ))}
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