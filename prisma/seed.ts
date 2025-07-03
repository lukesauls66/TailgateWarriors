import prisma from "../lib/prismadb";

async function main() {
  await prisma.user.create({
    data: {
      email: "luke.sauls279@gmail.com",
      name: "Luke Sauls",
      hashPassword:
        "$2b$10$ViJR46VZRgX84vV.iTK6fO8O4xF35VGYXbH2ytB/BeoOgUFoT3Psu",
    },
  });

  await prisma.team.createMany({
    data: [
      {
        name: "Bills",
        city: "Buffalo",
        logo: "https://i.ibb.co/VpzM9HP2/bills-logo.webp",
      },
      {
        name: "Dolphins",
        city: "Miami",
        logo: "https://i.ibb.co/rGsv8YFT/dolphins-logo.png",
      },
      {
        name: "Patriots",
        city: "New England",
        logo: "https://i.ibb.co/6cMr63xr/patriots-logo.png",
      },
      {
        name: "Jets",
        city: "New York",
        logo: "https://i.ibb.co/7xdGm9Xj/jets-logo.png",
      },
      {
        name: "Ravens",
        city: "Baltimore",
        logo: "https://i.ibb.co/btpy09T/ravens-logo.jpg",
      },
      {
        name: "Bengals",
        city: "Cincinnati",
        logo: "https://i.ibb.co/sJgDnsVs/bengals-logo.png",
      },
      {
        name: "Browns",
        city: "Cleveland",
        logo: "https://i.ibb.co/KJwGxts/browns-logo.jpg",
      },
      {
        name: "Steelers",
        city: "Pittsburgh",
        logo: "https://i.ibb.co/Xgx92Fp/steelers-logo.png",
      },
      {
        name: "Texans",
        city: "Houston",
        logo: "https://i.ibb.co/MYJMBv1/texans-logo.jpg",
      },
      {
        name: "Colts",
        city: "Indianapolis",
        logo: "https://i.ibb.co/YFzpmDpB/colts-logo.jpg",
      },
      {
        name: "Jaguars",
        city: "Jacksonville",
        logo: "https://i.ibb.co/604Bz8k8/jaguars-logo.jpg",
      },
      {
        name: "Titans",
        city: "Tennessee",
        logo: "https://i.ibb.co/21Z1FLV5/titans-logo.jpg",
      },
      {
        name: "Broncos",
        city: "Denver",
        logo: "https://i.ibb.co/GvQtqn1j/broncos-logo.png",
      },
      {
        name: "Chiefs",
        city: "Kansas City",
        logo: "https://i.ibb.co/N2QVk8qz/chiefs-logo.png",
      },
      {
        name: "Raiders",
        city: "Las Vegas",
        logo: "https://i.ibb.co/DP9P2GwL/raiders-logo.jpg",
      },
      {
        name: "Chargers",
        city: "Los Angeles",
        logo: "https://i.ibb.co/xtw7Xvs6/chargers-logo.jpg",
      },
      {
        name: "Cowboys",
        city: "Dallas",
        logo: "https://i.ibb.co/HT4ZbYsv/cowboys-logo.jpg",
      },
      {
        name: "Giants",
        city: "New York",
        logo: "https://i.ibb.co/Pz4FcQ25/giants-logo.png",
      },
      {
        name: "Eagles",
        city: "Philadelphia",
        logo: "https://i.ibb.co/sTLfW3R/eagles-logo.jpg",
      },
      {
        name: "Commanders",
        city: "Washington",
        logo: "https://i.ibb.co/mrTQjx0g/commanders-logo.jpg",
      },
      {
        name: "Bears",
        city: "Chicago",
        logo: "https://i.ibb.co/Rpc6ZNGg/bears-logo.jpg",
      },
      {
        name: "Lions",
        city: "Detroit",
        logo: "https://i.ibb.co/kgZ8M2Bd/lions-logo.jpg",
      },
      {
        name: "Packers",
        city: "Green Bay",
        logo: "https://i.ibb.co/KxLWC829/packers-logo.jpg",
      },
      {
        name: "Vikings",
        city: "Minnesota",
        logo: "https://i.ibb.co/fVbd54TC/vikings-logo.png",
      },
      {
        name: "Falcons",
        city: "Atlanta",
        logo: "https://i.ibb.co/ds106gXx/falcons-logo.jpg",
      },
      {
        name: "Panthers",
        city: "Carolina",
        logo: "https://i.ibb.co/6LVwFnG/panthers-logo.png",
      },
      {
        name: "Saints",
        city: "New Orleans",
        logo: "https://i.ibb.co/5hhXcqJd/saints-logo.png",
      },
      {
        name: "Buccaneers",
        city: "Tampa Bay",
        logo: "https://i.ibb.co/hRmhDBwx/buccaneers-logo.jpg",
      },
      {
        name: "Rams",
        city: "Los Angeles",
        logo: "https://i.ibb.co/dwfgxZvS/rams-logo.png",
      },
      {
        name: "49ers",
        city: "San Francisco",
        logo: "https://i.ibb.co/Pzmx6t1f/49ers-logo.png",
      },
      {
        name: "Seahawks",
        city: "Seattle",
        logo: "https://i.ibb.co/tMb3tcG0/seahawks-logo.png",
      },
    ],
  });

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
