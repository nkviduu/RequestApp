import {
  browser,
  by,
  element,
  ElementFinder,
  $,
  $$,
  promise,
  ExpectedConditions as EC
} from 'protractor';

export class DemoPage {
  parent: ElementFinder;

  async navigateTo() {
    return browser.get('/demo', 2000);
  }

  initParent(cssString) {
    this.parent = $(cssString);
  }

  get appTitleEl() {
    return $('.app-title');
  }

  getCancelButton() {
    return this.parent.$('vt-form-actions .js-cancel');
  }

  getAllCancelButtons() {
    return $$('.js-cancel');
  }

  async selectItem(title) {
    await browser.sleep(100);
    const container = this.getContainer(title, 'label');
    await browser.wait(async () => await container.isDisplayed());
    console.log(`${title} found`);
    return container.click().then(delay);
  }

  getContainer(title, part: 'label' | 'content' | '' = '') {
    const selectedPart = part
      .replace('content', ' > div > div > .container-select__content')
      .replace('label', ' > div > div > label');
    return $(`[title='${title}'] ${selectedPart}`);
  }

  getFromTime(parent: ElementFinder = null) {
    return (parent || this.parent).$$('.vt-dropdown-display').get(0);
  }

  getToTime(parent: ElementFinder = null) {
    return (parent || this.parent).$$('.vt-dropdown-display').get(1);
  }

  async resetRequest() {
    await delay(2000);
    await browser.executeScript('window.scrollTo(0, 10000)');
    await delay(2000);
    await this.getAllCancelButtons()
      .filter(el => el.isDisplayed())
      .each(cancelButton => cancelButton.click());
    await delay(2000);
    return this.scrollToTop();
  }

  async scrollToTop() {
    return await browser.executeScript('window.scrollTo(0, 0)');
  }

  getDts(parent: ElementFinder) {
    return parent.element(
      { css: '.datepicker'}
    );
  }

  async openRequestsPanel_open() {
    await browser.wait(EC.presenceOf($('rf-open-requests > div')), 2000, 'Failed to see request panel');
    $('rf-open-requests .panel-collapsable__title').click();
    const panelBody = $('rf-open-requests .panel-collapsable__body');
    return browser.wait(EC.visibilityOf(panelBody), 4000, 'Failed wait for request to open');
  }

  async updateProjectNumber(value) {
    return this.parent.$('[title=\'Project Number:\'] input')
      .sendKeys(value);
  }
}

export async function delay(val) {
  await browser.sleep(400);
}

export async function containerOpen(
  { title, wait = 4000 }: {title: string, wait?: number}
) {
  const visibleContainerWithTitle = $$(`[title="${title}"]`)
    .filter(c => c.isDisplayed())
    .first();

  return browser.wait(
    async () => {
      const isOpen = await visibleContainerWithTitle
        .$$('.container-select__content')
        .first()
        .isDisplayed();
        // console.log('isOpen', isOpen);

      return isOpen;
    }, wait);
}

export async function titleVisible(title) {
  return browser.wait(async () => (await
    $$(`[title="${title}"]`)
      .filter(c => c.isDisplayed())
      .count()
    ) > 0
  , 2000);
}

export async function clickOn({ labelText = ''}) {
  return $$('label')
    .filter(async (l) => (await l.getText()) === labelText)
    .first()
    .click();
}

export async function hoverOnLabel(path) {
  const elPath = '[title="' + path.split('|').join('"] [title="') + '"] label';
  const el = await $(elPath).getWebElement();
  return browser.actions().mouseMove(el).perform();
}
