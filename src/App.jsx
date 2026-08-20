import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FaMapMarkerAlt,
  FaCode, FaDatabase, FaServer, FaGlobe, FaDownload,
  FaBriefcase, FaPaperPlane
} from 'react-icons/fa';
import {
  SiReact, SiNodedotjs, SiMongodb,
  SiTailwindcss, SiVercel
} from 'react-icons/si';

function App() {
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
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans scroll-smooth overflow-x-hidden">

      {/* ===== STICKY TOP NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="text-xl font-serif font-bold tracking-tight text-gray-900">PC.</span>
          <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-black transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ===== MAIN CENTERED CONTENT ===== */}
      <main className="w-full flex flex-col items-center justify-center px-6 py-12 md:py-24">

        {/* INNER WRAPPER - Controls max width */}
        <div className="w-full max-w-4xl flex flex-col gap-20">

          {/* ===== HERO SECTION ===== */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12"
          >
            {/* Square Image - No Outline */}
            <div className="w-40 h-40 md:w-52 md:h-52 bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
              <img src="/Profile.jpeg" alt="Paolo Vincent Carunia" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-serif text-gray-900 tracking-tight">Paolo Vincent Carunia</h1>
              <p className="text-lg text-gray-500 mt-1 font-medium">BSIT Student &amp; Freelance Web Developer</p>

              {/* ✅ Capstone role */}
              <p className="text-sm text-gray-400 mt-1">Full Stack Developer | The Municipal Rescue System</p>

              <p className="text-gray-600 mt-6 max-w-lg leading-relaxed mx-auto md:mx-0">
                I build clean, responsive web applications for real-world use. I recently developed a live emergency response system for the Municipality of Santa Rosa.
              </p>

              {/* 🔹 ARROW SLIDES 4PX TO THE RIGHT ON HOVER */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
                <a href="https://github.com/dashboard" target="_blank" className="group relative inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  GitHub
                  <span className="opacity-0 transform translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-xs text-gray-400">↗</span>
                </a>
                <a href="https://www.linkedin.com/in/paolo-vincent-carunia-1637aa3ba/" target="_blank" className="group relative inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  LinkedIn
                  <span className="opacity-0 transform translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-xs text-gray-400">↗</span>
                </a>
                <a href="mailto:caruniapaolovince@gmail.com" className="group relative inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  Email
                  <span className="opacity-0 transform translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-xs text-gray-400">↗</span>
                </a>
                <a href="/resume.pdf" download className="group relative inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  CV
                  <span className="opacity-0 transform translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-xs text-gray-400">↗</span>
                </a>
              </div>
            </div>
          </motion.section>

          {/* ===== ABOUT SECTION ===== */}
          <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20">
            <h2 className="text-2xl font-serif text-gray-900 mb-4 flex items-center gap-2">
              <FaCode className="w-5 h-5 text-gray-500" /> About
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              I am currently pursuing a BSIT degree at NEUST. I love building tools that solve local problems. I recently developed a real-time emergency response system for Santa Rosa, strengthening my skills in React, Node.js, and real-time data handling.
            </p>
          </motion.section>

          {/* ===== EXPERIENCE SECTION ===== */}
          <motion.section id="experience" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 flex items-center gap-2">
              <FaBriefcase className="w-5 h-5 text-gray-500" /> Experience
            </h2>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-start md:gap-6 border-l-2 border-gray-100 pl-4 md:pl-6">
                <span className="text-sm text-gray-400 md:w-28 shrink-0">2024 – Present</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Freelance Web Developer</h3>
                  <p className="text-gray-500 text-sm">Commission-Based Projects</p>
                  <p className="text-gray-600 mt-1 text-sm">Building custom websites and web apps for clients.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-start md:gap-6 border-l-2 border-gray-100 pl-4 md:pl-6">
                <span className="text-sm text-gray-400 md:w-28 shrink-0">2023 – Present</span>
                <div>
                  <h3 className="font-semibold text-gray-900">BSIT Student</h3>
                  <p className="text-gray-500 text-sm">Nueva Ecija University of Science and Technology</p>
                  <p className="text-gray-600 mt-1 text-sm">Currently under Web System Development.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ===== SKILLS SECTION ===== */}
          <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 flex items-center gap-2">
              <FaDatabase className="w-5 h-5 text-gray-500" /> Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition border border-gray-100">
                <SiReact className="w-5 h-5 text-cyan-500" />
                <span className="font-medium text-gray-700 text-xs">React</span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition border border-gray-100">
                <SiNodedotjs className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-700 text-xs">Node.js</span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition border border-gray-100">
                <SiMongodb className="w-5 h-5 text-green-700" />
                <span className="font-medium text-gray-700 text-xs">MongoDB</span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition border border-gray-100">
                <SiTailwindcss className="w-5 h-5 text-cyan-500" />
                <span className="font-medium text-gray-700 text-xs">Tailwind CSS</span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition border border-gray-100">
                <SiVercel className="w-5 h-5 text-gray-700" />
                <span className="font-medium text-gray-700 text-xs">Vercel</span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition border border-gray-100">
                <FaServer className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-700 text-xs">Render</span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition border border-gray-100">
                <FaGlobe className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700 text-xs">Ngrok</span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition border border-gray-100">
                <FaCode className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700 text-xs">Git & GitHub</span>
              </div>
            </div>
          </motion.section>

          {/* ===== PROJECTS SECTION ===== */}
          <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 flex items-center gap-2">
              <FaCode className="w-5 h-5 text-gray-500" /> Work
            </h2>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-5/12 h-48 md:h-auto bg-gray-50">
                  <img src="/Homepage.png" alt="iRespond Dashboard" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:w-7/12 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900">Santa Rosa Rescue System</h3>
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">Real-time emergency response platform with live incident feeds, GPS, photo uploads, and mapping.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">React</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Node.js</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">MongoDB</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Tailwind</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Vercel</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a href="https://www.rescuesantarosagov.live/" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition">
                      <FaGlobe className="w-4 h-4" /> Visit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ===== CONTACT SECTION ===== */}
          <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="scroll-mt-20">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 flex items-center gap-2">
              <FaPaperPlane className="w-5 h-5 text-gray-500" /> Contact
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <p className="text-gray-600 mb-4">Have a project or idea? Feel free to reach out.</p>
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                  <span className="font-medium">Email:</span> caruniapaolovince@gmail.com
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="font-medium">Phone:</span> +63 926 624 7473
                </div>
              </div>
              <form ref={form} onSubmit={sendEmail} className="md:w-1/2 space-y-3">
                <input type="text" name="user_name" placeholder="Name" required className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400" />
                <input type="email" name="user_email" placeholder="Email" required className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400" />
                <textarea name="message" rows="3" placeholder="Message" required className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 resize-none"></textarea>
                <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-60">
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          </motion.section>

          {/* ===== FOOTER ===== */}
          <footer className="pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400">&copy; 2026 Paolo Vincent Carunia</p>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default App;