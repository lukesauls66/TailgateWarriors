export default function LocateUsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-12 gap-4 md:gap-8 lg:gap-12">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
        Locate Us
      </h1>
      <div className="w-full max-w-6xl gap-4 md:gap-8 lg:gap-12 flex flex-col items-center">
        <img
          src="/locate-us.png"
          alt="Location in parking lot"
          className="w-full max-w-xl xl:max-w-2xl h-auto"
        />
        <p className="md:text-lg xl:text-xl text-center">
          While we welcome anyone to attend, you MUST have a parking pass to
          PARK in the parking lot. We are located in the Green East lot. Driving
          in off 91st Ave, our tailgate will be located along the only sidewalk
          on the east side of the stadium, going towards Entrance 3. The Yellow
          lot is close to the Green East however, barricades can make it
          difficult to walk over to our location.{" "}
          <strong>
            Your Game Day Ticket DOES NOT gain you entrance into any of the
            parking lots.
          </strong>{" "}
          <br /> <br /> *** Parking passes can be purchased on{" "}
          <a
            href="https://seatgeek.com/arizona-cardinals-tickets"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            SeatGeek
          </a>{" "}
          ***
        </p>
        <p className="md:text-lg xl:text-xl text-center">
          The gates open in the morning depending upon the time of year; Sept &
          Oct games 9:15ish (1:05p/1:25p Kick-Off), Nov - Jan 10:15ish (2:05p
          Kick-Off). It usually takes us 20-30 minutes to set up and start
          preparing food. The team will begin to tear down an hour and a half
          prior to kick-off, to allow the team to get dressed, and all fans to
          get into the game and Protect the Nest!{" "}
        </p>
      </div>
    </main>
  );
}
