import { Sequelize } from 'sequelize';
import * as baseConfig from '../config';
import { Test } from './Test';

const env = process.env.NODE_ENV || 'development';
const config = baseConfig[env];

// eslint-disable-next-line import/no-mutable-exports
let sequelize;
if (config.dialect === 'sqlite') {
  sequelize = new Sequelize(config);
} else if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelList = [Test];
modelList.forEach((module) => {
  // @ts-ignore
  module.initModel(sequelize, config);
});

modelList.forEach((module) => {
  // @ts-ignore
  if (module.associate) module.associate();
});

export const sync = async () => {
  for (let i = 0; i < modelList.length; i += 1) {
    // @ts-ignore
    await modelList[i].sync();
  }
  await sequelize.sync();
  modelList.forEach((module) => {
    // @ts-ignore
    if (module.seed) await module.seed(sequelize);
  });
};

export default sequelize;
