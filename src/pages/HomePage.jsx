import HeroSection from '../components/home/HeroSection';
import TrustBar from '../components/home/TrustBar';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HowItWorks from '../components/home/HowItWorks';
import WeaverSpotlight from '../components/home/WeaverSpotlight';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts />
      <HowItWorks />
      <WeaverSpotlight />
      <Newsletter />
    </>
  );
}
