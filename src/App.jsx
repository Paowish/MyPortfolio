import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FaCode, FaDatabase, FaServer, FaGlobe, FaDownload,
  FaBriefcase, FaPaperPlane, FaBars, FaTimes, FaGithub, FaLinkedinIn, FaEnvelope,
  FaUser, FaLaptopCode, FaAward, FaGraduationCap
} from 'react-icons/fa';
import {
  SiReact, SiNodedotjs, SiMongodb,
  SiTailwindcss, SiVercel, SiTypescript, SiNextdotjs, SiJavascript,
  SiPostgresql, SiDocker, SiFirebase
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
    { href: '#about-hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
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
    <div className="min-h-screen bg-white text-gray-800 font-sans scroll-smooth overflow-x-hidden relative">

      {/* ===== STICKY TOP NAVBAR ===== */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a
            href="#top"
            onClick={handleLogoClick}
            className="text-xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity"
          >
            PC<span className="text-blue-600">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
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
                  className={`relative group transition-colors duration-300 ${isActive ? 'text-blue-600' : 'hover:text-gray-900'
                    }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
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
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
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
            className="fixed top-0 right-0 h-full w-72 z-[70] bg-white shadow-2xl p-8 md:hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold tracking-tight text-gray-900">PC<span className="text-blue-600">.</span></span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-black transition-colors hover:bg-gray-50 rounded-lg"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2 text-base font-medium text-gray-600">
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
                className="mt-4 py-3 px-6 bg-blue-600 text-white text-center rounded-xl text-sm font-medium hover:bg-blue-700 transition-all hover:shadow-lg"
              >
                <FaDownload className="inline mr-2" /> Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MAIN CONTENT ===== */}
      <div id="top" className="absolute top-0 left-0 w-full"></div>
      <main className="w-full flex flex-col items-center justify-center px-6 pt-28 md:pt-36 pb-16 md:pb-32">

        <div className="w-full max-w-5xl flex flex-col gap-16 md:gap-20">

          {/* ===== HERO / PROFILE ===== */}
          <motion.section
            id="about-hero"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
          >
            <div className="relative flex-shrink-0">
              <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden rounded-full shadow-xl ring-4 ring-white">
                <img src="/Profile.jpeg" alt="Paolo Carunia" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1.5 shadow-lg">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-4">
                Available for Freelance
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                Paolo Carunia
              </h1>
              <p className="text-xl text-gray-600 mt-2 font-medium">Full Stack Developer</p>
              <p className="text-sm text-gray-500 mt-1">BSIT · Nueva Ecija University of Science and Technology</p>
              <p className="text-gray-600 mt-6 max-w-lg leading-relaxed mx-auto md:mx-0">
                Building scalable web applications with modern technologies. Passionate about creating solutions that make a real impact.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
                <a
                  href="https://github.com/dashboard"
                  target="_blank"
                  className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FaGithub className="text-lg" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/paolo-vincent-carunia-1637aa3ba/"
                  target="_blank"
                  className="group inline-flex items-center gap-2 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FaLinkedinIn className="text-lg" />
                  LinkedIn
                </a>
                <a
                  href="mailto:caruniapaolovince@gmail.com"
                  className="group inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  <FaEnvelope className="text-lg" />
                  Email
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FaDownload className="text-lg" />
                  CV
                </a>
              </div>
            </div>
          </motion.section>

          {/* ===== ABOUT SECTION ===== */}
          <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20 py-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaUser className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <FaLaptopCode className="text-blue-600 text-xl" />
                  <h3 className="font-semibold text-gray-900">Developer</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Full-stack developer with expertise in React, Node.js, and modern web technologies.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <FaGraduationCap className="text-blue-600 text-xl" />
                  <h3 className="font-semibold text-gray-900">Student</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  BSIT student at NEUST with a focus on web system development and software engineering.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <FaAward className="text-blue-600 text-xl" />
                  <h3 className="font-semibold text-gray-900">Achievements</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Developed a live emergency response system for the Municipality of Santa Rosa.
                </p>
              </div>
            </div>
          </motion.section>

          {/* ===== EXPERIENCE ===== */}
          <motion.section id="experience" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20 py-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaBriefcase className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                  <span className="text-sm font-semibold text-blue-600 md:w-28 shrink-0">2024 – Present</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Freelance Web Developer</h3>
                    <p className="text-gray-500 text-sm mb-2">Commission-Based Projects</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Building custom web applications and websites for diverse clients. Specializing in React, Node.js, and responsive design.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">React</span>
                      <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">Node.js</span>
                      <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">Tailwind</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                  <span className="text-sm font-semibold text-blue-600 md:w-28 shrink-0">2023 – Present</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">BSIT Student</h3>
                    <p className="text-gray-500 text-sm mb-2">Nueva Ecija University of Science and Technology</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Specializing in Web System Development. Building a strong foundation in full-stack development, databases, and system architecture.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">JavaScript</span>
                      <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">MongoDB</span>
                      <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">Git</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ===== SKILLS ===== */}
          <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20 py-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaDatabase className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Skills & Technologies</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: <SiReact className="w-5 h-5 text-blue-500" />, name: 'React' },
                { icon: <SiNextdotjs className="w-5 h-5 text-gray-900" />, name: 'Next.js' },
                { icon: <SiJavascript className="w-5 h-5 text-yellow-500" />, name: 'JavaScript' },
                { icon: <SiTypescript className="w-5 h-5 text-blue-600" />, name: 'TypeScript' },
                { icon: <SiNodedotjs className="w-5 h-5 text-green-600" />, name: 'Node.js' },
                { icon: <SiPostgresql className="w-5 h-5 text-blue-700" />, name: 'PostgreSQL' },
                { icon: <SiMongodb className="w-5 h-5 text-green-700" />, name: 'MongoDB' },
                { icon: <SiFirebase className="w-5 h-5 text-yellow-600" />, name: 'Firebase' },
                { icon: <SiTailwindcss className="w-5 h-5 text-cyan-500" />, name: 'Tailwind' },
                { icon: <SiVercel className="w-5 h-5 text-gray-700" />, name: 'Vercel' },
                { icon: <SiDocker className="w-5 h-5 text-blue-500" />, name: 'Docker' },
                { icon: <FaServer className="w-5 h-5 text-blue-500" />, name: 'Render' },
                { icon: <FaGlobe className="w-5 h-5 text-gray-500" />, name: 'REST APIs' },
                { icon: <FaCode className="w-5 h-5 text-gray-500" />, name: 'Git' },
              ].map((skill, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl flex items-center gap-3 hover:bg-gray-50 transition-all hover:shadow-md border border-gray-100 group cursor-default">
                  <div className="group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <span className="font-medium text-gray-700 text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ===== PROJECTS ===== */}
          <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20 py-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaCode className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <img src="/Homepage.png" alt="Rescue System" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">Santa Rosa Rescue System</h3>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    Real-time emergency response platform with live incident feeds, GPS tracking, photo uploads, and interactive mapping.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">React</span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">Node.js</span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">MongoDB</span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">Tailwind</span>
                  </div>
                  <a href="https://www.rescuesantarosagov.live/" target="_blank" className="inline-flex items-center gap-2 mt-4 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all">
                    View Project <span className="text-gray-400">↗</span>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCode className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">More Projects Coming</h3>
                  <p className="text-gray-500 text-sm mt-2">
                    I'm currently working on new projects. Stay tuned!
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ===== CONTACT ===== */}
          <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20 py-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaPaperPlane className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/5">
                  <p className="text-gray-600 mb-6">Have a project in mind? Let's collaborate.</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaEnvelope className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Email</p>
                        <a href="mailto:caruniapaolovince@gmail.com" className="text-gray-900 hover:text-blue-600 transition">caruniapaolovince@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaBriefcase className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Phone</p>
                        <span className="text-gray-900">+63 926 624 7473</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaGlobe className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Location</p>
                        <span className="text-gray-900">Nueva Ecija, Philippines</span>
                      </div>
                    </div>
                  </div>
                </div>
                <form ref={form} onSubmit={sendEmail} className="md:w-3/5 space-y-4">
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Your Message"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  {formStatus.message && (
                    <div className={`text-sm text-center p-3 rounded-lg ${formStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.section>

          {/* ===== FOOTER ===== */}
          <footer className="pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400">&copy; 2026 Paolo Vincent Carunia. Crafted with precision.</p>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default App;