import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { worksData } from '../data/worksData';
import { Work } from '../types';

const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <p className="text-sm font-semibold text-accent-a tracking-widest uppercase">{subtitle}</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-serif font-bold text-text-main">{title}</h1>
        </div>
    </div>
);

const ServiceSection: React.FC<{
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    flow: { title: string, desc: string }[];
    ctaLink: string;
    ctaState: object;
    imageLeft?: boolean;
}> = ({ title, subtitle, description, imageUrl, flow, ctaLink, ctaState, imageLeft = false }) => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>
            <div className={` ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                <img src={imageUrl} alt={title} className="w-full h-auto object-cover rounded-sm" />
            </div>
            <div className={`${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                <p className="font-semibold text-accent-a">{subtitle}</p>
                <h2 className="mt-2 text-3xl font-serif font-bold text-text-main">{title}</h2>
                <p className="mt-6 text-text-sub leading-relaxed">{description}</p>
                
                <div className="mt-10">
                    <h3 className="text-xl font-semibold text-text-main mb-6">製作の流れ</h3>
                    <ol className="space-y-6">
                        {flow.map((step, index) => (
                            <li key={index} className="flex">
                                <span className="flex items-center justify-center w-8 h-8 font-bold bg-accent-a text-white rounded-full mr-4 flex-shrink-0">
                                    {index + 1}
                                </span>
                                <div>
                                    <h4 className="font-semibold text-text-main">{step.title}</h4>
                                    <p className="mt-1 text-sm text-text-sub">{step.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="mt-10">
                    <Link to={ctaLink} state={ctaState} className="inline-block bg-accent-a text-white font-medium py-3 px-8 rounded-sm hover:bg-opacity-90 transition-all duration-300">
                        このサービスについて問い合わせる
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

const WorkCard: React.FC<{ work: Work }> = ({ work }) => (
    <div className="group block text-left">
        <div className="relative overflow-hidden bg-border rounded-sm">
            <div className="pt-[75%]"></div> {/* 4:3 Aspect Ratio */}
            <img src={work.imageUrl} alt={work.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="mt-4">
            <h4 className="font-semibold text-text-main text-lg group-hover:text-accent-a transition-colors">{work.title}</h4>
            <p className="mt-1 text-sm text-text-sub">{work.category} / {work.region}</p>
        </div>
    </div>
);

const FilterButton: React.FC<{ label: string; value: string; activeValue: string; onClick: (value: string) => void }> = ({ label, value, activeValue, onClick }) => (
     <button
        onClick={() => onClick(value)}
        className={`px-3 py-1 text-sm font-medium transition-colors duration-200 relative ${
            activeValue === value ? 'text-text-main' : 'text-text-sub hover:text-text-main'
        } after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-accent-a after:transition-all after:duration-300 ${
            activeValue === value ? 'after:w-full' : 'after:w-0'
        } hover:after:w-full`}
    >
        {label}
    </button>
);


const Services: React.FC = () => {
    const b2bFlow = [
        { title: 'ご相談・図面レビュー', desc: '設計図を基に、意匠・機能・コストを考慮した製作方法をご提案します。' },
        { title: '試作・モックアップ製作', desc: '必要に応じて試作品を製作し、質感や納まりを実物でご確認いただきます。' },
        { title: '量産・本製作', desc: '承認後、自社工場の徹底した品質管理のもと、本製作に入ります。' },
        { title: '現場調整・納品', desc: '現場での施工や調整まで、責任を持って対応いたします。' },
    ];

    const b2cFlow = [
        { title: 'ご相談・ヒアリング', desc: 'お客様の理想のイメージ、ライフスタイル、ご予算などを詳しくお伺いします。' },
        { title: '現地調査・採寸', desc: '専門スタッフがご自宅へお伺いし、設置場所の正確な寸法を計測します。' },
        { title: '設計・お見積り', desc: 'ヒアリング内容と採寸結果を基に、最適なデザインと素材をご提案し、お見積りを作成します。' },
        { title: '製作・納品', desc: 'ご契約後、職人が一つひとつ丁寧に製作。完成後、ご指定の場所へ設置に伺います。' },
    ];

    const [filters, setFilters] = useState({
        category: 'すべて',
        clientType: 'すべて',
    });

    const handleFilterChange = (key: 'category' | 'clientType', value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const categories = ['すべて', ...Array.from(new Set(worksData.map(w => w.category)))];
    const clientTypes = ['すべて', 'B2B', 'B2C'];

    const filteredWorks = useMemo(() => {
        return worksData.filter(work => {
            const categoryMatch = filters.category === 'すべて' || work.category === filters.category;
            const clientTypeMatch = filters.clientType === 'すべて' || work.clientType === filters.clientType;
            return categoryMatch && clientTypeMatch;
        });
    }, [filters]);


    return (
        <div className="bg-base">
            <PageHeader title="事業・事例紹介" subtitle="Our Services & Works" />
            
            <div className="bg-white">
                <ServiceSection
                    subtitle="法人のお客様へ"
                    title="B2B: 施工・共同開発・量産"
                    description="設計事務所や工務店のパートナーとして、商業施設、オフィス、ホテルなどの空間づくりをサポートします。図面一枚から、複雑な要求に応える試作、安定した品質での量産まで、あらゆるニーズにお応えします。"
                    imageUrl="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop"
                    flow={b2bFlow}
                    ctaLink="/contact"
                    ctaState={{ type: 'B2B' }}
                    imageLeft={true}
                />
            </div>

            <ServiceSection
                subtitle="個人のお客様へ"
                title="B2C: オーダーメイド製作"
                description="「ここに、こんな家具があったら」「このドアを、もっと素敵なデザインに」。そんなお客様一人ひとりの想いを形にするのが、私たちのオーダーメイドサービスです。ドア一枚から造作家具まで、暮らしに寄り添う一品を製作します。"
                imageUrl="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop"
                flow={b2cFlow}
                ctaLink="/contact"
                ctaState={{ type: 'B2C' }}
            />

            <div id="works-gallery" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif font-bold text-text-main">事例紹介</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-text-sub">私たちの仕事の一部をご紹介します。デザインから納品までのストーリーをご覧ください。</p>
                </div>

                <div className="sticky top-16 bg-base/90 backdrop-blur-sm z-10 py-4 mb-8 border-b border-border">
                    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-8 gap-y-4">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold mr-2">カテゴリ:</span>
                            {categories.map(cat => (
                                <FilterButton key={cat} label={cat} value={cat} activeValue={filters.category} onClick={(v) => handleFilterChange('category', v)} />
                            ))}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold mr-2">顧客区分:</span>
                             {clientTypes.map(type => (
                                <FilterButton key={type} label={type} value={type} activeValue={filters.clientType} onClick={(v) => handleFilterChange('clientType', v)} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {filteredWorks.length > 0 ? (
                        filteredWorks.map(work => <WorkCard key={work.id} work={work} />)
                    ) : (
                        <p className="col-span-full text-center text-text-sub py-12">該当する事例が見つかりませんでした。</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Services;