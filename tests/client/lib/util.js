import * as utils from '../../../client/lib/util';

import mockService from '../shared/mock-service.json';
import mockRoutes from '../shared/mock-routes.json';
import organizedRoutes from '../shared/organized-routes.json';

describe('client utils', () => {

  it('should take in two arrays and return an object', () => {
    let result = utils.routeOrganizer([], []);
    expect(result).toEqual({});
  })

  it('should organize routes and utils correctly', () => {
    let result = utils.routeOrganizer(mockService.lines, mockRoutes);
    expect(result).toEqual(organizedRoutes);
  });
});