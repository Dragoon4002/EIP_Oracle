// app/layout.tsx

import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-950 p-4">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="text-slate-200 text-lg font-bold">EIP Oracle</Link>
            <div>
              <Link href="/" className="text-slate-200 font-bold px-4">Home</Link>
              <Link href="/agents" className="text-slate-200 font-bold px-4">Agent Cluster</Link>
              <Link href="/eip_detail" className="text-slate-200 font-bold px-4">EIP Detail</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
