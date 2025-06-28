export default function NumberSection() {
  return (
    <section className="flex flex-col items-center justify-center bg-background text-foreground w-full max-w-[1024px] gap-4">
      <h4 className="font-bold lg:text-xl w-full text-center">
        Contact Number
      </h4>
      <a
        href="tel:+16024328331"
        className="w-full text-center lg:text-lg text-tw-red hover:text-tw-dark-red hover:cursor-pointer"
      >
        602-432-8331
      </a>
    </section>
  );
}
