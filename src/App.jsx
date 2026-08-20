import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCode,
  FaDatabase,
  FaServer,
  FaGlobe
} from 'react-icons/fa';
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiSocketdotio,
  SiVercel
} from 'react-icons/si';

function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 font-sans">

      {/* ===== HERO SECTION ===== */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 z-10">
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden shrink-0">
            <span className="text-white text-5xl font-light">PC</span>
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">Paolo Vincent Carunia</h1>
            <p className="text-xl text-blue-600 font-medium mt-2">Student Developer &amp; Full Stack Enthusiast</p>

            <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-gray-500">
              <FaMapMarkerAlt className="w-4 h-4" />
              <span className="text-sm">Bentigan, Cuyapo, Nueva Ecija</span>
            </div>

            <p className="text-gray-600 mt-4 max-w-lg leading-relaxed mx-auto md:mx-0">
              I am an aspiring Full Stack Developer focused on building clean, responsive,
              and impactful web applications. I love turning complex ideas into functional
              tools that serve real-world communities.
            </p>

            <div className="flex justify-center md:justify-start gap-4 mt-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-700">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-700">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="mailto:your.email@example.com" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-700">
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT & SKILLS SECTION ===== */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaCode className="w-6 h-6 text-blue-600" /> About Me
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <p className="text-gray-600 leading-relaxed mb-4">
              I am currently studying web development. My passion lies in building tools
              that solve local problems. I recently developed a real-time emergency response
              system for the Municipality of Santa Rosa, which strengthened my skills in
              React, Node.js, and real-time data handling.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaDatabase className="w-6 h-6 text-blue-600" /> Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
              <SiReact className="w-6 h-6 text-cyan-500" />
              <span className="font-medium text-gray-700">React</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
              <SiNodedotjs className="w-6 h-6 text-green-600" />
              <span className="font-medium text-gray-700">Node.js</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
              <SiExpress className="w-6 h-6 text-gray-700" />
              <span className="font-medium text-gray-700">Express</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
              <SiMongodb className="w-6 h-6 text-green-700" />
              <span className="font-medium text-gray-700">MongoDB</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
              <SiSocketdotio className="w-6 h-6 text-gray-700" />
              <span className="font-medium text-gray-700">Socket.io</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
              <SiTailwindcss className="w-6 h-6 text-cyan-500" />
              <span className="font-medium text-gray-700">Tailwind CSS</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
              <SiVercel className="w-6 h-6 text-gray-800" />
              <span className="font-medium text-gray-700">Vercel</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
              <FaServer className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-gray-700">REST APIs</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
              <FaGlobe className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-gray-700">Git &amp; GitHub</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section className="bg-white py-16 px-6 border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <FaCode className="w-6 h-6 text-blue-600" /> Featured Project
          </h2>

          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="md:flex">
              <div className="md:w-5/12 bg-gray-200 h-48 md:h-auto flex items-center justify-center text-gray-400 text-sm p-4">
                [Screenshot of iRespond Dashboard]
              </div>
              <div className="p-6 md:w-7/12 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Santa Rosa Municipal Rescue System</h3>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    A real-time emergency response platform built for the Municipality of Santa Rosa.
                    Connects citizens to dispatchers with live incident feeds, GPS geolocation, photo uploads, and real-time mapping.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">React</span>
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">Node.js</span>
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">Express</span>
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">MongoDB</span>
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">Socket.io</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <a href="https://www.rescuesantarosagov.live/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                    <FaGlobe className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 px-6 text-center">
        <div className="max-w-4xl mx-auto border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Paolo Vincent Carunia.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;