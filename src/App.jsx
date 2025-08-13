import React, { useState, useEffect, useRef } from 'react';
import { Github, Mail, Linkedin, Phone, MapPin, ExternalLink, Code, Database, Cloud, Smartphone, Monitor, Server, ChevronDown, Send, Calendar, Building, GraduationCap, Briefcase, Star, ArrowRight, Download } from 'lucide-react';

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('Home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDownloadAnimation, setShowDownloadAnimation] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('idle'); // idle, downloading, success
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setShowNavbar(false);
      } else {
        // Scrolling up or at top
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    });

    const sections = [heroRef, aboutRef, experienceRef, projectsRef, skillsRef, contactRef];
    sections.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    setDownloadStatus('downloading');
    setShowDownloadAnimation(true);
    
    // Simulate download process
    setTimeout(() => {
      setDownloadStatus('success');
      // Create download link for PDF
      const link = document.createElement('a');
      link.href = '/Utkarsh_Sinha_SDE.pdf'; // Replace with actual PDF path
      link.download = 'Utkarsh_Sinha_SDE.pdf';
      link.click();
      
      // Reset after showing success animation
      setTimeout(() => {
        setDownloadStatus('idle');
        setShowDownloadAnimation(false);
      }, 3000);
    }, 2000);
  };

  const experiences = [
    {
      title: "Software Development Engineer Intern",
      company: "Staffchahiye.com",
      period: "December 2024 - June 2025",
      location: "Varanasi",
      achievements: [
        "Architected scalable job platform with React.js, Node.js, MongoDB processing 1,500+ daily applications",
        "Built real-time analytics dashboard reducing hiring cycle time by 40%",
        "Implemented microservices architecture with WhatsApp Business API integration",
        "Onboarded 12,000+ job seekers with 25% month-over-month growth"
      ]
    },
    {
      title: "Full Stack Developer Intern",
      company: "OpyraInfotech",
      period: "Aug. 2023 - Dec. 2024",
      location: "Varanasi",
      achievements: [
        "Developed AIC BHU mobile application using React Native and Expo",
        "Built dynamic web applications with modern state management",
        "Created custom WordPress themes improving page load times by 40%",
        "Implemented SEO optimization and responsive design principles"
      ]
    }
  ];

  const projects = [
    {
      title: "Indian Financial Management SaaS",
      tech: ["React Native", "Expo", "Node.js"],
      description: "Full-stack business management platform with Indian GST compliance, automated tax calculations (CGST/SGST/IGST), real-time financial dashboards, and RESTful APIs serving enterprise clients.",
      features: ["GST Compliance", "Real-time Dashboards", "Enterprise APIs"]
    },
    {
      title: "QuizCraft.in - AI-Powered Quiz Generator",
      tech: ["React.js", "OpenAI API", "PDF Processing"],
      description: "Intelligent quiz generation platform converting documents into interactive assessments using GPT-4 API, advanced OCR with Tesseract.js, and real-time batch processing with 60% faster document analysis.",
      features: ["AI-Powered", "Multi-format Support", "Real-time Processing"]
    }
  ];

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Monitor,
      skills: ["React.js", "React Native", "TypeScript", "Tailwind CSS", "Redux", "Material-UI"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Backend Development", 
      icon: Server,
      skills: ["Node.js", "Express.js", "Python", "Flask", "Django", "GraphQL"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      skills: ["React Native", "Expo", "Push Notifications", "App Store Deployment"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Database & Cloud",
      icon: Database,
      skills: ["MongoDB", "MySQL", "Redis", "AWS", "Firebase", "Docker"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["JavaScript", "TypeScript", "Python", "Java", "C++", "SQL"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "APIs & Integration",
      icon: Cloud,
      skills: ["REST APIs", "OpenAI API", "Google Maps", "WhatsApp Business", "OAuth"],
      color: "from-teal-500 to-blue-500"
    }
  ];

  const ParallaxElement = ({ children, speed = 0.5 }) => (
    <div style={{ transform: `translateY(${scrollY * speed}px)` }}>
      {children}
    </div>
  );

  const FloatingCard = ({ children, delay = 0 }) => (
    <div 
      className={`transition-all duration-1000 ease-out ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Cursor Follower */}
      <div
        className="fixed w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mix-blend-difference pointer-events-none z-50 transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: `scale(${scrollY > 50 ? 0.5 : 1})`
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-4 left-4 right-4 z-40 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-500 ease-in-out ${
        showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-0.5">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/Pic.jpg" 
                    alt="Utkarsh Sinha" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Utkarsh
                </div>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(
                    item === 'Home' ? heroRef :
                    item === 'About' ? aboutRef :
                    item === 'Experience' ? experienceRef :
                    item === 'Projects' ? projectsRef :
                    item === 'Skills' ? skillsRef : contactRef
                  )}
                  className={`transition-colors duration-300 hover:text-cyan-400 ${
                    activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} id="Home" className="min-h-screen flex items-center justify-center relative pt-24">
        <ParallaxElement speed={-0.2}>
          <div className="text-center z-10 relative px-6">
            <FloatingCard>
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/Pic.jpg"  
                      alt="Utkarsh Sinha" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Utkarsh Sinha
                </h1>
                <div className="text-xl md:text-2xl text-gray-300 mb-6">
                  <span className="inline-block animate-pulse">Software Development Engineer</span>
                </div>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                  Crafting scalable solutions and innovative experiences with modern web technologies
                </p>
              </div>
            </FloatingCard>

            <FloatingCard delay={300}>
              <div className="flex justify-center space-x-6 mb-12">
                <a href="https://github.com/UtkarshDevv" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Github className="w-6 h-6" />
                </a>
                <a href="mailto:Utkarshsinha2122@gmail.com" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="tel:+917518075299" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Phone className="w-6 h-6" />
                </a>
              </div>
            </FloatingCard>

            <FloatingCard delay={600}>
              <div className="flex flex-col items-center space-y-6">
                {/* Animated Resume Download Button */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <button 
                    onClick={handleDownloadResume}
                    disabled={downloadStatus !== 'idle'}
                    className="relative px-8 py-4 bg-slate-900 rounded-xl leading-none flex items-center space-x-3 group-hover:bg-slate-800 transition-all duration-300 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        {downloadStatus === 'idle' && (
                          <>
                            <Download className="w-5 h-5 text-cyan-400 group-hover:animate-bounce" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-ping"></div>
                          </>
                        )}
                        {downloadStatus === 'downloading' && (
                          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {downloadStatus === 'success' && (
                          <div className="w-5 h-5 text-green-400 animate-bounce">
                            ✓
                          </div>
                        )}
                      </div>
                      <span className={`font-medium transition-colors ${
                        downloadStatus === 'idle' ? 'text-white group-hover:text-cyan-400' :
                        downloadStatus === 'downloading' ? 'text-cyan-400' :
                        'text-green-400'
                      }`}>
                        {downloadStatus === 'idle' && 'Download Resume'}
                        {downloadStatus === 'downloading' && 'Preparing...'}
                        {downloadStatus === 'success' && 'Downloaded! 🎉'}
                      </span>
                    </div>
                    <div className="ml-auto">
                      <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                        downloadStatus === 'idle' ? 'text-gray-400 group-hover:text-white group-hover:translate-x-1' :
                        downloadStatus === 'downloading' ? 'text-cyan-400 animate-pulse' :
                        'text-green-400 animate-bounce'
                      }`} />
                    </div>
                  </button>
                </div>

                {/* Cute Download Animation Overlay */}
                {showDownloadAnimation && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="relative">
                      {/* Floating Papers Animation */}
                      {downloadStatus === 'downloading' && (
                        <div className="space-y-4">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-8 h-10 bg-white rounded shadow-lg animate-bounce opacity-80"
                              style={{
                                animationDelay: `${i * 200}ms`,
                                animationDuration: '1s',
                                transform: `translateX(${(i - 2) * 20}px)`
                              }}
                            >
                              <div className="w-full h-2 bg-gray-300 rounded-t"></div>
                              <div className="w-3/4 h-0.5 bg-gray-400 mx-1 mt-1"></div>
                              <div className="w-full h-0.5 bg-gray-400 mx-1 mt-0.5"></div>
                              <div className="w-2/3 h-0.5 bg-gray-400 mx-1 mt-0.5"></div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Success Confetti Animation */}
                      {downloadStatus === 'success' && (
                        <div className="relative">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className={`absolute w-2 h-2 rounded-full animate-ping ${
                                ['bg-cyan-400', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-400', 'bg-green-400'][i % 5]
                              }`}
                              style={{
                                left: `${Math.cos(i * 18 * Math.PI / 180) * 100}px`,
                                top: `${Math.sin(i * 18 * Math.PI / 180) * 100}px`,
                                animationDelay: `${i * 50}ms`,
                                animationDuration: '2s'
                              }}
                            />
                          ))}
                          <div className="text-6xl animate-bounce">🎉</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => scrollToSection(aboutRef)}
                  className="animate-bounce mt-6"
                >
                  <ChevronDown className="w-8 h-8 text-cyan-400" />
                </button>
              </div>
            </FloatingCard>
          </div>
        </ParallaxElement>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <FloatingCard>
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
          </FloatingCard>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FloatingCard delay={200}>
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm a passionate Software Development Engineer with expertise in full-stack development, 
                  specializing in React.js, Node.js, and modern web technologies. Currently pursuing my 
                  Bachelor's in Computer Applications at Banaras Hindu University.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  With hands-on experience in building scalable applications, from mobile apps to enterprise 
                  SaaS platforms, I'm driven by creating innovative solutions that make a real impact.
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Varanasi, India</span>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={400}>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="flex items-center mb-6">
                  <GraduationCap className="w-8 h-8 text-cyan-400 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold">Education</h3>
                    <p className="text-gray-400">2022 - 2025</p>
                  </div>
                </div>
                <h4 className="text-lg font-medium mb-2">Bachelor's Of Vocation In Computer Applications</h4>
                <p className="text-cyan-400">Banaras Hindu University, Varanasi</p>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} id="experience" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <FloatingCard>
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Experience
            </h2>
          </FloatingCard>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <FloatingCard key={index} delay={index * 200}>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Building className="w-5 h-5 text-cyan-400 mr-2" />
                          <span className="text-cyan-400 font-medium">{exp.company}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-gray-400">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.period}
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-300">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FloatingCard>
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </h2>
          </FloatingCard>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <FloatingCard key={index} delay={index * 200}>
                <div className="group bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <FloatingCard>
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Skills
            </h2>
          </FloatingCard>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <FloatingCard key={index} delay={index * 100}>
                  <div className="group bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">
                        {category.title}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {category.skills.map((skill, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                          <span className="text-gray-300 text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FloatingCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <FloatingCard>
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
          </FloatingCard>

          <FloatingCard delay={200}>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="text-center mb-12">
                <p className="text-lg text-gray-300 mb-8">
                  I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="flex items-center justify-center space-x-4 p-4 bg-slate-700/50 rounded-xl">
                    <Mail className="w-6 h-6 text-cyan-400" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">Utkarshsinha2122@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 p-4 bg-slate-700/50 rounded-xl">
                    <Phone className="w-6 h-6 text-cyan-400" />
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white">+91 7518075299</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://github.com/UtkarshDevv"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  
                  <a
                    href="mailto:Utkarshsinha2122@gmail.com"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Utkarsh Sinha. Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
