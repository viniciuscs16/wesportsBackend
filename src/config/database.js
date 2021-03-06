require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: 'postgres',
  password: 'docker',
  database: 'wesportsBD',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

/*
module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}; */
