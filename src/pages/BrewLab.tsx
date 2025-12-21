import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, RotateCw, X, Repeat } from 'lucide-react';
import './BrewLab.css';

interface LexiconCard {
    id: string;
    title: string;
    emoji: string;
    description: string;
    color: string;
}

const lexiconData: LexiconCard[] = [
    {
        id: 'acidity',
        title: 'Acidity',
        emoji: '🍋',
        description: 'The liveliness and sharpness in coffee. High acidity often feels crisp and bright, like lemon or green apple.',
        color: '#FEF3C7'
    },
    {
        id: 'body',
        title: 'Body',
        emoji: '💧',
        description: 'The weight and texture of coffee on the palate. Can range from light/watery to heavy/creamy.',
        color: '#DBEAFE'
    },
    {
        id: 'sweetness',
        title: 'Sweetness',
        emoji: '🍯',
        description: 'The sugary characteristic found in well-balanced beans. Often evokes caramel, honey, or chocolate notes.',
        color: '#FFEDD5'
    },
    {
        id: 'bitterness',
        title: 'Bitterness',
        emoji: '🍫',
        description: 'A structural component that provides depth. Ideally balanced by sweetness and acidity.',
        color: '#F3E8FF'
    },
    {
        id: 'finish',
        title: 'Finish',
        emoji: '🏁',
        description: 'The lingering taste after swallowing. A clean finish disappears quickly, while a long finish persists.',
        color: '#F1F5F9'
    },
    {
        id: 'aroma',
        title: 'Aroma',
        emoji: '👃',
        description: 'The fragrance of the dry coffee grounds and the steam of the brewed drink.',
        color: '#ECFDF5'
    }
];

const flavorWheelSegments = [
    {
        name: 'Floral',
        color: '#E91E63',
        description: 'Delicate scents like jasmine, lavender, or rose.',
        subFlavors: [
            { category: 'Chamomile', items: ['Chamomile', 'Rose', 'Jasmine'] },
            { category: 'Black Tea', items: ['Earl Grey', 'Ceylon'] }
        ]
    },
    {
        name: 'Fruity',
        color: '#F44336',
        description: 'Berry, citrus, and stone fruit notes.',
        subFlavors: [
            { category: 'Berry', items: ['Blackberry', 'Raspberry', 'Blueberry', 'Strawberry'] },
            { category: 'Dried Fruit', items: ['Raisin', 'Prune'] },
            { category: 'Citrus Fruit', items: ['Grapefruit', 'Orange', 'Lemon', 'Lime'] }
        ]
    },
    {
        name: 'Fermented',
        color: '#9C27B0',
        description: 'Winey, boozy, or funky characteristics.',
        subFlavors: [
            { category: 'Alcohol', items: ['Winey', 'Whiskey', 'Fermented'] },
            { category: 'Overripe', items: ['Overripe Fruit', 'Vinegar'] }
        ]
    },
    {
        name: 'Green',
        color: '#4CAF50',
        description: 'Vegetal, grassy, or herbal notes.',
        subFlavors: [
            { category: 'Olive Oil', items: ['Fresh', 'Peathery'] },
            { category: 'Raw', items: ['Straw', 'Vegetative'] }
        ]
    },
    {
        name: 'Roasted',
        color: '#607D8B',
        description: 'Tobacco, burnt, or smoky elements.',
        subFlavors: [
            { category: 'Pipe Tobacco', items: ['Pipe Tobacco'] },
            { category: 'Burnt', items: ['Acrid', 'Ashy', 'Smoky'] },
            { category: 'Cereal', items: ['Grain', 'Malt'] }
        ]
    },
    {
        name: 'Spices',
        color: '#B71C1C',
        description: 'Pepper, clove, cinnamon, or anise.',
        subFlavors: [
            { category: 'Pungent', items: ['Pepper', 'Anise'] },
            { category: 'Brown Spice', items: ['Nutmeg', 'Cinnamon', 'Clove'] }
        ]
    },
    {
        name: 'Nutty',
        color: '#795548',
        description: 'Peanut, hazelnut, almond, or cocoa.',
        subFlavors: [
            { category: 'Nutty', items: ['Almond', 'Hazelnut', 'Peanut'] },
            { category: 'Cocoa', items: ['Chocolate', 'Dark Chocolate'] }
        ]
    },
    {
        name: 'Sweet',
        color: '#FF9800',
        description: 'Brown sugar, molasses, or caramel.',
        subFlavors: [
            { category: 'Brown Sugar', items: ['Molasses', 'Maple Syrup', 'Caramel', 'Honey'] },
            { category: 'Vanilla', items: ['Vanilla', 'Vanillin'] },
            { category: 'Sweet Aromatics', items: ['Overall Sweet'] }
        ]
    }
];

