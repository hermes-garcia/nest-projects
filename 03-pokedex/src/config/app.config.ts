import * as process from 'process';

export const EnvConfiguration = () => ({
  environments: process.env.NODE_ENV || 'dev',
  mongoConnection: +process.env.MONGO_CONNECTION,
  port: process.env.PORT || 3000,
});
