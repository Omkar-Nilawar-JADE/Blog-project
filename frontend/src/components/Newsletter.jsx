const Newsletter = () => {
    return (
      <section className="bg-white py-16 flex flex-col items-center text-center px-4">
        <h3 className="text-3xl font-bold font-mono mb-4">Stay Updated!</h3>
        <p className="text-gray-600 mb-6">Subscribe to our newsletter and never miss a post.</p>
        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border-2 border-black rounded-md w-64 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md font-bold border-2 border-black hover:bg-gray-800 transition-all"
          >
            Subscribe
          </button>
        </form>
      </section>
    );
  };
  
  export default Newsletter;
  