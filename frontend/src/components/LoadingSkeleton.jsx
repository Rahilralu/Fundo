import React from 'react';

export default function LoadingSkeleton({ type = 'card', count = 1 }) {
  const Skeletons = Array.from({ length: count }, (_, i) => (
    <div key={i} className={`animate-pulse bg-white/5 border border-white/5 rounded-[2rem] ${type === 'card' ? 'h-40 w-full' : 'h-24 w-full'} `}></div>
  ));
  return <>{Skeletons}</>;
}
