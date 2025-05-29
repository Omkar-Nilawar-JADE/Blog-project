import React from "react";
import { Github, Mail, Twitter, Linkedin, ExternalLink, Code, Users, BookOpen } from "lucide-react";

const AboutUs = () => {
  // Team data - replace with actual information
  const teamMembers = [
    {
      role: "Developer",
      name: "Omkar Nilawar",
      title: "Full Stack Developer",
      bio: "Writing code and cracking jokes — often at the same time.",
      image: "/ProfilePhotos/Omkar.jpg",
      bgColor: "#FFC5BF",
      links: {
        github: "https://github.com/OmNilawar",
        linkedin: "https://twitter.com/alexchen",
        email: "omkar.nilawar@jadeglobal.com"
      }
    },
    {
      role: "Developer",
      name: "Afroz Sadaf",
      title: "Full Stack Developer",
      bio: "Mini thug in all kinds of weather",
      image: "/ProfilePhotos/Afroz.jpg",
      bgColor: "#ECD5E3",
      links: {
        github: "https://github.com/Afroz-Sadaf-JADE",
        linkedin: "https://twitter.com/sampatel",
        email: "afroz.sadaf@jadeglobal.com"
      }
    },
    {
      role: "Mentor",
      name: "Nayeem Mohammed",
      title: "Global Delivery Manager",
      bio: "Just a Biryani Lover guiding the team with industry best practices and strategic direction.",
      image: "/ProfilePhotos/Nayeem.jpg",
      bgColor: "#C6DBDA",
      links: {
        github: "https://github.com/jamiewilson",
        linkedin: "https://twitter.com/jamiewilson",
        email: "jamie@example.com"
      }
    }
  ];

  // Website sections
  const websiteInfo = {
    name: "Ducky Blogs",
    tagline: "Where Jadeans' thoughts float like ducks on a pond",
    mission: "Giving Jadeans a place to waddle through ideas, quack their thoughts, and leave digital breadcrumbs of brilliance.",
    vision: "Creating the most duck-tastic writing platform where Jadeans can shake their tail feathers and make ripples across the company pond.",
    features: [
      "Quack-and-drop editing interface",
      "Duck-traction-free writing environment",
      "Waddle-worthy content discovery",
      "No ducking corporate algorithms"
    ]
  };

  return (
    <div className="min-h-screen bg-[#b1cfb7]">
      {/* Hero Section */}
      <div className="bg-[#fbd2e2] border-b-4 border-black">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-5xl font-black tracking-tight text-black">
            ABOUT<span className="inline-block ml-3 bg-black text-white px-3 transform -skew-x-6">US</span>
          </h1>
          <p className="mt-4 text-xl font-bold max-w-2xl">
            The story behind {websiteInfo.name} and the team making it happen.
          </p>
        </div>
      </div>

      {/* Website Info Section */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="border-4 border-black bg-white p-6 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center mb-6">
            <Code size={28} className="mr-3" />
            <h2 className="text-3xl font-black">THE PLATFORM</h2>
          </div>
          
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-3 bg-[#FFD6E8] inline-block px-2 border-2 border-black">
              {websiteInfo.name}
            </h3>
            <p className="text-lg italic mb-4">{websiteInfo.tagline}</p>
            <p className="mb-4 font-medium">{websiteInfo.mission}</p>
            <p className="font-medium">{websiteInfo.vision}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 bg-[#C8F7DC] inline-block px-2 border-2 border-black">
              What We Offer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {websiteInfo.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="border-2 border-black p-3 bg-[#D4F0FF] font-medium flex items-center"
                >
                  <span className="bg-black text-white w-6 h-6 flex items-center justify-center mr-2 font-bold">
                    {index + 1}
                  </span>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8 flex items-center">
          <Users size={28} className="mr-3" />
          <h2 className="text-3xl font-black">THE TEAM</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={`border-4 border-black p-4 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
              style={{ backgroundColor: member.bgColor }}
            >
              <div className="flex justify-between items-start mb-3">
                <div 
                  className="bg-black text-white px-2 py-1 font-bold text-sm"
                >
                  {member.role}
                </div>
                <div className="flex space-x-1">
                  <a href={member.links.github} className="bg-[#F9F5FF] p-1 border border-black hover:bg-[#E6DBFF]" title="GitHub">
                    <Github size={16} />
                  </a>
                  <a href={member.links.linkedin} className="bg-[#F9F5FF] p-1 border border-black hover:bg-[#E6DBFF]" title="Twitter">
                    <Linkedin size={16} />
                  </a>
                  <a href={`mailto:${member.links.email}`} className="bg-[#F9F5FF] p-1 border border-black hover:bg-[#E6DBFF]" title="Email">
                    <Mail size={16} />
                  </a>
                </div>
              </div>

              <div className="flex mb-3">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-35 h-35 border-2 border-black mr-3 object-cover"
                />
                <div>
                  <h3 className="font-bold text-xl">{member.name}</h3>
                  <p className="text-sm font-medium">{member.title}</p>
                </div>
              </div>

              <p className="text-sm border-t-2 border-black pt-3">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="border-4 border-black bg-white p-6 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center mb-6">
            <BookOpen size={28} className="mr-3" />
            <h2 className="text-3xl font-black">OUR VALUES</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-black p-4 bg-[#C8F7DC]">
              <h3 className="text-xl font-bold mb-2">Authenticity</h3>
              <p>We don't do fake feathers here! Genuine duck thoughts only - if it looks like a duck and quacks like a duck, we'll publish it!</p>
            </div>
            
            <div className="border-2 border-black p-4 bg-[#D4F0FF]">
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p>Our platform is so easy to use, even a duck with webbed feet could type a blog post. No pond-erous user interfaces!</p>
            </div>
            
            <div className="border-2 border-black p-4 bg-[#FFE8A3]">
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p>Jadeans of a feather blog together! Our duck community sticks together like bread to a duck's bill.</p>
            </div>
            
            <div className="border-2 border-black p-4 bg-[#FFD6E8]">
              <h3 className="text-xl font-bold mb-2">Independence</h3>
              <p>Free as a duck in water! Express yourself without some corporate goose telling you what to do.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;