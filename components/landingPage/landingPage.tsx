import HeroSection from "./heroSection";
import GallerySection from "./gallerySection";
import ContactSection from "../utils/contactSection";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen bg-background dark:bg-tw-grey">
      <HeroSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
