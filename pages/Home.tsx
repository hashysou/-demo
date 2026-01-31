import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { worksData } from '../data/worksData';
import { Work } from '../types';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

// 画像パスの設定
// プロジェクトルートの 'image' フォルダ内に '1.jpg', '2.jpg', '3.jpg' を配置してください。
// 画像が見つからない場合は自動的にUnsplashの画像が表示されます。
const heroImages = [
  '/image/1.jpg',
  '/image/2.jpg',
  '/image/3.jpg',
];

const fallbackImages = [
  'https://images.unsplash.com/photo-1595675024-8b028e52198e?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581092446333-cece8a959a45?q=80&w=1920&auto=format&fit=crop',
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // 画像が1枚以下の場合はスライドショーを行わない
    if (heroImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="relative h-screen flex items-end justify-end overflow-hidden bg-accent-b">
      {/* Image Background Slideshow */}
      {heroImages.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Hero background image ${index + 1}`}
          className={`absolute inset-0 z-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          onError={(e) => {
            // 画像読み込みエラー時に非表示にせず、フォールバック画像に差し替える
            const target = e.currentTarget;
            target.onerror = null; // 無限ループ防止
            target.src = fallbackImages[index % fallbackImages.length];
            // コンソールにエラーを表示（デバッグ用）
            console.warn(`Failed to load image: ${src}. using fallback.`);
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 p-8 md:p-16 text-right text-base">
          <h1 className="sr-only">富永建具</h1>
          <img 
              src="https://drive.google.com/uc?export=view&id=1BW3ozZ-qQdl7yGncQG9z8-sBx08olhaO" 
              alt="富永建具 ロゴ" 
              className="w-48 md:w-64 ml-auto mb-8" 
          />
          <address className="not-italic space-y-2 text-sm leading-relaxed">
              <p>
                  徳島県阿南市羽ノ浦町宮倉芝生13-7 
                  <a href="https://maps.google.com/?q=徳島県阿南市羽ノ浦町宮倉芝生13-7" target="_blank" rel="noopener noreferrer" className="ml-2 underline hover:text-gray-300 transition-colors">MAP</a>
              </p>
              <p>TEL: <a href="tel:0884442369" className="hover:text-gray-300 transition-colors">0884-44-2369</a></p>
              <p>FAX: 0884-44-2061</p>
              <p>E-mail: <a href="mailto:tominaga@chive.ocn.ne.jp" className="hover:text-gray-300 transition-colors">tominaga@chive.ocn.ne.jp</a></p>
              <p>営業時間: 8:00〜17:00 （日・祝祭日は休み）</p>
          </address>

           {/* Affiliate Logos */}
          <div className="mt-10 flex justify-end items-center gap-x-8 border-t border-white/20 pt-6">
              <a href="https://ugfurniture.com" target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                  <img 
                      src="https://assets.codepen.io/3/ug-furniture-logo-black.svg" 
                      alt="U,G FURNITURE ロゴ" 
                      className="h-8 w-auto brightness-0 invert" 
                  />
              </a>
              <a href="https://www.instagram.com/koyasoko" target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                  <img 
                      src="https://assets.codepen.io/3/koya-soko-logo-black.svg" 
                      alt="KOYA SO-KO ロゴ" 
                      className="h-8 w-auto brightness-0 invert"
                  />
              </a>
          </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-xs tracking-widest uppercase text-base/80">
          <span>Scroll</span>
          <div className="relative w-px h-16 mt-2 bg-base/30 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-8 bg-base animate-scroll-indicator"></div>
          </div>
      </div>
    </div>
  );
};

const AboutSection: React.FC = () => (
    <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                    <div className="order-2 md:order-1">
                        <SectionHeading
                            id="about-digest"
                            align="split"
                            variant="subtitled"
                            titleFlow="vertical"
                            eyebrow={<span lang="en">About Us</span>}
                            title="受け継がれる、誠実な手仕事。"
                            subtitle={
                                <>
                                    　創業から半世紀以上、私たちは一貫して「木」と向き合い、その可能性を追求してきました。建具・家具づくりは、単なる製作ではなく、空間の価値を決定づける仕事だと考えています。良質な素材、確かな技術、そして細部への徹底したこだわり。<br />
                                    　富永建具は、お客様一人ひとりの想いを形にし、時代を超えて愛される空間をつくり続けています。
                                </>
                            }
                            actions={
                                <Link to="/about">富永建具について</Link>
                            }
                        />
                    </div>
                    <div className="order-1 md:order-2 self-center">
                        <img src="https://images.unsplash.com/photo-1595675024-8b028e52198e?q=80&w=1200&auto=format&fit=crop" alt="工房での手仕事の様子" className="w-full h-auto object-cover rounded-sm" />
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </div>
);

const ServicesSection: React.FC = () => (
    <div className="bg-base">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                    <div className="self-center">
                        <img src="https://images.unsplash.com/photo-1581092446333-cece8a959a45?q=80&w=1200&auto=format&fit=crop" alt="プロジェクトの図面と道具" className="w-full h-auto object-cover rounded-sm" />
                    </div>
                    <div>
                        <SectionHeading
                            id="services-digest"
                            align="split"
                            variant="subtitled"
                            titleFlow="vertical"
                            eyebrow={<span lang="en">Services</span>}
                            title="空間に、最適な解を。"
                            subtitle={
                                <>
                                    　個人のお客様のオーダーメイド家具から、法人のお客様の空間づくりまで。私たちは、設計・製作・施工を一貫して行い、建具一枚から空間全体まで向き合います。細部にこだわり思いを込める、その先にある「想像以上」を形にすること。<br />
                                    　用途や条件を超え、空間に本質的な価値をもたらす提案を行います。
                                </>
                            }
                            actions={
                                <Link to="/services">サービス詳細へ</Link>
                            }
                        />
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </div>
);

const WorkCard: React.FC<{ work: Work }> = ({ work }) => (
    <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-4">
        <Link to={`/services#works-gallery`} className="group block overflow-hidden rounded-sm bg-white border border-border h-full flex flex-col">
            <div className="relative pt-[75%]">
                <img src={work.imageUrl} alt={work.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
            </div>
            <div className="p-4 flex-grow">
                <div className="flex justify-between items-center text-xs text-text-sub">
                    <span>{work.category} / {work.region}</span>
                    <span>{work.leadTime}</span>
                </div>
                <h4 className="mt-2 font-semibold text-text-main truncate group-hover:text-accent-a">{work.title}</h4>
            </div>
        </Link>
    </div>
);

const WorksSlider: React.FC = () => {
    const featuredWorks = worksData.slice(0, 6);
    const [currentIndex, setCurrentIndex] = useState(0);
    const numVisibleSlides = window.innerWidth < 768 ? 1 : 3;
    const numSlides = Math.ceil(featuredWorks.length / numVisibleSlides);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? numSlides - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === numSlides - 1 ? 0 : prev - 1));
    };
    
    const getTransformValue = () => {
        if (window.innerWidth < 768) {
            return `translateX(-${currentIndex * 100}%)`;
        }
        return `translateX(-${currentIndex * 100}%)`;
    }

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center">
                        <h2 className="text-3xl font-serif font-bold text-text-main">事例紹介</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-text-sub">私たちの仕事の一部をご紹介します。デザインから納品までのストーリーをご覧ください。</p>
                    </div>
                    <div className="mt-12 relative">
                        <div className="overflow-hidden -mx-2 sm:-mx-4">
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: getTransformValue() }}
                            >
                                {Array.from({ length: numSlides }).map((_, slideIndex) => (
                                    <div key={slideIndex} className="w-full flex-shrink-0 flex justify-center">
                                        {featuredWorks.slice(slideIndex * numVisibleSlides, slideIndex * numVisibleSlides + numVisibleSlides).map(work => (
                                            <WorkCard key={work.id} work={work} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Controls */}
                        <button onClick={handlePrev} className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-4 md:-translate-x-8 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 transition-transform hover:scale-110" aria-label="Previous slide">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button onClick={handleNext} className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-4 md:translate-x-8 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 transition-transform hover:scale-110" aria-label="Next slide">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>

                        {/* Dots */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                            {Array.from({ length: numSlides }).map((_, idx) => (
                                <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-3 h-3 rounded-full transition-colors ${currentIndex === idx ? 'bg-accent-b' : 'bg-border hover:bg-text-sub'}`} aria-label={`Go to slide ${idx + 1}`}></button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-24 text-center">
                        <Link
                            to="/services#works-gallery"
                            className="font-medium text-[#111] no-underline relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#111] after:origin-right after:transition-transform after:duration-400 after:ease-[cubic-bezier(0.22,1,0.36,1)] after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none"
                        >
                            すべての事例を見る
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

const InstagramEmbed: React.FC = () => (
    <div className="bg-base py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
                <h2 className="text-3xl font-serif font-bold text-text-main">Instagram</h2>
                <p className="mt-4 max-w-2xl mx-auto text-text-sub">工房の日常や、製作の裏側、最新の事例などを発信しています。</p>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <a key={index} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group block overflow-hidden aspect-square">
                            <img 
                                src={`https://images.unsplash.com/photo-1511382433913-718b34a2e5d5?q=80&w=500&auto=format&fit=crop&seed=insta${index}`} 
                                alt={`Instagram post ${index + 1}`} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </a>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    </div>
);


const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <WorksSlider />
      <InstagramEmbed />
    </div>
  );
};

export default Home;