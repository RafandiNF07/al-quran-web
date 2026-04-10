import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors">
          Al-Quran <span className="font-light">Digital</span>
        </Link>
        
        <div className="space-x-4 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-teal-600">Beranda</Link>
          <a href="https://equran.id/apiv2" target="_blank" rel="noreferrer" className="hover:text-teal-600">API Source</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;