export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center bg-tw-red text-background w-full">
      <img
        src="/tw-hero-image.PNG"
        alt="Hero Image"
        className="w-full max-w-full"
      />
      <div className="flex flex-col items-center justify-center py-6 md:py-8 lg:py-12 px-[1rem] gap-2 md:gap-4 lg:gap-8 xl:gap-12">
        <h2 className="text-3xl md:text-5xl font-bold text-center max-w-[50rem]">
          <strong>Gear Up for the Ultimate Tailgating Experience</strong>
        </h2>
        <p className="md:text-lg text-center">
          Discover the best equipment, techniques, and strategies to take your
          performance to the next level.
        </p>
      </div>
    </section>
  );
}
