import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section className="bg-gray-50 py-16 px-4" id="contact">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Contact Us
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Have questions about jerseys, orders, or custom prints? Reach out to us — we’re happy to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Get in Touch</h3>

            <div className="flex items-center gap-4 text-gray-700">
              <Mail className="text-black" />
              <span>support@jerseystore.com</span>
            </div>

            <div className="flex items-center gap-4 text-gray-700">
              <Phone className="text-black" />
              <span>+977 9746812244</span>
            </div>
            
            <div className="flex items-center gap-4 text-gray-700">
              <MapPin className="text-black" />
              <span>Kathmandu, Nepal</span>
            </div>

            <p className="text-sm text-gray-500">
              Our support team is available Monday to Saturday, 9:00 AM – 7:00 PM.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 ">Send a Message</h3>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              ></textarea>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
