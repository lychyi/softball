import { IlmnSoftballV2Page } from './app.po';

describe('ilmn-softball-v2 App', () => {
  let page: IlmnSoftballV2Page;

  beforeEach(() => {
    page = new IlmnSoftballV2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
