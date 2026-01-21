import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cyan-700 text-gray-100 pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Jersey<span className="text-red-500">Store</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for premium football jerseys.
            Authentic designs. Worldwide delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/category/club" className="hover:text-white">Club Jerseys</Link></li>
            <li><Link to="/category/country" className="hover:text-white">National Jerseys</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-white">FAQs</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">
            Subscribe to get special offers and updates.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-gray-500 px-3 py-2 rounded-l-md text-red-00 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-600 px-4 py-2 rounded-r-md hover:bg-gray-800 transition cursor-pointer"
            >
              <Mail size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <p className="text-sm">
            © {new Date().getFullYear()} JerseyStore. All rights reserved.
          </p>

          <div className="flex gap-4 ">
            <a href="#" className="hover:text-white transition-transform hover:scale-110">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-white transition-transform hover:scale-110">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-white transition-transform hover:scale-110">
              <Twitter size={20} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
