export default function MessageForm() {
  return (
    <section className="flex flex-col items-center justify-center bg-background text-foreground w-full max-w-md p-6">
      <h4>Send Message</h4>
      <form action="">
        <div>
          <label htmlFor="name" className="hidden">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="hidden">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="hidden">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            rows={4}
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
