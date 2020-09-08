require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME  || "df",
  password: process.env.DB_PASSWORD  || "12345",
  database: process.env.DB_DATABASE  || "pr",
  host:     process.env.DB_HOST ||  "localhost",
  dialect:  process.env.DB_DIALECT   || "mariadb",

  // migrationStorage: "proint",
  // migrationStorageTableName: "migration",

  define : {
    timestamps: true,

    // // Genera claves foraneas del tipo user_id en vez de userId
    // underscored: true
  },
  // dialectOptions: {
  //   "timezone": "Etc/GMT0"
  // }
}