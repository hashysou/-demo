import React from 'react';
import HeroHeader, { CompanyInfo, SocialLink, Affiliation } from '../components/HeroHeader';

const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-white py-12 md:py-20 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-main">{title}</h1>
            <p className="mt-4 text-lg text-text-sub">{subtitle}</p>
        </div>
    </div>
);

const Contact: React.FC = () => {
    // Data from the prompt, using placeholder images that will render
    const companyData: {
        brandLogoSrc: string;
        brandLogoAlt: string;
        brandNameSrOnly: string;
        company: CompanyInfo;
        socials: SocialLink[];
        affiliations: Affiliation[];
    } = {
      brandLogoSrc: "https://assets.codepen.io/3/tominaga-tategu-logo-black.svg",
      brandLogoAlt: "有限会社富永建具 ロゴ",
      brandNameSrOnly: "有限会社富永建具",
      company: {
        address: "〒XXX-XXXX 徳島県徳島市◯◯◯◯",
        mapUrl: "https://maps.google.com/?q=徳島市◯◯◯◯",
        tel: "088-XXX-XXXX",
        fax: "088-XXX-XXXX",
        email: "info@tominaga-tategu.test",
        hours: "平日 9:00-18:00"
      },
      socials: [
        { label: "@yuji_tominaga", url: "https://instagram.com/yuji_tominaga" },
        { label: "@koyasoko", url: "https://instagram.com/koyasoko" }
      ],
      affiliations: [
        { name: "U,G FURNITURE", url: "https://ugfurniture.com", imgSrc: "https://assets.codepen.io/3/ug-furniture-logo-black.svg", imgAlt: "U,G FURNITURE ロゴ" },
        { name: "KOYA SO-KO", url: "https://www.instagram.com/koyasoko", imgSrc: "https://assets.codepen.io/3/koya-soko-logo-black.svg", imgAlt: "KOYA SO-KO ロゴ" }
      ]
    };

    return (
        <div className="bg-base">
            <PageHeader title="問い合わせ" subtitle="ご相談、お見積りの依頼はこちらから" />
            <div className="bg-white">
                 <HeroHeader 
                    brandLogoSrc={companyData.brandLogoSrc}
                    brandLogoAlt={companyData.brandLogoAlt}
                    brandNameSrOnly={companyData.brandNameSrOnly}
                    company={companyData.company}
                    socials={companyData.socials}
                    affiliations={companyData.affiliations}
                />
            </div>
        </div>
    );
};

export default Contact;
