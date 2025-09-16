import React from 'react';

const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <p className="text-sm font-semibold text-accent-a tracking-widest uppercase">{subtitle}</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-serif font-bold text-text-main">{title}</h1>
        </div>
    </div>
);

const About: React.FC = () => {
    const history = [
        { year: '1960', event: '富永建具店として創業。地域の住宅向け建具の製作を開始。' },
        { year: '1985', event: '法人化し、有限会社富永建具となる。設備投資を行い、生産能力を拡大。' },
        { year: '2005', event: '商業施設向けの特注什器製作を開始。B2B事業を本格化。' },
        { year: '2020', event: '設計部門を新設。デザイン提案から一貫して請け負う体制を構築。' },
        { year: '2025', event: 'WEBサイトを全面リニューアル。B2C向けオーダーメイドサービスを強化。' },
    ];

    return (
        <div className="bg-base">
            <PageHeader title="富永建具について" subtitle="Our Story" />
            
            <div className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                             <img src="https://images.unsplash.com/photo-1595675024-8b028e52198e?q=80&w=800&auto=format&fit=crop" alt="職人の手仕事" className="w-full h-auto object-cover rounded-sm" />
                        </div>
                        <div className="lg:pl-8">
                            <h2 className="text-3xl font-serif font-bold text-text-main">代表メッセージ</h2>
                            <p className="mt-6 text-text-sub leading-relaxed">
                                創業から半世紀以上、私たちは一貫して「木」という素材と向き合い、その可能性を追求してきました。一本一本異なる木目、手触り、香り。その個性を最大限に引き出し、お客様の暮らしに寄り添うものづくりをすることが、私たちの喜びです。<br/><br/>
                                時代が変わり、求められるデザインや機能は変化しても、私たちの根底にある「質の高い手仕事」へのこだわりは変わりません。これからも、技術を磨き、感性を研ぎ澄ませ、一枚の建具、一台の家具に心を込めて、お客様の想いを形にし続けてまいります。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <h2 className="text-3xl font-serif font-bold text-text-main text-center">企業概要</h2>
                <div className="mt-12 max-w-3xl mx-auto bg-white p-8 md:p-12 border border-border rounded-sm">
                    <dl className="space-y-6">
                        <div className="flex flex-col md:flex-row"><dt className="w-full md:w-1/4 font-semibold text-text-main">社名</dt><dd className="w-full md:w-3/4 text-text-sub mt-1 md:mt-0">有限会社富永建具</dd></div>
                        <div className="flex flex-col md:flex-row"><dt className="w-full md:w-1/4 font-semibold text-text-main">事業内容</dt><dd className="w-full md:w-3/4 text-text-sub mt-1 md:mt-0">木製建具・家具・什器の設計、製造、販売、施工</dd></div>
                        <div className="flex flex-col md:flex-row"><dt className="w-full md:w-1/4 font-semibold text-text-main">許認可</dt><dd className="w-full md:w-3/4 text-text-sub mt-1 md:mt-0">建設業許可 徳島県知事 (般-XX) 第XXXXX号</dd></div>
                        <div className="flex flex-col md:flex-row"><dt className="w-full md:w-1/4 font-semibold text-text-main">所在地</dt><dd className="w-full md:w-3/4 text-text-sub mt-1 md:mt-0">〒XXX-XXXX 徳島県徳島市...</dd></div>
                    </dl>
                </div>
            </div>

            <div className="bg-white">
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
            </div>

        </div>
    );
};

export default About;