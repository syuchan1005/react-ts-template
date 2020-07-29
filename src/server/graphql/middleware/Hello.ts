import GQLMiddleware from '@server/graphql/GQLMiddleware';
import { QueryResolvers } from '@common/GQLTypes';
import { Test } from '@server/sequelize/models/Test';

class Hello extends GQLMiddleware {
  // eslint-disable-next-line class-methods-use-this
  Query(): QueryResolvers {
    return {
      hello: async () => {
        const test = await Test.create();
        return `Hello!! ${test.id}`;
      },
    };
  }
}

export default Hello;
