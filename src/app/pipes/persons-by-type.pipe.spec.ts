import { PersonsByTypePipe } from './persons-by-type.pipe';

describe('PersonsByTypePipe', () => {
  it('create an instance', () => {
    const pipe = new PersonsByTypePipe();
    expect(pipe).toBeTruthy();
  });
});
