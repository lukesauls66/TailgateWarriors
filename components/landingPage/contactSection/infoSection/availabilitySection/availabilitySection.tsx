import TimesSection from "./timesSection";

export default function AvailabilitySection() {
  return (
    <section className="flex flex-col items-center justify-center bg-background text-foreground w-full max-w-[1024px] gap-4">
      <h4 className="font-bold lg:text-xl w-full text-center lg:text-left">
        Hours
      </h4>
      <TimesSection />
    </section>
  );
}
