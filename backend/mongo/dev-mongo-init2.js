db.createUser({
  user: "the_username",
  pwd: "the_password",
  roles: [
    {
      role: "dbOwner",
      db: "the_database",
    },
  ],
});

db.createCollection("users");

//password: salasana
db.users.insert({
  username: "leo",
  passwordHash: "$2a$10$Pb9o5b/WB7FuQ5BPHrGd6eqgLw.4B.CuOBkd.L8kc.awJhbWKQi0G",
  email: "leo.leo@leo.leo",
});
