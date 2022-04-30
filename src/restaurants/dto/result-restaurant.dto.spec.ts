import { ResultRestaurantDto } from './result-restaurant.dto';

describe('ResultRestaurantDto', () => {
  it('should be defined', () => {
    expect(new ResultRestaurantDto('', '')).toBeDefined();
  });
});
