import HeroSection from "./heroSection";
import GallerySection from "./gallerySection";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-w-screen min-h-screen">
      <HeroSection />
      <GallerySection />
    </main>
  );
}
