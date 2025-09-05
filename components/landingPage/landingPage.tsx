import HeroSection from "./heroSection";
import GallerySection from "./gallerySection";
import ContactSection from "../utils/contactSection";
import { Photo } from "../photosPage/photosPage";

interface LandingPageProps {
  photos: Photo[];
}

export default function LandingPage({ photos }: LandingPageProps) {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen bg-background dark:bg-tw-grey">
      <HeroSection />
      <GallerySection photos={photos} />
      <ContactSection />
    </main>
  );
}
