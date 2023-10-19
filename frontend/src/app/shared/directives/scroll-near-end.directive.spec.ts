import { ScrollNearEndDirective } from './scroll-near-end.directive';

describe('ScrollNearEndDirective', () => {
  const mockElementRef = {
    nativeElement: document.createElement('div')
  };

  it('should create an instance', () => {
    const directive = new ScrollNearEndDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
