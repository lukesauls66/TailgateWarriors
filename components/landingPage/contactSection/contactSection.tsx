import MessageForm from "./messageForm";

export default function ContactSection() {
  return (
    <section className="flex flex-col items-center justify-center bg-background text-foreground min-w-screen py-6 md:py-8 lg:py-12 px-[1rem] gap-4 md:gap-6 lg:gap-8 xl:gap-10">
      <h3 className="text-xl md:text-3xl text-center text-tw-grey max-w-[50rem]">
        <strong>CONTACT ME</strong>
      </h3>
      <div className="flex flex-col lg:flex-row w-full max-w-6xl">
        <MessageForm />
      </div>
    </section>
  );
}
