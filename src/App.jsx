import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FaMapMarkerAlt,
  FaCode, FaDatabase, FaServer, FaGlobe, FaDownload,
  FaBriefcase, FaPaperPlane, FaBars, FaTimes
} from 'react-icons/fa';
import {
  SiReact, SiNodedotjs, SiMongodb,
  SiTailwindcss, SiVercel
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
    { href: '#about-hero', label: 'About' },
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
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const handleNavClick = (href) => {
    isClickingRef.current = true;
    setActiveSection(href);

    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80; // 👈 Offsets the scroll to account for the fixed navbar
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
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 py-4 px-6 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <a
            href="#top"
            onClick={handleLogoClick}
            className="text-xl font-serif font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity cursor-pointer"
          >
            PC.
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
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
                  className={`relative group transition-colors duration-300 ${isActive ? 'text-gray-900' : 'hover:text-gray-900'
                    }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-gray-900 transition-all duration-300 ${isActive ? 'w-full' : 'w-0'
                      }`}
                  />
                </a>
              );
            })}
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
            aria-label="Open menu"
          >
            <FaBars className="w-6 h-6" />
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
            className="fixed top-0 right-0 h-full w-72 z-[70] bg-white shadow-2xl p-6 md:hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-serif font-bold tracking-tight text-gray-900">PC.</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-black transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-4 text-base font-medium text-gray-600">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleNavClick(link.href);
                  }}
                  className="py-2 hover:text-black transition-colors border-b border-gray-50"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 py-2 px-4 bg-gray-900 text-white text-center rounded-lg text-sm font-medium hover:bg-gray-800 transition"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MAIN CONTENT ===== */}
      <div id="top" className="absolute top-0 left-0 w-full"></div>
      <main className="w-full flex flex-col items-center justify-center px-6 pt-28 md:pt-36 pb-16 md:pb-32">

        <div className="w-full max-w-4xl flex flex-col gap-24 md:gap-24">

          {/* ===== HERO / PROFILE ===== */}
          <motion.section
            id="about-hero"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16"
          >
            <div className="w-40 h-40 md:w-52 md:h-52 bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
              <img src="/Profile.jpeg" alt="Paolo Carunia" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-serif text-gray-900 tracking-tight">Paolo Carunia</h1>
              <p className="text-lg text-gray-500 mt-1 font-medium">BSIT Student &amp; Freelance Web Developer</p>
              <p className="text-sm text-gray-400 mt-1">Full Stack Developer of The Municipal Rescue System</p>
              <p className="text-gray-600 mt-8 max-w-lg leading-relaxed mx-auto md:mx-0">
                I build clean, responsive web applications for real-world use. I recently developed a live emergency response system for the Municipality of Santa Rosa.
              </p>

              {/* 🔹 PILL BUTTONS WITH ARROW & HOVER EFFECT */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-10">
                <a
                  href="https://github.com/dashboard"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white text-gray-700 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                >
                  GitHub
                  <span className="text-gray-500 group-hover:text-white transition-colors duration-300">↗</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/paolo-vincent-carunia-1637aa3ba/"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white text-gray-700 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                >
                  LinkedIn
                  <span className="text-gray-500 group-hover:text-white transition-colors duration-300">↗</span>
                </a>
                <a
                  href="mailto:caruniapaolovince@gmail.com"
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white text-gray-700 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                >
                  Email
                  <span className="text-gray-500 group-hover:text-white transition-colors duration-300">↗</span>
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white text-gray-700 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                >
                  CV
                  <span className="text-gray-500 group-hover:text-white transition-colors duration-300">↗</span>
                </a>
              </div>
            </div>
          </motion.section>

          {/* ===== ABOUT SECTION ===== */}
          <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20 py-8 md:py-12">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 flex items-center gap-3">
              <FaCode className="w-5 h-5 text-gray-500" /> About
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              I am currently pursuing a BSIT degree at NEUST. I love building tools that solve local problems. I recently developed a real-time emergency response system for Santa Rosa, strengthening my skills in React, Node.js, and real-time data handling.
            </p>
          </motion.section>

          {/* ===== EXPERIENCE ===== */}
          <motion.section id="experience" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20 py-8 md:py-12">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 flex items-center gap-3">
              <FaBriefcase className="w-5 h-5 text-gray-500" /> Experience
            </h2>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-start md:gap-6 border-l-2 border-gray-100 pl-4 md:pl-6">
                <span className="text-sm text-gray-400 md:w-28 shrink-0">2024 – Present</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Freelance Web Developer</h3>
                  <p className="text-gray-500 text-sm">Commission-Based Projects</p>
                  <p className="text-gray-600 mt-2 text-sm">Building custom websites and web apps for clients.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-start md:gap-6 border-l-2 border-gray-100 pl-4 md:pl-6">
                <span className="text-sm text-gray-400 md:w-28 shrink-0">2023 – Present</span>
                <div>
                  <h3 className="font-semibold text-gray-900">BSIT Student</h3>
                  <p className="text-gray-500 text-sm">Nueva Ecija University of Science and Technology</p>
                  <p className="text-gray-600 mt-2 text-sm">Currently under Web System Development.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ===== SKILLS ===== */}
          <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20 py-8 md:py-12">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 flex items-center gap-3">
              <FaDatabase className="w-5 h-5 text-gray-500" /> Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: <SiReact className="w-5 h-5 text-cyan-500" />, name: 'React' },
                { icon: <SiNodedotjs className="w-5 h-5 text-green-600" />, name: 'Node.js' },
                { icon: <SiMongodb className="w-5 h-5 text-green-700" />, name: 'MongoDB' },
                { icon: <SiTailwindcss className="w-5 h-5 text-cyan-500" />, name: 'Tailwind CSS' },
                { icon: <SiVercel className="w-5 h-5 text-gray-700" />, name: 'Vercel' },
                { icon: <FaServer className="w-5 h-5 text-blue-500" />, name: 'Render' },
                { icon: <FaGlobe className="w-5 h-5 text-gray-500" />, name: 'Ngrok' },
                { icon: <FaCode className="w-5 h-5 text-gray-500" />, name: 'Git & GitHub' },
              ].map((skill, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition border border-gray-100">
                  {skill.icon}
                  <span className="font-medium text-gray-700 text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ===== PROJECTS ===== */}
          <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20 py-8 md:py-12">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 flex items-center gap-3">
              <FaCode className="w-5 h-5 text-gray-500" /> Work
            </h2>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-5/12 h-48 md:h-auto bg-gray-50">
                  <img src="/Homepage.png" alt="iRespond Dashboard" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:w-7/12 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900">Santa Rosa Rescue System</h3>
                    <p className="text-gray-600 text-base mt-3 leading-relaxed">Real-time emergency response platform with live incident feeds, GPS, photo uploads, and mapping.</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">React</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Node.js</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">MongoDB</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Tailwind</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Vercel</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a href="https://www.rescuesantarosagov.live/" target="_blank" className="inline-flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white text-gray-700 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300">
                      Visit
                      <span className="text-gray-500 group-hover:text-white transition-colors duration-300">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ===== CONTACT ===== */}
          <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20 py-8 md:py-12">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 flex items-center gap-3">
              <FaPaperPlane className="w-5 h-5 text-gray-500" /> Contact
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <p className="text-gray-600 mb-6">Have a project or idea? Feel free to reach out.</p>
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                  <span className="font-medium">Email:</span> caruniapaolovince@gmail.com
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="font-medium">Phone:</span> +63 926 624 7473
                </div>
              </div>
              <form ref={form} onSubmit={sendEmail} className="md:w-1/2 space-y-4">
                <input type="text" name="user_name" placeholder="Name" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400" />
                <input type="email" name="user_email" placeholder="Email" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400" />
                <textarea name="message" rows="3" placeholder="Message" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 resize-none"></textarea>
                <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-60">
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          </motion.section>

          {/* ===== FOOTER ===== */}
          <footer className="pt-12 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400">&copy; 2026 Paolo Vincent Carunia</p>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default App;