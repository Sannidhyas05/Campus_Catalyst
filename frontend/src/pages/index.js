import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Campus Catalyst</title>
        <meta
          name="description"
          content="A platform for university students to collaborate on projects and connect with mentors."
        />
      </Head>
      <main className={`container ${geistSans.variable} ${geistMono.variable}`}>
        <h1 className="text-3xl font-bold">Welcome to Campus Catalyst</h1>
        <p>Connect, Collaborate, and Build.</p>
      </main>
    </>
  );
}
