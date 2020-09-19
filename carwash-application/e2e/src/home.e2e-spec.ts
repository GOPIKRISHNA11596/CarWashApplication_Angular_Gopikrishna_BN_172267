import { HomePage } from './home.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should display CAR CARE SERVICE - A DOCTOR FOR YOUR CAR', () => {
    page.navigateTo();
    expect(page.getCarWashHeading()).toEqual('CAR CARE SERVICE - A DOCTOR FOR YOUR CAR');
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
