"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Footer from "@/components/Footer";

function GalleryGrid() {
  const galleryItems = [
    { title: "Manicures", img: "/images/section_manicures.jpg" },
    { title: "Nail Art", img: "/images/section_nail_arts.jpg" },
    { title: "Acrylic Nails", img: "/images/section_acrylic_nails.jpg" },
    { title: "Manicures 2", img: "/images/section_manicures.jpg" },
    { title: "Nail Art 2", img: "/images/section_nail_arts.jpg" },
    { title: "Acrylic Nails 2", img: "/images/section_acrylic_nails.jpg" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={item.img}
              alt={item.title}
              width={400}
              height={400}
              className="h-64 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />

            {/* Overlay with title */}
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/70 px-4 py-2 rounded-md">
                <span className="text-pink-600 font-semibold">{item.title}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-0">
          <button
            className="absolute top-5 right-5 text-white text-3xl md:text-4xl font-bold z-50"
            onClick={closeLightbox}
          >
            ×
          </button>

          <button
            className="absolute left-2 md:left-5 text-white text-2xl md:text-3xl font-bold z-50"
            onClick={prevImage}
          >
            ‹
          </button>

          <div className="relative w-full max-w-lg md:w-4/5 h-[60vh] md:h-4/5 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={galleryItems[currentIndex].img}
                  alt={galleryItems[currentIndex].title}
                  fill
                  className="object-contain"
                />
                <p className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm md:text-lg bg-black/50 px-2 md:px-4 py-1 md:py-2 rounded">
                  {galleryItems[currentIndex].title}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="absolute right-2 md:right-5 text-white text-2xl md:text-3xl font-bold z-50"
            onClick={nextImage}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Home */}
        <section
          id="home"
          className="relative flex min-h-screen w-full items-center justify-center px-6 md:px-12 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/home_bg.png')" }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0"></div>

          {/* Hero content */}
          <div className="relative z-10 text-center text-white space-y-4">
            {/* Logo */}
            <motion.div
              className="flex justify-center mb-2"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-64 h-64 md:w-[420px] md:h-[420px] relative">
                <Image
                  src="/images/logo.png"
                  alt="AR Nails Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl text-pink-600 font-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Welcome to AR Nails
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              className="text-base sm:text-lg md:text-gray-600 font-secondary my-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              Get Beautiful. Glamorous Nails You'll Love!
            </motion.p>

            {/* Button */}
            <motion.a
              href="#contact"
              className="inline-block rounded-full px-6 md:px-8 py-3 md:py-4 font-medium text-white shadow-lg shadow-pink-300/50 transition transform hover:scale-105 hover:shadow-xl bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              Book an Appointment
            </motion.a>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="px-6 md:px-12 py-20 bg-white">
          <div className="mx-auto max-w-6xl text-center">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl text-pink-600 font-primary mb-12 md:mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Our Services
            </motion.h1>

            <div className="flex flex-col items-center gap-12 md:flex-row md:justify-center md:gap-12">
              {[
                {
                  title: "Manicures",
                  desc: "Classic and modern manicures designed to keep your nails beautiful.",
                  img: "/images/section_manicures.jpg",
                },
                {
                  title: "Nail Art",
                  desc: "Custom nail designs for any style, from subtle elegance to bold creativity.",
                  img: "/images/section_nail_arts.jpg",
                },
                {
                  title: "Acrylic Nails",
                  desc: "Durable, long-lasting acrylic nails for a flawless and glamorous look.",
                  img: "/images/section_acrylic_nails.jpg",
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3, duration: 0.8 }}
                >
                  {/* Card with title & description */}
                  <div className="mt-32 md:mt-36 w-full sm:w-64 md:w-72 bg-gray-100 rounded-xl p-6 shadow-md text-center">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl text-pink-700 font-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">{service.desc}</p>
                  </div>

                  {/* Image */}
                  <div className="absolute -top-12 flex h-48 w-48 sm:h-50 sm:w-50 items-center justify-center rounded-full border-4 border-pink-500 shadow-lg overflow-hidden bg-pink-100">
                    <Image src={service.img} alt={service.title} fill className="object-cover" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="px-6 md:px-12 py-20 bg-pink-50">
          <div className="mx-auto max-w-6xl text-center">
            <motion.h2
              className="mb-12 text-3xl sm:text-4xl md:text-5xl font-primary text-pink-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Gallery
            </motion.h2>

            <GalleryGrid />
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative px-6 md:px-12 py-20 bg-pink-50 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-200/50 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-pink-300/40 rounded-full blur-3xl pointer-events-none"></div>

          <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12 relative z-10 space-y-6 md:space-y-0">
            {/* Image */}
            <motion.div
              className="relative w-full md:w-1/2 h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/section_manicures.jpg"
                alt="About AR Nails"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              className="w-full md:w-1/2 text-center md:text-left space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-primary text-pink-600 font-thin">
                About AR Nails
              </h2>

              <p className="text-pink-700 italic font-semibold text-base sm:text-lg md:text-xl">
                "Your nails, our masterpiece."
              </p>

              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                At AR Nails, we are dedicated to creating beautiful, healthy nails that make you feel confident and glamorous. Our team uses high-quality products and provides personalized care to ensure each visit is a pampering experience.
              </p>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                From classic manicures to creative nail art, we combine precision, creativity, and hygiene to deliver flawless results every time. Your satisfaction is our top priority.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Customer Feedback */}
        <section id="feedback" className="px-6 md:px-12 py-20 bg-white">
          <div className="mx-auto max-w-6xl text-center">
            <motion.h2
              className="mb-12 text-3xl sm:text-4xl md:text-5xl font-primary text-pink-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              What Our Customers Say
            </motion.h2>

            <div className="flex flex-col gap-8 md:flex-row md:justify-center md:gap-8">
              {[
                {
                  name: "Emily R.",
                  feedback:
                    "AR Nails always delivers perfect nails! The staff is friendly, and I always leave feeling pampered.",
                  img: "/images/customer1.jpg",
                },
                {
                  name: "Sophia L.",
                  feedback:
                    "I love their nail art designs! Every time I come, I get compliments on my nails.",
                  img: "/images/customer2.jpg",
                },
                {
                  name: "Olivia M.",
                  feedback:
                    "Professional and welcoming! The manicure and acrylics last so long and look amazing.",
                  img: "/images/customer3.jpg",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative bg-pink-50 rounded-xl shadow-lg p-6 md:w-80 w-full mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3, duration: 0.8 }}
                >
                  <p className="text-gray-700 text-sm mb-4">{item.feedback}</p>
                  <h3 className="text-pink-600 font-semibold">{item.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative px-6 md:px-12 py-20 bg-white overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200/50 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-300/40 rounded-full blur-3xl pointer-events-none"></div>

          <div className="mx-auto max-w-3xl text-center relative z-10 space-y-8">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-primary text-pink-600 font-thin"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Contact Us
            </motion.h2>

            <motion.p
              className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Have questions or want to book an appointment? We'd love to hear from you!
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="flex items-center gap-3 bg-pink-50 px-6 py-4 rounded-xl shadow-md">
                <span className="text-2xl">📞</span>
                <span className="text-pink-600 font-semibold text-sm sm:text-base">+1 (555) 123-4567</span>
              </div>

              <div className="flex items-center gap-3 bg-pink-50 px-6 py-4 rounded-xl shadow-md">
                <span className="text-2xl">📧</span>
                <span className="text-pink-600 font-semibold text-sm sm:text-base">info@arnails.com</span>
              </div>
            </motion.div>

            <motion.form
              className="mt-8 flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <input type="text" placeholder="Your Name" className="px-4 py-2 rounded-lg border border-gray-300 w-full" />
              <input type="email" placeholder="Your Email" className="px-4 py-2 rounded-lg border border-gray-300 w-full" />
              <textarea placeholder="Your Message" className="px-4 py-2 rounded-lg border border-gray-300 w-full h-32"></textarea>
              <button type="submit" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition">
                Send Message
              </button>
            </motion.form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
