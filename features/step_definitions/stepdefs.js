/* eslint-disable import/no-extraneous-dependencies */
import {
  Given,
  When,
  Then,
  After,
  AfterAll,
  Status
} from "cucumber";

import {
  Builder,
  By,
  Capabilities,
  Key
} from "selenium-webdriver";

import {
  expect
} from "chai";

// require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set("chromeOptions", {
  w3c: false
});
// const capabilities = Capabilities.firefox();
// capabilities.set('firefoxOptions', {
//     "w3c": false
// });
const driver = new Builder().withCapabilities(capabilities).build();

Given("I am on the Google search page", {
  timeout: 60 * 1000
}, async () => {
  await driver.get("http://www.google.com");
});

When("I search for {string}", {
  timeout: 60 * 1000
}, async (searchTerm) => {
  const element = await driver.findElement(By.name("q"));
  element.sendKeys(searchTerm, Key.RETURN);
  element.submit();
});

Then("the page title should start with {string}", {
  timeout: 60 * 1000
}, async (searchTerm) => {
  const title = await driver.getTitle();
  const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
  expect(isTitleStartWithCheese).to.equal(true);
});

After((scenario) => {
  if (scenario.result.status === Status.FAILED) {
    // const world = this;
    return driver.takeScreenshot().then((screenShot, error) => {
      if (!error) {
        // world.attach(screenShot, "./image/png.png");
      }
    });
  }
  return undefined;
});

AfterAll("end", async () => {
  await driver.quit();
});
