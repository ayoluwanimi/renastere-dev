import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function Footer() {
  const { content } = useContent();

  return (
    <footer className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              {content.images?.logo ? (
                <img src={content.images.logo} alt="Renastere Dev Logo" className="w-10 h-10 rounded-lg object-cover" />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
              )}
              <span className="text-white font-bold text-xl">Renastere Dev</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              {content.footer.tagline}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#e94560] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#e94560] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#e94560] transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#e94560] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#e94560] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-[#e94560] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-400 hover:text-[#e94560] transition-colors">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={16} className="text-[#e94560]" />
                <span>{content.contact.email}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={16} className="text-[#e94560]" />
                <span>{content.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin size={16} className="text-[#e94560]" />
                <span>{content.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
