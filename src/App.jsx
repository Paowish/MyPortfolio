import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FaCode, FaDatabase, FaServer, FaGlobe, FaDownload,
  FaBriefcase, FaPaperPlane, FaBars, FaTimes, FaGithub, FaLinkedinIn, FaEnvelope,
  FaUser, FaLaptopCode, FaAward, FaGraduationCap, FaRobot, FaBrain, FaRocket,
  FaExternalLinkAlt, FaArrowRight, FaCheckCircle, FaStar, FaUsers,
  FaCloud, FaShieldAlt, FaChartLine, FaLightbulb, FaCrown
} from 'react-icons/fa';
import {
  SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiVercel,
  SiTypescript, SiNextdotjs, SiJavascript, SiPostgresql, SiDocker,
  SiFirebase, SiPython, SiGraphql, SiRedis, SiKubernetes
} from 'react-icons/si';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const isClickingRef = useRef(false);

  const form = useRef();
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then(() => {
        setFormStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
        form.current.reset();
      }, (error) => {
        setFormStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        console.error('EmailJS error:', error);
      })
      .finally(() => setIsSubmitting(false));
  };

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#expertise', label: 'Expertise' },
    { href: '#work', label: 'Work' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const sections = navLinks.map(link => document.querySelector(link.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isClickingRef.current) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: '0px 0px -30% 0px'
      }
    );
    sections.forEach(section => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [navLinks]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const handleNavClick = (href) => {
    isClickingRef.current = true;
    setActiveSection(href);

    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    setTimeout(() => {
      isClickingRef.current = false;
    }, 800);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 text-gray-800 font-sans scroll-smooth overflow-x-hidden relative">

      {/* ===== STICKY TOP NAVBAR ===== */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 py-3 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a
            href="#top"
            onClick={handleLogoClick}
            className="text-2xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <span className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">P</span>
            <span>Paolo<span className="text-blue-600">.</span></span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative group transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                  />
                </a>
              );
            })}
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:text-black transition-colors hover:bg-gray-50 rounded-lg"
            aria-label="Open menu"
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* ===== MOBILE SIDEBAR ===== */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-80 z-[70] bg-white/95 backdrop-blur-xl shadow-2xl p-8 md:hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-2xl font-bold tracking-tight text-gray-900">Paolo<span className="text-blue-600">.</span></span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-black transition-colors hover:bg-gray-50 rounded-lg"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2 text-base font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleNavClick(link.href);
                  }}
                  className="py-3 px-4 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-lg"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                onClick={() => setIsMenuOpen(false)}
                className="mt-6 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-xl text-sm font-medium hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <FaDownload className="inline mr-2" /> Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MAIN CONTENT ===== */}
      <div id="top" className="absolute top-0 left-0 w-full"></div>
      <main className="w-full flex flex-col items-center justify-center px-6 pt-24 md:pt-28 pb-16 md:pb-24">

        <div className="w-full max-w-6xl flex flex-col gap-20 md:gap-28">

          {/* ===== HERO SECTION ===== */}
          <motion.section
            id="hero"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative py-12 md:py-20"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-blue-100/50"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Available for Freelance & Collaboration
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6"
              >
                <span className="block">Paolo Carunia</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-3xl md:text-4xl mt-2">
                  AI-Assisted Full Stack Developer
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10"
              >
                Crafting scalable, intelligent web applications with modern technologies and human-centered design.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a href="#work" className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg text-white px-8 py-3.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]">
                  View My Work
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contact" className="group inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-8 py-3.5 rounded-xl text-sm font-medium transition-all border border-gray-200 hover:border-gray-300">
                  Let's Connect
                </a>
              </motion.div>
            </div>
          </motion.section>

          {/* ===== ABOUT SECTION ===== */}
          <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20">
            <div className="flex flex-col md:flex-row items-start gap-12">
              <div className="md:w-2/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                    <FaUser className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  I'm Paolo Carunia, a passionate developer who believes in the power of technology to solve real-world problems. With a strong foundation in full-stack development and a growing expertise in AI-assisted workflows, I create solutions that are both innovative and practical.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>5+ Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span>100% Client Satisfaction</span>
                  </div>
                </div>
              </div>

              <div className="md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <FaLaptopCode className="text-blue-600" />, title: 'Full Stack', desc: 'End-to-end development with React, Node.js, and modern databases' },
                  { icon: <FaRobot className="text-purple-600" />, title: 'AI Integration', desc: 'Leveraging AI and LLMs for smarter, faster development' },
                  { icon: <FaUsers className="text-indigo-600" />, title: 'User-Centered', desc: 'Building experiences that prioritize user needs and accessibility' },
                  { icon: <FaCrown className="text-amber-600" />, title: 'Quality Focus', desc: 'Clean code, best practices, and continuous improvement' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 transition-colors">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ===== EXPERTISE SECTION ===== */}
          <motion.section id="expertise" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                <FaBrain className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Expertise</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all">
                <FaCode className="text-3xl text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-900 text-lg mb-2">Frontend</h3>
                <p className="text-gray-500 text-sm">React, Next.js, TypeScript, Tailwind CSS with responsive, accessible designs.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all">
                <FaServer className="text-3xl text-indigo-600 mb-4" />
                <h3 className="font-bold text-gray-900 text-lg mb-2">Backend</h3>
                <p className="text-gray-500 text-sm">Node.js, Python, GraphQL, REST APIs, microservices architecture.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all">
                <FaDatabase className="text-3xl text-purple-600 mb-4" />
                <h3 className="font-bold text-gray-900 text-lg mb-2">Database</h3>
                <p className="text-gray-500 text-sm">PostgreSQL, MongoDB, Redis, Firebase, data modeling, and optimization.</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: <SiReact />, name: 'React' },
                  { icon: <SiNextdotjs />, name: 'Next.js' },
                  { icon: <SiTypescript />, name: 'TypeScript' },
                  { icon: <SiJavascript />, name: 'JavaScript' },
                  { icon: <SiNodedotjs />, name: 'Node.js' },
                  { icon: <SiPython />, name: 'Python' },
                  { icon: <SiGraphql />, name: 'GraphQL' },
                  { icon: <SiPostgresql />, name: 'PostgreSQL' },
                  { icon: <SiMongodb />, name: 'MongoDB' },
                  { icon: <SiRedis />, name: 'Redis' },
                  { icon: <SiFirebase />, name: 'Firebase' },
                  { icon: <SiDocker />, name: 'Docker' },
                  { icon: <SiKubernetes />, name: 'Kubernetes' },
                  { icon: <SiTailwindcss />, name: 'Tailwind' },
                  { icon: <SiVercel />, name: 'Vercel' },
                ].map((tech, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all">
                    <span className="text-base">{tech.icon}</span>
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ===== WORK SECTION ===== */}
          <motion.section id="work" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                <FaRocket className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Work</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Santa Rosa Rescue System',
                  desc: 'AI-enhanced real-time emergency response platform with incident feeds, GPS tracking, and interactive mapping.',
                  tags: ['React', 'Node.js', 'MongoDB', 'AI', 'Tailwind'],
                  link: 'https://www.rescuesantarosagov.live/',
                  icon: <FaShieldAlt className="text-4xl text-blue-400" />
                },
                {
                  title: 'AI-Assisted Development Suite',
                  desc: 'A collection of tools and workflows leveraging AI for faster, more efficient software development.',
                  tags: ['Python', 'OpenAI', 'React', 'FastAPI'],
                  link: '#',
                  icon: <FaRobot className="text-4xl text-purple-400" />
                },
              ].map((project, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="h-48 bg-gradient-to-br from-gray-50 to-blue-50/50 flex items-center justify-center">
                    <div className="text-center">
                      {project.icon}
                      <span className="block text-sm text-gray-400 mt-2">Project Preview</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">{tag}</span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all">
                      View Project
                      <FaExternalLinkAlt className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ===== CONTACT SECTION ===== */}
          <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                <FaPaperPlane className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-2/5">
                  <p className="text-gray-600 text-lg mb-6">Have a project in mind? Let's create something amazing together.</p>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaEnvelope className="text-blue-600 text-lg" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-medium">EMAIL</p>
                        <a href="mailto:caruniapaolovince@gmail.com" className="text-gray-900 hover:text-blue-600 transition font-medium">caruniapaolovince@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaBriefcase className="text-blue-600 text-lg" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-medium">PHONE</p>
                        <span className="text-gray-900 font-medium">+63 926 624 7473</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaGlobe className="text-blue-600 text-lg" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-medium">LOCATION</p>
                        <span className="text-gray-900 font-medium">Nueva Ecija, Philippines</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <a href="https://github.com/dashboard" target="_blank" className="w-12 h-12 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-xl flex items-center justify-center transition-all">
                      <FaGithub className="text-xl" />
                    </a>
                    <a href="https://www.linkedin.com/in/paolo-vincent-carunia-1637aa3ba/" target="_blank" className="w-12 h-12 bg-gray-100 hover:bg-[#0A66C2] hover:text-white rounded-xl flex items-center justify-center transition-all">
                      <FaLinkedinIn className="text-xl" />
                    </a>
                    <a href="mailto:caruniapaolovince@gmail.com" className="w-12 h-12 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-xl flex items-center justify-center transition-all">
                      <FaEnvelope className="text-xl" />
                    </a>
                  </div>
                </div>

                <form ref={form} onSubmit={sendEmail} className="md:w-3/5 space-y-5">
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell me about your project..."
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg text-white rounded-xl text-sm font-medium transition-all hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  {formStatus.message && (
                    <div className={`text-sm text-center p-4 rounded-xl ${formStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.section>

          {/* ===== FOOTER ===== */}
          <footer className="pt-12 border-t border-gray-200/50 text-center">
            <p className="text-sm text-gray-400">&copy; 2026 Paolo Vincent Carunia. <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-medium">AI-Assisted Development</span></p>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default App;