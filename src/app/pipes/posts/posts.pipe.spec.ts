import { PostsPipe } from './posts.pipe';

describe('PostsPipe', () => {
  it('create an instance', () => {
    const pipe = new PostsPipe();
    expect(pipe).toBeTruthy();
  });
});
