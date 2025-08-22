export default function HopeKidsTab() {
  return (
    <section className="flex flex-col items-center w-full gap-2 md:gap-4 lg:gap-6 xl:gap-8 text-center max-w-5xl">
      <h2 className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
        HopeKids, Inc.
      </h2>
      <p className="md:text-lg lg:text-xl xl:text-2xl">
        The Pro Football's Ultimate Fan Association (PFUFA) is made up of big
        fans with even bigger hearts, and they&apos;re once again teaming up to
        make a difference!
      </p>
      <p className="md:text-lg lg:text-xl xl:text-2xl">
        For the 5th annual Tailgate Challenge, PFUFA superfans from the Kansas
        City Chiefs, Denver Broncos, Minnesota Vikings, Dallas Cowboys, Arizona
        Cardinals and Carolina Panthers are taking their passion beyond the
        stadium to support children with life-threatening medical conditions.
      </p>
      <p className="md:text-lg lg:text-xl xl:text-2xl">
        Their goal? To raise funds for HopeKids and provide a continuous
        calendar of events that gives families something to look forward to,
        especially during their hardest days.
      </p>
      <p className="md:text-lg lg:text-xl xl:text-2xl">
        <a
          href="https://give.hopekids.org/team/763266"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Donate
        </a>{" "}
        to help us achieve this goal.
      </p>
    </section>
  );
}
