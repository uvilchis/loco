import * as utils from '../../../client/lib/util';

import mockService from './mock-service.json';
import mockRoutes from './mock-routes.json';
import expected from './expected.json';

describe('client utils', () => {

  it('should organize routes and utils correctly', () => {
    let result = utils.routeOrganizer(mockService.lines, mockRoutes);
    expect(result).toEqual(expected);
  });
});