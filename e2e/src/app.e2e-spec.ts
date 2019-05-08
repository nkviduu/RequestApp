import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

import {
  DemoPage,
  titleVisible,
  containerOpen,
  clickOn,
  hoverOnLabel,
} from './demo.po';
import { Key, by, $, $$, element, ExpectedConditions as EC, } from 'protractor';

import * as path from 'path';

const timeoutLength = 400;
async function pause(len = timeoutLength) { return browser.sleep(len); }
function longPause() { pause(1000); }
const KEYS_SPEED = 50;
const KEYS_END_TIMEOUT = 1000;

let currentCommand = Promise.resolve();
// Serialise all webdriver commands to prevent EPIPE errors
const webdriverSchedule = browser.driver.schedule;
browser.driver.schedule = (command, description: string) => {
  currentCommand = currentCommand.then(() =>
    webdriverSchedule.call(browser.driver, command, description)
  );
  return currentCommand as any;
};


describe('Request App', () => {
  const demoPage = new DemoPage();
  let page;
  let originalTimeout;

  beforeAll(async () => {
    browser.driver.manage().window().setSize(640, 800);
    await browser.sleep(12000);
  });

  beforeEach(async () => {
    // demoPage.resetRequest();
    page = await demoPage.navigateTo();
    await demoPage.scrollToTop();
    const title = 'Conference Room Meeting Setup';
    demoPage.initParent(`[title='${title}']`);

    console.log('parent initilized');

    // tslint:disable-next-line
    originalTimeout = jasmine['DEFAULT_TIMEOUT_INTERVAL'];
    // tslint:disable-next-line
    jasmine['DEFAULT_TIMEOUT_INTERVAL'] = 60000;
  });

  // tslint:disable-next-line
  afterEach(async () => {
    await browser.sleep(4000);
    await demoPage.resetRequest();
    // tslint:disable-next-line
    jasmine['DEFAULT_TIMEOUT_INTERVAL'] = originalTimeout;
  });

  it('should be able to submit Conference Room Meeting Setup using keyboard entries', async () => {
    const title = 'Conference Room Meeting Setup';
    const container = demoPage.getContainer(title, 'content');

    expect(await container.isDisplayed()).toBeFalsy();

    await demoPage.selectItem(title);
    expect(await container.isDisplayed()).toBeTruthy();

    await demoPage.getDts(container).sendKeys('Feb 14, 2018');
    // exit - tab out of calendar
    await sendKeys(Key.TAB);
    // !wait until date picker is collapsed to proceed with next step
    await browser.wait(EC.stalenessOf($('.ui-datepicker')), 1000);
    // focus on from time and select 10'th item
    await sendKeys(Key.TAB);
    await sendKeys(Key.ARROW_DOWN, 12);
    await sendKeys(Key.SPACE);

    // select to time
    await sendKeys(Key.TAB);
    await sendKeys(Key.ARROW_DOWN, 5);  // 2 hours
    // await browser.wait(() => demoPage.getToTime().innerText === '3:30 PM (2 hrs)', 1500);
    await sendKeys(Key.SPACE);
    // await browser.wait(
    //   EC.textToBePresentInElement(demoPage.getToTime(), '3:30 PM'),
    //   1000
    // );

    // select second; room
    await sendKeys(Key.TAB, 2);
    await sendKeys(Key.SPACE);
    await pause();

    // move to project number and update it to 218011-A
    await sendKeys(Key.TAB, 6);
    await sendKeys('218011');
    await pause();

    // select IT request
    await sendKeys(Key.TAB, 3);
    await sendKeys(Key.SPACE);
    await titleVisible('Audio Conference Call');
    // await containerOpen({ title: 'IT request' });
    // await browser.sleep(400);

    // select Audio Conference Call
    await sendKeys(Key.TAB, 3);
    await sendKeys(Key.SPACE);

    // with international callers
    await containerOpen({ title: 'Audio Conference Call' });
    await sendKeys(Key.TAB);
    await sendKeys(Key.SPACE);
    await pause();

    // from Italy and Spain
    await containerOpen({ title: 'International Callers' });
    await sendKeys(Key.TAB);
    await sendKeys('Italy, Spain');
    await pause();

    // add Projector
    await sendKeys(Key.TAB, 2);
    await sendKeys(Key.SPACE);
    // and Laser Pointer
    await sendKeys(Key.TAB);
    await sendKeys(Key.SPACE);

    // select Office Services Setup
    await sendKeys(Key.TAB, 2);
    sendKeys(Key.SPACE);
    await containerOpen({ title: 'Office Services Setup' });

    // set 12 attendees
    await sendKeys(Key.TAB);
    await sendKeys('12');

    // add Drink Cart with
    await sendKeys(Key.TAB, 2);
    await sendKeys(Key.SPACE);

    // make sure drink cart is open
    await containerOpen({ title: 'Drink Cart' });
    // still water
    await sendKeys('\t ');
    // sparkling waater
    await sendKeys('\t ');
    // regular coffee
    await sendKeys('\t ');

    // submit form
    await sendKeys(Key.TAB, 5);
    await sendKeys(Key.RETURN);
    await pause(1000);
    await demoPage.openRequestsPanel_open();

    // view details of submitted request
    await sendKeys(Key.TAB);
    await sendKeys(Key.SPACE);
    await pause(3000);

    // hide details of first item and select it for edit
    await sendKeys(Key.SPACE);
    await sendKeys(Key.TAB);
    await sendKeys(Key.SPACE);
    await pause(500);
    // update project number
    await demoPage.updateProjectNumber('-A');

    await browser.sleep(1000);
  });

  it('should be able to make selections using clicks', async () => {
    await titleVisible('Conference Room Meeting Setup');
    console.log('title visible');

    await clickOn({ labelText: 'Conference Room Meeting Setup' });
    await browser.sleep(400);
    await clickOn({ labelText: '24B' });
    await browser.sleep(2000);
  });

  it('label should change color on hover', async () => {
    // browser.manage().timeouts().implicitlyWait(3000);
    await titleVisible('Conference Room Meeting Setup');
    await browser.sleep(100);

    const label = $$('[title="Conference Room Meeting Setup"] label').first();
    const labelColor = await label.getCssValue('color');
    await pause(500);
    await hoverOnLabel('Conference Room Meeting Setup');
    await pause(500);
    const hoverColor = await label.getCssValue('color');
    expect(hoverColor).not.toBe(labelColor);
    await pause(500);
  });

  it ('should be able to upload, rotate and delete file', async () => {
    await titleVisible('Printing issue');
    await clickOn({ labelText: 'Printing issue' });

    const fileToUpload = './sample_files/image.jpg';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    await pause(1000);

    await sendKeys(Key.TAB);
    await sendKeys('Please see issue with this print. See attached image.');
    await pause(500);

    await $('[title="Printing issue"] input[type="file"]')
      .sendKeys(absolutePath);
    await pause(1000);

    const img = $('.content-attachment__item img');
    const width = await img.getCssValue('width');
    const height = await img.getCssValue('height');

    // rotate image
    await $$('[title="Printing issue"] button')
      .filter(async (btn) => await btn.getText() === 'Rotate Image')
      .first()
      .click();

    await pause(1000);

    const rotatedWidth = await img.getCssValue('width');
    const rotatedHeight = await img.getCssValue('height');

    const ratio = parseFloat(width) / parseFloat(height);
    const rotatedRatio = parseFloat(rotatedWidth) / parseFloat(rotatedHeight);

    await browser.executeScript(
      'window.scrollTo(0,5000)');
    await pause(1200);

    await $$('.content-attachment__item button')
      .filter(async (btn) => await btn.getText() === 'Delete')
      .first()
      .click();
    await pause(10);
    const attachementCount = await $$('.content-attachment__item img').count();
    expect(attachementCount).toBe(0);
    await pause(2000);
  });
});

async function sendKeys(
    keyValue,
    count = 1, {
      inBetweenTimeout = KEYS_SPEED,
      endTimeout = KEYS_END_TIMEOUT,
    } = {}
  ) {
  for (let i = 0; i < count; i++) {
    await browser.actions().sendKeys(keyValue).perform();
    if (inBetweenTimeout) {
      await browser.sleep(inBetweenTimeout);
    }
  }
  if (endTimeout) {
    await browser.sleep(endTimeout);
  }
}
