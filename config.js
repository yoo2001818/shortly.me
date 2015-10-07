module.exports = {
  "database": {
    dialect: 'postgres',
    database: 'postgres',
    host: process.env.POSTGRES_1_PORT_5432_TCP_ADDR,
    username: 'postgres',
    password: process.env.POSTGRES_1_ENV_POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_1_PORT_5432_TCP_PORT)
  },
  "port": 8000,
  "dictionary": {
    "directory": "dict",
    "index": {
      "adj": "index.adj",
      "noun": "index.noun",
      "verb": "index.verb"
    }
  },
  "generator": {
    "patterns": [
      "an",
      "anV",
      "nVn",
      "anVn",
      "anVan"
    ]
  },
  "domain": "http://shortly.me/"
};
