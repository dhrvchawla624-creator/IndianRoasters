import { useState, useEffect, useMemo } from 'react';
import type { CoffeeBean } from '../types/coffee.js';
import { useFavorites } from '../contexts/FavoritesContext.js';
import PageHero from '../components/PageHero.js';
import CoffeeCard from '../components/CoffeeCard.js';

// Helper to get start of week (Monday) for a given date
function getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(d.setDate(diff));
}

// Helper to get end of week (Sunday) for a given date
function getWeekEnd(date: Date): Date {
    const weekStart = getWeekStart(date);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return weekEnd;
}

// Format date range for display
function formatWeekRange(start: Date, end: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
}

// Check if a date is within the current week
function isInCurrentWeek(dateString: string | undefined): boolean {
    if (!dateString) return false;

    const date = new Date(dateString);
    const now = new Date();
    const weekStart = getWeekStart(now);
    const weekEnd = getWeekEnd(now);

    // Set times to start/end of day for accurate comparison
    weekStart.setHours(0, 0, 0, 0);
    weekEnd.setHours(23, 59, 59, 999);

    return date >= weekStart && date <= weekEnd;
}

function WeeklyDrops() {
    const { favorites, toggleFavorite } = useFavorites();

    const [beans, setBeans] = useState<CoffeeBean[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCoffee();
    }, []);

    const fetchCoffee = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/coffee', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.data || !Array.isArray(result.data)) {
                throw new Error('Invalid data format received from API');
            }

            setBeans(result.data);
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load coffee data';
            setError(errorMessage);
            console.error('Error fetching coffee:', err);
        } finally {
            setLoading(false);
        }
    };

    // Filter beans for current week
    const weeklyBeans = useMemo(() => {
        return beans.filter(bean => isInCurrentWeek(bean.fetchDate));
    }, [beans]);

    // Get current week range for display
    const weekRange = useMemo(() => {
        const now = new Date();
        const start = getWeekStart(now);
        const end = getWeekEnd(now);
        return formatWeekRange(start, end);
    }, []);

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-5">
                <div className="text-8xl mb-5 animate-shake">☕</div>
                <h2 className="text-4xl text-coffee-dark dark:text-dark-text mb-2.5">Oops! Something went wrong</h2>
                <p className="text-lg text-coffee-light dark:text-dark-text-secondary mb-8">{error}</p>
                <button
                    onClick={fetchCoffee}
                    className="flex items-center gap-2.5 px-8 py-3.5 bg-coffee-medium dark:bg-dark-accent text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 shadow-md hover:bg-coffee-brown dark:hover:bg-dark-accent/80 hover:-translate-y-0.5 hover:shadow-lg"
                >
                    <span>🔄</span> Try Again
                </button>
            </div>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-5">
                <div className="text-8xl mb-5 animate-bounce-custom">☕</div>
                <h2 className="text-2xl text-coffee-dark dark:text-dark-text">Loading coffee beans...</h2>
            </div>
        );
    }

    return (
        <>
            <PageHero
                title="Weekly Drops"
                subtitle={`Freshly listed beans for the week of ${weekRange}`}
                icon="🆕"
            />

            <div className="max-w-7xl mx-auto px-5 py-12">
                {weeklyBeans.length === 0 ? (
                    // Nothing new this week
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        <div className="text-8xl mb-6">😴</div>
                        <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark dark:text-dark-text mb-4">
                            Nothing new this week
                        </h2>
                        <p className="text-lg text-coffee-light dark:text-dark-text-secondary max-w-md">
                            No new coffee beans were added during the week of {weekRange}. Check back next week for fresh drops!
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Count display */}
                        <div className="mb-8 text-center">
                            <p className="text-lg text-coffee-medium dark:text-dark-text-secondary">
                                <span className="font-bold text-coffee-dark dark:text-dark-text">{weeklyBeans.length}</span> new bean{weeklyBeans.length !== 1 ? 's' : ''} this week
                            </p>
                        </div>

                        {/* Grid of coffee cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
                            {weeklyBeans.map((bean) => (
                                <CoffeeCard
                                    key={bean.id}
                                    bean={bean}
                                    isFavorite={favorites.includes(bean.id)}
                                    onToggleFavorite={toggleFavorite}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default WeeklyDrops;
