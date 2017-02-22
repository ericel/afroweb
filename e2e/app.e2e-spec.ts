import { AfrowebPage } from './app.po';

describe('afroweb App', () => {
  let page: AfrowebPage;

  beforeEach(() => {
    page = new AfrowebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
