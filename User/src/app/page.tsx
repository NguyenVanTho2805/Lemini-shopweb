import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import TrustBar from '@/components/sections/TrustBar';
import CategoriesSection from '@/components/sections/CategoriesSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import GiftBanner from '@/components/sections/GiftBanner';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <TrustBar />
        <CategoriesSection />
        <FeaturedProducts />
        <GiftBanner />
      </main>
      <Footer />
    </>
  );
}
