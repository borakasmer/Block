import { BlocksPage } from './app.po';

describe('blocks App', function() {
  let page: BlocksPage;

  beforeEach(() => {
    page = new BlocksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
