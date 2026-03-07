import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    url?: string;
    image?: string;
}

export default function SEO({
    title,
    description = "Discover India's finest specialty coffee roasters - Browse 900+ beans from 58+ top Indian coffee roasters",
    keywords = "indian coffee, specialty coffee india, buy coffee online india, best coffee roasters india, pour over coffee india, espresso beans india, artisanal coffee india",
    url = "https://indian-roasters.vercel.app",
    image = "/favicon.svg"
}: SEOProps) {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />

            {/* Canonical Link */}
            <link rel="canonical" href={url} />

            {/* Open Graph tags for Facebook, LinkedIn, etc. */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={image} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}
