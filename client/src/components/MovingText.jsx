import React from 'react'

const MovingText = () => {
  return (
    <div className="w-full h-8 bg-yellow-400 shadow-md flex items-center justify-center px-4 ">
      <marquee behavior="scroll" direction="left" className="flex ">
        <pre className="text-xs Oswald text-center text-black">
          🔗 Connect. Learn. Grow.            🌱 Learn from those just ahead of you.           📈
          Grow with the best.           🚀 Bridge the gap between ambition and
          experience.          👥 Empowering students through peer mentorship.
        </pre>
      </marquee>
    </div>
  );
}

export default MovingText