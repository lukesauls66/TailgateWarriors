import HeroSection from "./heroSection";
import GallerySection from "./gallerySection";
import ContactSection from "./contactSection";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen">
      <HeroSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
