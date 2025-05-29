const Footer = () => {
  return (
    <footer className="bg-black text-white border-t-8 border-yellow-300 relative overflow-hidden">
      {/* Walking GIF */}
      <img 
        src="/walking.gif" 
        alt="walking" 
        className="h-45 top-32 animate-walk"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-black mb-4 transform -rotate-1">DUCKY BLOGS</h2>
            <p className="max-w-md">
              A place for thoughts, ideas, and creative expressions. Join us on the journey of after 9 to 5.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><a href="/home" className="hover:underline">Home</a></li>
                <li><a href="/aboutUs" className="hover:underline">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Twitter</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:underline">LinkedIn</a></li>
                <li><a href="#" className="hover:underline">Email</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Ducky Blogs. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Made with ❤️ and a lot of coffee</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
