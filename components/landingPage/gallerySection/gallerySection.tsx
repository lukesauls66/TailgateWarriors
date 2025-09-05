import { Photo } from "@/components/photosPage/photosPage";

interface GallerySectionProps {
  photos: Photo[];
}

export default function GallerySection({ photos }: GallerySectionProps) {
  const recentPhotos = photos.slice(0, 6);

  return (
    <section className="flex flex-col items-center justify-center bg-background text-foreground dark:text-white w-full py-4 md:py-8 px-4 sm:px-8 md:px-12 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
      <h3 className="text-center text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
        Reliving the FUN with THE Tailgate Warriors
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        {recentPhotos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square bg-tw-red text-foreground flex items-center justify-center text-xl font-bold"
          >
            <img
              src={photo.url}
              alt={photo.category}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