const LexiconCardItem = ({ card }: { card: LexiconCard }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="group relative h-64 w-full perspective-1000">
            <div
                className={`relative h-full w-full transition-all duration-500 transform-style-preserve-3d shadow-sm rounded-2xl ${isFlipped ? 'rotate-y-180' : 'md:group-hover:rotate-y-180'
                    }`}
            >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-white dark:bg-dark-surface p-6 rounded-2xl border-2 border-transparent group-hover:border-emerald-100/50">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(!isFlipped);
                        }}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-emerald-600 dark:text-gray-500 dark:hover:text-emerald-400 transition-colors md:hidden"
                        aria-label="Flip Card"
                    >
                        <Repeat className="w-5 h-5" />
                    </button>
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundColor: card.color }}
                    >
                        {card.emoji}
                    </div>
                    <h3 className="text-center font-serif text-coffee-dark dark:text-dark-text font-bold text-xl">
                        {card.title}
                    </h3>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#2C1810] text-white p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(!isFlipped);
                        }}
                        className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors md:hidden"
                        aria-label="Flip Back"
                    >
                        <Repeat className="w-5 h-5" />
                    </button>
                    <div className="w-12 h-1 mb-4 bg-emerald-500/30 rounded-full" />
                    <p className="text-sm font-medium leading-relaxed opacity-90">
                        {card.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FlavorDetailCard = ({ segment, onClose }: { segment: typeof flavorWheelSegments[0], onClose?: () => void }) => {
    return (
        <div className="bg-[#FDFBF7] dark:bg-dark-surface border border-[#e6dbbf] dark:border-dark-border rounded-[3rem] p-8 md:p-10 shadow-xl w-full h-full flex flex-col overflow-hidden relative">
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-dark-surface-elevated rounded-full text-gray-500 md:hidden hover:bg-gray-200 z-10"
                >
                    <X className="w-5 h-5" />
                </button>
            )}

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md text-2xl"
                    style={{ backgroundColor: segment.color }}
                >
                    <RotateCw className="w-8 h-8 opacity-80" />
                </div>
                <div>
                    <h3 className="text-3xl font-serif text-coffee-dark dark:text-dark-text font-bold">
                        {segment.name}
                    </h3>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Flavor Category</p>
                </div>
            </div>

            <p className="text-gray-600 dark:text-dark-text-secondary mb-8 text-lg leading-relaxed">
                {segment.description}
            </p>

            {/* Sub Flavors List */}
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                {segment.subFlavors.map((sub, idx) => (
                    <div
                        key={idx}
                        className="bg-[#FDFBF7]/50 dark:bg-dark-bg/30 border border-[#f5f0e1] dark:border-dark-border rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4 transition-all hover:border-emerald-200/50"
                    >
                        <span className="text-[#8c6639] dark:text-dark-accent font-serif font-bold text-lg min-w-[120px]">
                            {sub.category}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {sub.items.map((item) => (
                                <span
                                    key={item}
                                    className="bg-white dark:bg-dark-surface border border-[#f5f0e1] dark:border-dark-border rounded-lg px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#8c6639] dark:text-dark-text-muted shadow-sm hover:scale-105 transition-transform cursor-default"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function BrewLab() {
    // Rotation state
    const [rotation, setRotation] = useState(0);
    const [selectedSegment, setSelectedSegment] = useState(0);
    const [showMobileDetail, setShowMobileDetail] = useState(false);

    const rotateWheel = (index: number) => {
        const anglePerSegment = 360 / flavorWheelSegments.length;
        const centerAngle = index * anglePerSegment + anglePerSegment / 2;
        // Rotate so the segment connects with the arrow at the right (0 degrees)
        // Visual segment 0 starts at -90 deg, so we need to compensate.
        setRotation(90 - centerAngle);
        setShowMobileDetail(true);
        // We do not set selectedSegment here immediately; onUpdate handler drives it
    };

    const handleRotationUpdate = (latest: any) => {
        const currentRotation = typeof latest.rotate === 'number' ? latest.rotate : parseFloat(latest.rotate);
        if (isNaN(currentRotation)) return;

        const anglePerSegment = 360 / flavorWheelSegments.length;
        // Normalize rotation to positive equivalent in [0, 360)
        // The pointer is at 0. The physics angle under pointer is -rotation.
        const normalizedRotation = ((-currentRotation % 360) + 360) % 360;

        // Offset by 90 degrees because visual rendering starts at -90 (12 o'clock)
        const adjustedRotation = (normalizedRotation + 90) % 360;

        // Calculate index based on the adjusted rotation
        const index = Math.floor(adjustedRotation / anglePerSegment);

        // Ensure index is within bounds [0, max-1]
        const validIndex = Math.min(Math.max(index, 0), flavorWheelSegments.length - 1);

        setSelectedSegment(validIndex);
    };

    return (
        <div className="brew-lab-page min-h-screen pt-24 pb-16 px-4 md:px-8 bg-[#F9F7F2] dark:bg-dark-bg transition-colors duration-300">
            <section className="max-w-7xl mx-auto text-center mb-16 px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-serif text-coffee-dark dark:text-dark-text mb-6"
                >
                    Brew Lab
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto"
                >
                    Speak the language of coffee. A visual dictionary and interactive compass for your sensory journey.
                </motion.p>
            </section>

            <section className="max-w-7xl mx-auto mb-24 px-4">
                <div className="flex items-center gap-3 mb-12">
                    <Info className="w-6 h-6 text-emerald-600" />
                    <h2 className="text-2xl md:text-3xl font-serif text-coffee-dark dark:text-dark-text">Sensory Lexicon</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {lexiconData.map((card) => (
                        <LexiconCardItem key={card.id} card={card} />
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto mb-16 px-4">
                <div className="flex items-center gap-3 mb-12">
                    <RotateCw className="w-6 h-6 text-emerald-600" />
                    <h2 className="text-2xl md:text-3xl font-serif text-coffee-dark dark:text-dark-text">Calibrate Your Palate</h2>
                </div>

                <div className="bg-[#EDEBE6] dark:bg-dark-surface-elevated rounded-3xl p-6 md:p-12 relative">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-square max-w-[450px] mx-auto w-full">
                            <svg viewBox="-5 -5 110 110" className="w-full h-full drop-shadow-2xl">
                                {/* Main rotating group */}
                                <motion.g
                                    animate={{ rotate: rotation }}
                                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                                    style={{ transformOrigin: '50px 50px' }}
                                    onUpdate={handleRotationUpdate}
                                >
                                    {flavorWheelSegments.map((segment, i) => {
                                        const totalSegments = flavorWheelSegments.length;
                                        const angle = 360 / totalSegments;
                                        const startAngle = i * angle;
                                        const largeArcFlag = angle > 180 ? 1 : 0;
                                        const r = 50;
                                        const cx = 50;
                                        const cy = 50;
                                        const startRad = (startAngle - 90) * (Math.PI / 180);
                                        const endRad = (startAngle + angle - 90) * (Math.PI / 180);
                                        const x1 = cx + r * Math.cos(startRad);
                                        const y1 = cy + r * Math.sin(startRad);
                                        const x2 = cx + r * Math.cos(endRad);
                                        const y2 = cy + r * Math.sin(endRad);
                                        const textRadius = r * 0.72;
                                        const midAngle = startAngle + angle / 2;
                                        const midRad = (midAngle - 90) * (Math.PI / 180);
                                        const tx = cx + textRadius * Math.cos(midRad);
                                        const ty = cy + textRadius * Math.sin(midRad);

                                        return (
                                            <g key={segment.name} onClick={() => rotateWheel(i)} className="cursor-pointer group">
                                                <path
                                                    d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                                    fill={segment.color}
                                                    className={`transition-all duration-300 ${selectedSegment === i ? 'opacity-100 brightness-110' : 'opacity-90 hover:opacity-100 hover:brightness-105'}`}
                                                    stroke="white"
                                                    strokeWidth="0.5"
                                                />
                                                <text
                                                    x={tx}
                                                    y={ty}
                                                    fill="white"
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    className="text-[3px] font-bold uppercase tracking-widest pointer-events-none font-sans drop-shadow-sm select-none"
                                                    transform={`rotate(${midAngle}, ${tx}, ${ty})`}
                                                >
                                                    {segment.name}
                                                </text>
                                            </g>
                                        );
                                    })}
                                    {/* Inner circle decor */}
                                    <circle cx="50" cy="50" r="12" fill="white" className="dark:fill-dark-surface shadow-sm" />
                                    <circle cx="50" cy="50" r="4" fill="#2c1810" className="dark:fill-dark-text" />
                                </motion.g>
                            </svg>

                            {/* Active Indicator Arrow */}
                            <div
                                className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1.5 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-coffee-dark dark:border-r-dark-accent z-10 drop-shadow-md"
                            />
                        </div>

                        {/* Desktop Detail View (Hidden on Mobile) */}
                        <div className="hidden md:flex h-full flex-col">
                            <motion.div
                                className="h-full"
                            >
                                <FlavorDetailCard segment={flavorWheelSegments[selectedSegment]} />
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Mobile Detail Overlay (Fixed Bottom Sheet) */}
                <AnimatePresence>
                    {showMobileDetail && (
                        <div
                            className="fixed inset-0 z-50 md:hidden flex flex-col justify-end pointer-events-none"
                        >
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowMobileDetail(false)}
                                className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
                            />

                            {/* Card Sheet */}
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="w-full max-h-[85vh] relative pointer-events-auto"
                            >
                                <FlavorDetailCard
                                    segment={flavorWheelSegments[selectedSegment]}
                                    onClose={() => setShowMobileDetail(false)}
                                />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </section>

            <section className="max-w-7xl mx-auto px-4 text-center mt-24">
                <h2 className="text-2xl font-serif text-gray-400 dark:text-dark-text-muted mb-4 opacity-50">More Coming Soon</h2>
                <div className="w-12 h-1 bg-gray-200 dark:bg-dark-border mx-auto rounded-full opacity-50" />
            </section>
        </div>
    );
}
