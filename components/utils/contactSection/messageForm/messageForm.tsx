import SubmitButton from "@/components/utils/buttons/submitButton";

export default function MessageForm() {
  return (
    <section className="flex flex-col items-center justify-center bg-background text-foreground w-full lg:w-1/2 max-w-[1024px] gap-4">
      <h4 className="font-bold lg:text-xl">Send Message</h4>
      <form action="" className="flex flex-col gap-6 w-full">
        <div className="w-full">
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="w-full border border-tw-grey p-3 focus:outline-none focus:ring-1 focus:ring-tw-grey focus:shadow-lg"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="w-full border border-tw-grey p-3 focus:outline-none focus:ring-1 focus:ring-tw-grey focus:shadow-lg"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            className="w-full border border-tw-grey p-3 focus:outline-none focus:ring-1 focus:ring-tw-grey focus:shadow-lg"
            rows={8}
            required
          ></textarea>
        </div>
        <p className="text-center text-tw-dark-red text-lg">
          Attachments Coming Soon
        </p>
        <SubmitButton type="submit" name="SEND" />
      </form>
    </section>
  );
}
