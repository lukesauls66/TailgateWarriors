import prisma from "../lib/prismadb";

async function main() {
  // await prisma.user.create({
  //   data: {
  //     email: "luke.sauls279@gmail.com",
  //     name: "Luke Sauls",
  //     role: "Developer",
  //   },
  // });

  await prisma.game.createMany({
    data: [
      {
        date: new Date("2025-07-20T20:00:00Z"),
        location: "Home",
        opponentId: "6862ec5f5d61f8ec387dc289",
      },
      {
        date: new Date("2025-07-25T20:00:00Z"),
        location: "Away",
        opponentId: "6862ec5f5d61f8ec387dc28d",
      },
      {
        date: new Date("2025-07-30T20:00:00Z"),
        location: "Home",
        opponentId: "6862ec5f5d61f8ec387dc295",
      },
    ],
  });

  // await prisma.fAQ.createMany({
  //   data: [
  //     {
  //       question: "Is there a place for us to park near your tailgate?",
  //       answer:
  //         "We are located in the Green East Carpark.  However, you can walk to our tailgate from anywhere in the stadium lot.",
  //     },
  //     {
  //       question: "What time do you start tailgating?",
  //       answer:
  //         "The stadium parking lot gates open in the morning depending upon the time of year: Sept. & Oct. games, 9:15ish (1:05p/1:25p Kick-Off); Nov.-Jan., 10:15ish (2:05p/2:25p Kick-Off). It will typically take the team 20-30 minutes to set up and start preparing food. The team will begin to tear down an hour and a half prior to kick-off to allow the team to get dressed and fans to get into the game and protect the Nest!",
  //     },
  //     {
  //       question: "Do you provide food for everyone?",
  //       answer:
  //         "The Tailgate Warriors tailgate will provide limited food (themed dishes), snacks, desserts, and water. Our amazing Bird Box Bar will tantalize your taste buds with liquid deliciousness, themed for the visiting team, and our signature Red Sea Shot. Music will be provided to bring the sounds of Sunday afternoon. As a general rule, we say, Stop by and grab a bite to eat. Our group is a collective of great fans and is not a money-making group. That said, any donations received on-site or online are donated directly to our favorite local non-profit, HopeKids Inc.",
  //     },
  //     {
  //       question: "What about beer, wine, and spirits?",
  //       answer:
  //         "We do provide a shot of the game, a visitor team drink of the game, and have water and gatorade on hand in the warmer months.  Remember to drink responsibly and have a designated driver if needed!",
  //     },
  //     {
  //       question: "Can we bring the kids?",
  //       answer:
  //         "Absolutely, we are all family people. However, just a few notes. Our DJ plays family-friendly music.  There are adults drinking around the lot, so if that offends you, stay away.  Also, keep in mind that there are a lot of very hot grills being utilized during the tailgate party.  So keep on eye on the young ones.",
  //     },
  //     {
  //       question:
  //         "If I bring my own food, can you cook it for me or provide some grill space so I can cook it?",
  //       answer:
  //         "We plan out what we are going to cook well before a game and bring only what we need to each game.  If you just walk up and ask us to cook some burgers, do not be surprised if the answer is no, as we plan our breakdown with enough time for our equipment to cool down before loaing into the Van.",
  //     },
  //     {
  //       question: "What should I bring?",
  //       answer:
  //         "The only things to bring to attend our tailgates are passion for your team, respect for all fans, and the desire to meet great people from around the world and league. The Tailgate Warriors are in an annual national tailgate charity challenge, supporting the children and families of Hope Kids, Inc. If you'd like to assist us in reaching our goal this season, you can go online and donate directly on our Hope Kids Tailgate Warriors page. A QR code for donations can be found on the Hope Kids, Inc. page of our site.",
  //     },
  //   ],
  // });

  return "Seed completed successfully!";
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
