export default function AvailabilitySection() {
  return (
    <section className="flex flex-col items-center justify-center bg-background text-foreground w-full max-w-[1024px] gap-4">
      <h4 className="font-bold lg:text-xl w-full text-center lg:text-left">
        Hours
      </h4>
      <p className="text-center lg:text-left lg:text-lg text-tw-grey">
        I am available for training sessions Monday through Friday from 9 AM to
        5 PM. Please reach out to schedule an appointment.
      </p>
    </section>
  );
}
