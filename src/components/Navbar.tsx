import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Activity, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Activity 
              size={32} 
              className="text-primary-600" 
              strokeWidth={2.5} 
            />
            <span className="text-xl font-bold text-primary-800">MEDICA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" current={location.pathname}>
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/treatment-planner" current={location.pathname}>
              <Heart size={18} />
              <span>Treatment Planner</span>
            </NavLink>
            <NavLink to="/health-diagnosis" current={location.pathname}>
              <Activity size={18} />
              <span>Health Diagnosis</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-primary-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              <MobileNavLink to="/" current={location.pathname}>
                <Home size={18} />
                <span>Home</span>
              </MobileNavLink>
              <MobileNavLink to="/treatment-planner" current={location.pathname}>
                <Heart size={18} />
                <span>Treatment Planner</span>
              </MobileNavLink>
              <MobileNavLink to="/health-diagnosis" current={location.pathname}>
                <Activity size={18} />
                <span>Health Diagnosis</span>
              </MobileNavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  current: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, current }) => {
  const isActive = current === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
        isActive 
          ? 'text-primary-600 font-medium' 
          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, children, current }) => {
  const isActive = current === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-3 rounded-md ${
        isActive 
          ? 'bg-primary-50 text-primary-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;