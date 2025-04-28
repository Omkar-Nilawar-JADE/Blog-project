const HeroSection = () => {
  return (
    <section className="bg-[#e3edf7] py-20 flex flex-col items-center justify-center text-center">
      <h2 className="text-5xl font-bold font-mono text-black uppercase mb-6 border-b-4 border-[#ff6f61] pb-2">
        Dive Into the Blog World
      </h2>
      <p className="text-xl text-gray-700 mb-6 max-w-2xl">
        Explore amazing articles and connect with a creative community!
      </p>
      <a
        href="#posts"
        className="bg-black text-white px-8 py-3 font-bold rounded shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all"
      >
        Explore Posts
      </a>
    </section>
  );
};

export default HeroSection;
