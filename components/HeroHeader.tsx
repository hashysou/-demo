import React from 'react';

export type CompanyInfo = {
  address: string;
  mapUrl: string;
  tel?: string;
  fax?: string;
  email?: string;
  hours?: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type Affiliation = {
  name: string;
  url:string;
  imgSrc: string;
  imgAlt: string;
};

export type HeroHeaderProps = {
  brandLogoSrc: string;
  brandLogoAlt: string;
  brandNameSrOnly: string;
  company: CompanyInfo;
  socials?: SocialLink[];
  affiliations?: Affiliation[];
  className?: string;
};

const HeroHeader: React.FC<HeroHeaderProps> = ({
  brandLogoSrc,
  brandLogoAlt,
  brandNameSrOnly,
  company,
  socials,
  affiliations,
  className = '',
}) => {
  return (
    <header role="banner" className={`font-sans text-[#111] max-w-[72ch] mx-auto px-4 py-12 md:py-16 ${className}`}>
      <h1 className="sr-only">{brandNameSrOnly}</h1>
      <img 
        src={brandLogoSrc} 
        alt={brandLogoAlt} 
        className="block mx-auto h-auto max-h-[72px] w-auto mb-12"
      />

      <section className="text-center mb-12" aria-labelledby="company-info">
        <h2 id="company-info" className="sr-only">会社基本情報</h2>
        <address className="not-italic mb-6 text-base leading-relaxed">
          {company.address}
          {' '}
          (<a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="text-[#0a66c2] underline hover:opacity-90 transition-opacity motion-reduce:transition-none">MAP</a>)
        </address>
        <ul className="space-y-2 text-sm text-[#666]">
          {company.tel && <li>Tel：<a href={`tel:${company.tel.replace(/-/g, '')}`} className="text-[#0a66c2] underline hover:opacity-90 transition-opacity motion-reduce:transition-none">{company.tel}</a></li>}
          {company.fax && <li>Fax：{company.fax}</li>}
          {company.email && <li>Email：<a href={`mailto:${company.email}`} className="text-[#0a66c2] underline hover:opacity-90 transition-opacity motion-reduce:transition-none">{company.email}</a></li>}
          {company.hours && <li>営業時間：{company.hours}</li>}
        </ul>
      </section>

      {socials && socials.length > 0 && (
        <nav className="text-center mb-12" aria-label="運営・関連アカウント">
          <ul className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap">
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0a66c2] underline hover:opacity-90 transition-opacity motion-reduce:transition-none">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {affiliations && affiliations.length > 0 && (
        <section className="pt-12 border-t border-[#e5e5e5]" aria-label="関連ブランド／拠点">
          <ul className="flex justify-center items-center gap-x-8 gap-y-4 flex-wrap">
            {affiliations.map((affiliation) => (
              <li key={affiliation.name}>
                <a href={affiliation.url} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity motion-reduce:transition-none">
                  <img src={affiliation.imgSrc} alt={affiliation.imgAlt} className="h-10 w-auto" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </header>
  );
};

export default HeroHeader;
