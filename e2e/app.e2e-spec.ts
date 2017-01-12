import { PortaladminPage } from './app.po';

describe('portaladmin App', function() {
  let page: PortaladminPage;

  beforeEach(() => {
    page = new PortaladminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
