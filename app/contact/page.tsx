"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import { useLanguage } from "../../contexts/LanguageProvider";
import { useState } from "react";

const ContactPage = () => {
  const { language, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Contact form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: language === "ar" ? "العنوان" : "Address",
      details:
        language === "ar"
          ? "القاهرة، مصر الجديدة، شارع الميرغني"
          : "El Merghany St, Heliopolis, Cairo, Egypt",
    },
    {
      icon: FiPhone,
      title: language === "ar" ? "الهاتف" : "Phone",
      details: "contact@tajscarf.com",
    },
    {
      icon: FiMail,
      title: language === "ar" ? "البريد الإلكتروني" : "Email",
      details: "info@tajscarf.com",
    },
    {
      icon: FiClock,
      title: language === "ar" ? "ساعات العمل" : "Working Hours",
      details:
        language === "ar"
          ? "يوميًا: من 7:00 ص إلى 3:00 ص"
          : "Daily: 7:00 AM - 3:00 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-[#EEEFF1] dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === "ar" ? "تواصل معنا" : "Contact Us"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === "ar"
              ? "نحن هنا لمساعدتك! تواصل معنا لأي استفسارات أو اقتراحات"
              : "We're here to help! Contact us for any inquiries or suggestions"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/30"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {language === "ar" ? "أرسل لنا رسالة" : "Send us a Message"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 px-1"
                  >
                    {language === "ar" ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-zinc-500/20 focus:border-zinc-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder={
                      language === "ar" ? "اسمك الكامل" : "Your full name"
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 px-1"
                  >
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-zinc-500/20 focus:border-zinc-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder={
                      language === "ar" ? "بريدك الإلكتروني" : "your@email.com"
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 px-1"
                  >
                    {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-zinc-500/20 focus:border-zinc-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder={
                      language === "ar" ? "رقم الهاتف" : "+20 ..."
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 px-1"
                  >
                    {language === "ar" ? "الموضوع" : "Subject"}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-zinc-500/20 focus:border-zinc-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder={
                      language === "ar" ? "موضوع الرسالة" : "Message subject"
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 px-1"
                >
                  {language === "ar" ? "الرسالة" : "Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-zinc-500/20 focus:border-zinc-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white resize-none transition-all duration-300"
                  placeholder={
                    language === "ar"
                      ? "اكتب رسالتك هنا..."
                      : "Write your message here..."
                  }
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-br from-zinc-700 to-zinc-900 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:shadow-zinc-500/30 transition-all duration-300 flex items-center justify-center space-x-3 rtl:space-x-reverse text-lg"
              >
                <FiSend className="w-6 h-6" />
                <span>
                  {language === "ar" ? "إرسال الرسالة" : "Send Message"}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/30 h-full">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {language === "ar" ? "معلومات التواصل" : "Contact Information"}
              </h2>

              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ x: isRTL ? -10 : 10 }}
                    className="flex items-start space-x-6 rtl:space-x-reverse group p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300 group-hover:bg-zinc-800 group-hover:text-white dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900">
                      <info.icon className="w-7 h-7 transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line text-lg leading-relaxed">
                        {info.details}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {language === "ar" ? "موقعنا" : "Our Location"}
              </h2>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1986766542497!2d29.9336524!3d31.2112728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c56d7ecb5de7%3A0x8bb31b07fa3884c0!2sCairo%20Egypt!5e0!3m2!1sar!2seg!4v1735068000000!5m2!1sar!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
