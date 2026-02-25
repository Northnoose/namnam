"use client";
import { useState } from "react";
import { Container } from "@/components/Container";

interface VideoProps {
  videoId: string;
}

export function Video({ videoId }: Readonly<VideoProps>) {
  const [playVideo, setPlayVideo] = useState(false);

  if (!videoId) return null;

  return (
    <Container>
      <div className="relative w-full h-[500px] max-w-4xl mx-auto overflow-hidden lg:mb-20 rounded-3xl border border-trueGray-800 bg-trueGray-950/35 shadow-2xl">
        {!playVideo && (
          <button
            onClick={() => setPlayVideo(true)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Play Video"
          >
            <span className="inline-flex items-center justify-center rounded-full w-16 h-16 lg:w-24 lg:h-24 bg-brand-600/90 border border-brand-500/40 shadow-lift hover:bg-brand-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 lg:w-24 lg:h-24 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="sr-only">Play Video</span>
          </button>
        )}

        {playVideo && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?controls=0&autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full"
          />
        )}
      </div>
    </Container>
  );
}