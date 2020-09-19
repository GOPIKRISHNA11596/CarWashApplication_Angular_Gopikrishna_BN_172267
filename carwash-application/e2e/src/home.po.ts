import { browser, by, element } from 'protractor';

export class HomePage {

  // tslint:disable-next-line: typedef
  navigateTo() {
    return browser.get('/home');
  }

  // tslint:disable-next-line: typedef
  getCarWashHeading() {
    return element(by.id('pageTitle')).getText();
  }

}
