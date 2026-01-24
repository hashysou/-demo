import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent-b text-base border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-base">富永建具</h3>
            <p className="mt-2 text-sm text-gray-400">
              〒779-1102  徳島県阿南市羽ノ浦町宮倉芝生13-7<br />
              TEL: 0884-44-2369 (受付時間: 平日 9:00-17:00)<br />
              MAIL: tominaga@chive.ocn.ne.jp
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-base transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.792 2.013 10.146 2 12.315 2zm-1.161 1.545a3.837 3.837 0 00-3.37 3.37c-.045 1.002-.058 1.334-.058 3.59s.013 2.588.058 3.59a3.837 3.837 0 003.37 3.37c1.002.045 1.334.058 3.59.058s2.588-.013 3.59-.058a3.837 3.837 0 003.37-3.37c.045-1.002.058-1.334.058-3.59s-.013-2.588-.058-3.59a3.837 3.837 0 00-3.37-3.37c-1.002-.045-1.334-.058-3.59-.058s-2.588.013-3.59.058zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM12 14a2 2 0 110-4 2 2 0 010 4zm4-7.5a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">サイトマップ</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-sm text-gray-400 hover:text-base transition-colors">会社紹介</Link></li>
              <li><Link to="/services" className="text-sm text-gray-400 hover:text-base transition-colors">事業紹介</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-400 hover:text-base transition-colors">問い合わせ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">規約</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-base transition-colors">プライバシーポリシー</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-base transition-colors">サイトポリシー</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Tominaga Tategu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;