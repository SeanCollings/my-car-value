// not used, just added for reference as old way
const dbConfig = {
  synchronise: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: ':memory:',
      entities: ['**/*.entity.ts'],
      synchronize: true,
    });
    break;
  case 'production':
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
