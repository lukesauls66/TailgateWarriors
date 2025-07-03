import bcrypt from ("bcrypt");

async function hashPassword(plainTextPassword) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plainTextPassword, saltRounds);
  console.log(hash);
}

hashPassword("samplePassword");
