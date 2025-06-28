export default function GallerySection() {
  return (
    <section className="flex flex-col items-center justify-center bg-background text-foreground min-w-screen py-4 md:py-8 px-4 sm:px-8 md:px-12 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
      <h3 className="text-tw-grey text-center text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
        Reliving the FUN with THE Tailgate Warriors
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="aspect-square bg-tw-red text-background flex items-center justify-center text-xl font-bold"
          >
            Photo
          </div>
        ))}
      </div>
    </section>
  );
}
