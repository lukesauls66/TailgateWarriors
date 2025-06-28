import MessageForm from "./messageForm";
import InfoSection from "./infoSection";

export default function ContactSection() {
  return (
    <section className="flex flex-col items-center justify-center bg-background text-foreground w-full py-6 md:py-8 lg:py-12 px-4 sm:px-8 md:px-12 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
      <h3 className="text-xl md:text-3xl text-center text-semibold text-tw-grey max-w-[50rem]">
        CONTACT ME
      </h3>
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8">
        <MessageForm />
        <InfoSection />
      </div>
    </section>
  );
}
