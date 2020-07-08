import { LivefeedModule } from './livefeed.module';

describe('LivefeedModule', () => {
  let livefeedModule: LivefeedModule;

  beforeEach(() => {
    livefeedModule = new LivefeedModule();
  });

  it('should create an instance', () => {
    expect(livefeedModule).toBeTruthy();
  });
});
