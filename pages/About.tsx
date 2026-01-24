import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <ScrollReveal>
                <p className="text-sm font-semibold text-accent-a tracking-widest uppercase">{subtitle}</p>
                <h1 className="mt-2 text-4xl md:text-5xl font-serif font-bold text-text-main">{title}</h1>
            </ScrollReveal>
        </div>
    </div>
);

const About: React.FC = () => {
    const history = [
        { year: '1922', event: '富永建具店として創業。地域の住宅向け建具の製作を開始。' },
        { year: '1972', event: '法人化し、有限会社富永建具を設立。' },
        { year: '1999', event: 'U.G FURNITUREを設立し、オリジナル家具事業を開始。' },
        { year: '2014', event: '富永康弘が代表取締役会長に、富永祐司が代表取締役社長に就任。' },
        { year: '2019', event: 'ロゴを一新し、ブランドイメージ化を強化。' },
        { year: '2024', event: 'CNCルーターを導入し、製造の効率化を高める。' },
    ];

    return (
        <div className="bg-base">
            <PageHeader title="富永建具について" subtitle="Our Story" />
            
            <div className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <ScrollReveal>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <img src="https://images.unsplash.com/photo-1595675024-8b028e52198e?q=80&w=800&auto=format&fit=crop" alt="職人の手仕事" className="w-full h-auto object-cover rounded-sm" />
                            </div>
                            <div className="lg:pl-8">
                                <h2 className="text-3xl font-serif font-bold text-text-main">代表メッセージ</h2>
                                <p className="mt-6 text-text-sub leading-relaxed">
                                    創業以来、私たちは「木」という素材と向き合い、その可能性を追求してきました。
                                    一本一本異なる木目、手触り、香り。
                                    その個性を見極め、最大限に引き出すことで、お客様の暮らしに寄り添うものづくりができると考えています。
                                    基本となる図面は同じでも、仕上がりはつくり手によって変わります。
                                    <br/><br/>
                                    私たちが大切にしているのは、「お客様の思っていた以上のモノを作る」こと。
                                    そして同時に、「自分自身の思っていた以上のモノを作る」ことです。
                                    技術を磨き、感性を研ぎ澄まし、一枚の建具、一台の家具に心を込める。
                                    これからも、建具・家具づくりを通して空間に価値をもたらし続けてまいります。
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            <div className="bg-white py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <h2 className="text-3xl font-serif font-bold text-text-main text-center">沿革</h2>
                        <div className="mt-12 max-w-3xl mx-auto">
                            <ul className="space-y-6">
                                {history.map((item, index) => (
                                    <li key={index} className="flex flex-col sm:flex-row items-baseline border-b border-border pb-6">
                                        <p className="sm:w-1/4 font-bold text-accent-a text-lg">{item.year}</p>
                                        <p className="sm:w-3/4 text-text-sub mt-2 sm:mt-0">{item.event}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <ScrollReveal>
                    <h2 className="text-3xl font-serif font-bold text-text-main text-center">企業概要</h2>
                    <div className="mt-12 max-w-3xl mx-auto bg-white p-8 md:p-12 border border-border rounded-sm">
                        <dl className="space-y-6">
                            <div className="flex flex-col md:flex-row"><dt className="w-full md:w-1/4 font-semibold text-text-main">社名</dt><dd className="w-full md:w-3/4 text-text-sub mt-1 md:mt-0">有限会社富永建具</dd></div>
                            <div className="flex flex-col md:flex-row"><dt className="w-full md:w-1/4 font-semibold text-text-main">事業内容</dt><dd className="w-full md:w-3/4 text-text-sub mt-1 md:mt-0">木製建具・家具・什器の設計、製造、販売、施工</dd></div>
                            <div className="flex flex-col md:flex-row"><dt className="w-full md:w-1/4 font-semibold text-text-main">許認可</dt><dd className="w-full md:w-3/4 text-text-sub mt-1 md:mt-0">建設業許可 徳島県知事 (般-04) 第30069号</dd></div>
                            <div className="flex flex-col md:flex-row"><dt className="w-full md:w-1/4 font-semibold text-text-main">所在地</dt><dd className="w-full md:w-3/4 text-text-sub mt-1 md:mt-0">〒779-1102  徳島県阿南市羽ノ浦町宮倉芝生13-7</dd></div>
                        </dl>
                    </div>
                </ScrollReveal>
            </div>

            <div className="bg-white">
                <ScrollReveal>
                    <div className="h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211183.1539207018!2d134.3722515438475!3d34.02890479103788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x355365578768a529%3A0x25a66d623cdb579!2z5b6z5bO255yM5b6z5bO25biC!5e0!3m2!1sja!2sjp!4v1694765809123!5m2!1sja!2sjp"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map of Tokushima"
                        ></iframe>
                    </div>
                </ScrollReveal>
            </div>

        </div>
    );
};

export default About;