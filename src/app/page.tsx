"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Raleway } from "next/font/google";

const raleway_font = Raleway({
  weight: ["100", "900"],
  subsets: ["latin"]
})

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [playlist, setPlaylist] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const savedPlaylist = localStorage.getItem("playlist");
    if (savedPlaylist) {
      setPlaylist(savedPlaylist);
    }
  }, []);

  useEffect(() => {
    if (playlist) {
      localStorage.setItem("playlist", playlist);
    } else {
      localStorage.removeItem("playlist");
    }
  }, [playlist]);

  return (
    <div className={`grid place-items-center h-screen text-7xl grid-cols-1 lg:grid-cols-2 ${raleway_font.className} bg-black/60 duration-500 p-16 gap-2`}>
      <div className="w-full h-full grid place-items-center grid-rows-3 gap-2">
        <div className="grid place-items-center rounded-2xl w-full h-full gap-2 bg-black/30 shadow backdrop-blur-2xl"><p className="font-bold ">{time.toLocaleTimeString()}</p></div>
        <div className="grid place-items-center grid-cols-2 grid-rows-2 gap-2 h-full w-full  text-4xl font-bold row-span-2">
          <Link href="https://gmail.com" className="bg-red-500 w-full h-full rounded-2xl p-2 grid place-items-center hover:scale-105 duration-500">
            <div className="grid place-items-center rounded-full bg-white p-2"><Image src="/icons/gmail.svg" alt="gmail" width={100} height={100} /></div>
          </Link>
          <Link href="https://linkedin.com" className="bg-blue-500 w-full h-full rounded-2xl p-2 grid place-items-center hover:scale-105 duration-500">
            <div className="grid place-items-center rounded-full bg-white p-4"><Image src="/icons/linkedin.svg" alt="linkedin" width={100} height={100} /></div>
          </Link>
          <Link href="https://github.com" className="bg-gray-500 w-full h-full rounded-2xl p-2 grid place-items-center hover:scale-105 duration-500">
            <div className="grid place-items-center rounded-full bg-white p-2"><Image src="/icons/github.svg" alt="github" width={100} height={100} /></div>
          </Link>
          <Link href="https://spotify.com" className="bg-green-500 w-full h-full rounded-2xl p-2 grid place-items-center hover:scale-105 duration-500">
            <div className="grid place-items-center rounded-full bg-white p-2"><Image src="/icons/spotify.svg" alt="spotify" width={100} height={100} /></div>
          </Link>
        </div>
      </div>
      <div className="grid place-items-center w-full h-full">
        {playlist ? (
          <div className="w-full h-full flex flex-col gap-2">
            <iframe
              src={`https://open.spotify.com/embed/${playlist}?utm_source=generator`}
              width="100%" height="100%"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
            <button onClick={() => {
              setPlaylist("");
            }} className="text-4xl bg-red-500 rounded-2xl font-bold">Delete</button>
          </div>
        ) : (
          <div className="grid place-items-center w-full h-full">
            <input
              type="text"
              placeholder="Spotify Playlist URL"
              value={playlist}
              onChange={(e) => {
                console.log(e.target.value.split("/"))
                setPlaylist(e.target.value.split("/")[3] + "/" + e.target.value.split("/")[4]);
              }}
              className="p-2 rounded-lg text-black text-4xl font-bold"
            />
          </div>
        )}
      </div>
    </div>
  );
}