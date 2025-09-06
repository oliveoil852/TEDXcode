import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster, toast } from "sonner";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const speakers = useQuery(api.speakers.list) || [];
  const registrationCount = useQuery(api.registrations.count) || 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["home", "about", "speakers", "schedule", "register"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Cursor follower */}
      <div 
        className="fixed w-6 h-6 bg-red-600/30 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isScrolled ? 0.8 : 1})`,
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? "bg-black/95 backdrop-blur-xl border-b border-red-600/20 py-4" 
          : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="text-3xl font-black tracking-tight">
                  TED<span className="text-red-600 relative">
                    x
                    <div className="absolute -inset-1 bg-red-600/20 blur-sm rounded-full animate-pulse" />
                  </span>
                </div>
                <div className="text-xs text-gray-400 font-medium tracking-widest uppercase">
                  Winchester School <span className="font-bold">Jebel Ali</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {["home", "about", "speakers", "schedule", "register"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`relative text-sm font-medium tracking-wide transition-all duration-300 group ${
                    activeSection === section
                      ? "text-red-600"
                      : "text-white hover:text-red-400"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  <div className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                    activeSection === section ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollToSection("register")}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/25"
            >
              Register Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-900/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)]" />
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-600/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="mb-12 animate-fade-in-up">
            <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                TED
              </span>
              <span className="text-red-600 relative">
                x
                <div className="absolute -inset-2 bg-red-600/20 blur-xl rounded-full animate-pulse" />
              </span>
            </h1>
            
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl md:text-4xl font-light text-gray-300 tracking-wide">
                Winchester School <span className="font-bold">Jebel Ali</span>
              </h2>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
              </div>
            </div>
          </div>

          <div className="mb-12 animate-fade-in-up animation-delay-200">
            <p className="text-3xl md:text-4xl font-light text-red-400 mb-6 tracking-wide">
              Ideas Worth Spreading
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join us for an extraordinary journey of inspiration, innovation, and transformation. 
              Experience talks that will challenge your perspective and ignite your passion for change.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-400">
            <button
              onClick={() => scrollToSection("register")}
              className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-600/30"
            >
              <span className="relative z-10">Register Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button
              onClick={() => scrollToSection("speakers")}
              className="group relative border-2 border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="relative z-10">Meet Our Speakers</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-700/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          <div className="mt-16 animate-fade-in-up animation-delay-600">
            <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-300 font-medium">
                {registrationCount} people registered
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(220,38,38,0.05),transparent_70%)]" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              About TED<span className="text-red-600">x</span>
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
              <div className="w-3 h-3 bg-red-600 rounded-full" />
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Independently organized events that bring communities together to share ideas and inspire action
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">What is TEDx?</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  TEDx events are independently organized TED-like events that bring communities together 
                  to share ideas and inspire action. Our event at Winchester School Jebel Ali showcases 
                  the power of ideas to change attitudes, lives, and ultimately, the world.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Through thought-provoking talks, we aim to spark deep discussion and connection 
                  within our school community and beyond.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-red-600/10 to-red-700/5 rounded-2xl border border-red-600/20 backdrop-blur-sm">
                  <div className="text-4xl font-black text-red-600 mb-2">8+</div>
                  <div className="text-gray-400 font-medium">Inspiring Speakers</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-red-600/10 to-red-700/5 rounded-2xl border border-red-600/20 backdrop-blur-sm">
                  <div className="text-4xl font-black text-red-600 mb-2">300+</div>
                  <div className="text-gray-400 font-medium">Expected Attendees</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gray-800 shadow-2xl backdrop-blur-sm">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-3xl blur opacity-75" />
                <div className="relative">
                  <h3 className="text-2xl font-bold text-white mb-8">Event Details</h3>
                  <div className="space-y-6">
                    {[
                      { icon: "📅", label: "Date", value: "Coming Soon" },
                      { icon: "🕐", label: "Time", value: "9:00 AM - 4:00 PM" },
                      { icon: "📍", label: "Venue", value: "Winchester School Jebel Ali" },
                      { icon: "🎫", label: "Entry", value: "Free Registration Required" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <div className="text-red-400 font-medium text-sm">{item.label}</div>
                          <div className="text-white font-semibold">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-24 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(220,38,38,0.05),transparent_70%)]" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Our Speakers
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
              <div className="w-3 h-3 bg-red-600 rounded-full" />
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Meet the visionaries, innovators, and thought leaders who will share their ideas worth spreading
            </p>
          </div>
          
          {speakers.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative inline-block mb-8">
                <div className="text-8xl mb-4 animate-pulse">🎤</div>
                <div className="absolute -inset-4 bg-red-600/20 blur-xl rounded-full animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Speakers Coming Soon!</h3>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                We're curating an extraordinary lineup of speakers who will challenge your thinking 
                and inspire your journey. Stay tuned for announcements!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {speakers.map((speaker, index) => (
                <div 
                  key={speaker._id} 
                  className="group relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {speaker.imageUrl && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={speaker.imageUrl}
                        alt={speaker.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>
                  )}
                  
                  <div className="p-8 relative">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                      {speaker.name}
                    </h3>
                    <p className="text-red-500 font-semibold mb-4 text-sm tracking-wide uppercase">
                      {speaker.title}
                    </p>
                    <h4 className="font-bold text-gray-200 mb-3 text-lg">
                      "{speaker.talkTitle}"
                    </h4>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {speaker.talkDescription}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {speaker.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-24 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_70%)]" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Event Schedule
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
              <div className="w-3 h-3 bg-red-600 rounded-full" />
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A carefully curated day of inspiration, learning, and connection
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-red-600 via-red-500 to-red-600" />
              
              <div className="space-y-8">
                {[
                  { time: "8:30 AM", event: "Registration & Welcome Coffee", description: "Check-in and networking with fellow attendees" },
                  { time: "9:00 AM", event: "Opening Ceremony", description: "Welcome address and event introduction" },
                  { time: "9:30 AM", event: "First Speaker Session", description: "Inspiring talks from our featured speakers" },
                  { time: "10:30 AM", event: "Coffee Break & Networking", description: "Connect with speakers and attendees" },
                  { time: "11:00 AM", event: "Second Speaker Session", description: "More thought-provoking presentations" },
                  { time: "12:00 PM", event: "Lunch Break", description: "Gourmet lunch and continued networking" },
                  { time: "1:00 PM", event: "Third Speaker Session", description: "Afternoon inspiration continues" },
                  { time: "2:00 PM", event: "Interactive Workshop", description: "Hands-on learning and collaboration" },
                  { time: "3:00 PM", event: "Final Speaker Session", description: "Closing thoughts and final presentations" },
                  { time: "3:45 PM", event: "Closing Ceremony", description: "Wrap-up and call to action" },
                ].map((item, index) => (
                  <div key={index} className="relative flex items-start group">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-red-600 rounded-full border-4 border-black group-hover:bg-red-500 transition-colors duration-300" />
                    
                    <div className="ml-16 bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 group-hover:border-red-600/50 transition-all duration-300 w-full group-hover:shadow-lg group-hover:shadow-red-600/10">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="text-red-500 font-bold text-lg mb-1">
                            {item.time}
                          </div>
                          <div className="text-white font-semibold text-xl mb-2">
                            {item.event}
                          </div>
                          <div className="text-gray-400">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <RegistrationSection />

      {/* Footer */}
      <footer className="bg-gradient-to-t from-black to-gray-900 text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="text-4xl font-black mb-6 tracking-tight">
              TED<span className="text-red-600">x</span> Winchester School <span className="font-black">Jebel Ali</span>
            </div>
            <p className="text-xl text-red-400 mb-8 font-light tracking-wide">Ideas Worth Spreading</p>
            
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
              <div className="w-3 h-3 bg-red-600 rounded-full" />
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500 text-sm">
                This independent TEDx event is operated under license from TED.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <Toaster 
        theme="dark"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        }}
      />
    </div>
  );
}

function RegistrationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    grade: "",
    dietaryRequirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const register = useMutation(api.registrations.register);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await register(formData);
      toast.success("Registration successful! We'll send you event details soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        school: "",
        grade: "",
        dietaryRequirements: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="register" className="py-24 bg-gradient-to-b from-gray-900 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.05),transparent_70%)]" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Register Now
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            <div className="w-3 h-3 bg-red-600 rounded-full" />
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Secure your spot at this transformative event. Registration is free, but spaces are limited.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-3xl border border-gray-800 shadow-2xl backdrop-blur-sm">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-3xl blur opacity-75" />
            
            <form onSubmit={handleSubmit} className="relative space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 bg-white/5 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your full name"
                    />
                    <div className={`absolute inset-0 rounded-xl border-2 border-red-600/50 transition-opacity duration-300 pointer-events-none ${
                      focusedField === "name" ? "opacity-100" : "opacity-0"
                    }`} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 bg-white/5 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your email"
                    />
                    <div className={`absolute inset-0 rounded-xl border-2 border-red-600/50 transition-opacity duration-300 pointer-events-none ${
                      focusedField === "email" ? "opacity-100" : "opacity-0"
                    }`} />
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 bg-white/5 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your phone number"
                    />
                    <div className={`absolute inset-0 rounded-xl border-2 border-red-600/50 transition-opacity duration-300 pointer-events-none ${
                      focusedField === "phone" ? "opacity-100" : "opacity-0"
                    }`} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">
                    School/Organization
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("school")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 bg-white/5 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your school or organization"
                    />
                    <div className={`absolute inset-0 rounded-xl border-2 border-red-600/50 transition-opacity duration-300 pointer-events-none ${
                      focusedField === "school" ? "opacity-100" : "opacity-0"
                    }`} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">
                  Grade/Year (if student)
                </label>
                <div className="relative">
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("grade")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-6 py-4 bg-white/5 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent text-white transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-gray-900">Select Grade</option>
                    <option value="9" className="bg-gray-900">Grade 9</option>
                    <option value="10" className="bg-gray-900">Grade 10</option>
                    <option value="11" className="bg-gray-900">Grade 11</option>
                    <option value="12" className="bg-gray-900">Grade 12</option>
                    <option value="13" className="bg-gray-900">Grade 13</option>
                    <option value="teacher" className="bg-gray-900">Teacher/Staff</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                  <div className={`absolute inset-0 rounded-xl border-2 border-red-600/50 transition-opacity duration-300 pointer-events-none ${
                    focusedField === "grade" ? "opacity-100" : "opacity-0"
                  }`} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">
                  Dietary Requirements
                </label>
                <div className="relative">
                  <textarea
                    name="dietaryRequirements"
                    rows={4}
                    value={formData.dietaryRequirements}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("dietary")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Please let us know about any dietary restrictions or allergies..."
                    className="w-full px-6 py-4 bg-white/5 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 backdrop-blur-sm resize-none"
                  />
                  <div className={`absolute inset-0 rounded-xl border-2 border-red-600/50 transition-opacity duration-300 pointer-events-none ${
                    focusedField === "dietary" ? "opacity-100" : "opacity-0"
                  }`} />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-5 px-8 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Registering...</span>
                    </div>
                  ) : (
                    "Register for TEDx"
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
