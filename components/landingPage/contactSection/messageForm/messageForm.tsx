export default function MessageForm() {
  return (
    <section className="flex flex-col items-center justify-center bg-background text-foreground w-full max-w-[1024px] gap-4">
      <h4 className="font-bold text-lg">Send Message</h4>
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
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-tw-red hover:bg-tw-dark-red hover:cursor-pointer text-background font-semibold p-4 border-b-tw-dark-red border-b-4"
        >
          SEND
        </button>
      </form>
    </section>
  );
}
