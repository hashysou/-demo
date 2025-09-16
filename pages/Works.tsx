import React, { useState, useMemo } from 'react';
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

const Works: React.FC = () => {
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
        <div className="bg-base min-h-screen">
            <PageHeader title="事例紹介" subtitle="Our Works" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

export default Works;