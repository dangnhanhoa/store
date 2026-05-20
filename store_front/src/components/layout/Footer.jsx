import { Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* Main grid — 3 columns: Brand | Quick Links | Contact */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {/* Brand — spans 2 cols on large screens */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="bg-white rounded-xl p-2 inline-block">
                <img src="/NH_Store_logo.png" alt="BookStore" className="h-12 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              Your trusted online bookstore with a wide selection of titles across every genre.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center
                           hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Facebook className="w-4 h-4 text-slate-300" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center
                           hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-slate-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/',                   label: 'Home' },
                { to: '/books?filter=new',   label: 'New Books' },
                { to: '/bestsellers',        label: 'Bestsellers' },
                { to: '/books',              label: 'All Books' },
                { to: '/books?discount=true',label: 'Promotions' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">International University, Ho Chi Minh City</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm">093 892 2306</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm break-all">ITITIU21205@student.hcmiu.edu.vn</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-slate-500 text-xs">
              © 2026 BookStore. All rights reserved.
            </p>
            <div className="flex gap-5 text-xs">
              <a href="/privacy" className="text-slate-500 hover:text-blue-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-slate-500 hover:text-blue-400 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
