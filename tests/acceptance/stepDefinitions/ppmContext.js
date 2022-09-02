const { faker } = require('@faker-js/faker');

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const randomEmail = faker.internet.email();

// import BDD prefixes
const {Given, When, Then} = require('@cucumber/cucumber')
// import expect for assertion
const { expect } = require("@playwright/test");

//launch url
const url = 'https://hudppmpoctest.crm6.dynamics.com/main.aspx'

Given('I am logged in to the {string} app', async function (appName) {
    await page.goto(url)
    await page.frameLocator('#AppLandingPage').locator('text=' + appName).first().click();
    await page.waitForNavigation();
});

When('I open the provider account {string}', async function (provider) {
    // Open 'provider' details
    await page.locator('text=Providers').click();
    await page.locator('text=' + provider).click();
});

When('I create a new contact', async function () {
    // Open new contact quick create, enter details, and click 'Save and Close'
    await page.locator('[aria-label="New Contact\\. Add New Contact"]').click();
    await page.locator('[aria-label="First Name"]').fill(firstName);
    await page.locator('[aria-label="Last Name"]').click();
    await page.locator('[aria-label="Last Name"]').fill(lastName);
    await page.locator('text=EmailEmail: nullMobile PhoneMobile Phone: nullBusiness PhoneBusiness Phone: n >> [placeholder="Provide an email"]').click();
    await page.locator('text=EmailEmail: nullMobile PhoneMobile Phone: nullBusiness PhoneBusiness Phone: n >> [placeholder="Provide an email"]').fill(randomEmail);
    await page.locator('[aria-label="Save and Close"]').click();
});

Then('I can create and send an invitation to register on the portal', async function () {
    // Open created contact
    await page.locator('#dataSetRoot_Contacts >> text=' + firstName + ' ' + lastName).click();

    // Create and save invitation
    await page.locator('[aria-label="Create Invitation"]').click();
    await page.locator('[aria-label="Save \\(CTRL\\+S\\)"]').click();
    await page.waitForFunction('Xrm.Utility.getPageContext().input.entityId !== null');

    // Run 'Send Invitation' Flow
    await page.locator('[aria-label="Commands"] [aria-label="Flow\\. Run Flow"]').click();
    await page.locator('[aria-label="Send Invitation"]').click();
    await page.locator('[aria-label="OK"]').click();
    await page.locator('button[title="Go back"]').click();

    // Poll to check if the email has been sent and visible in the contact summary page
    await expect.poll(async () => {
        await page.locator('button[aria-label="Refresh"]').click();
        return page.locator('li[aria-label="Email from Test Account"]').isVisible();
    }, {
        intervals: [1_000, 2_000, 5_000],
        timeout: 30_000
    }).toBeTruthy();

    await page.locator('li[aria-label="Email from Test Account"]').click();

    // Cleanup, delete the contact
    await page.locator('button[aria-label="Delete"]').click();
    await page.locator('button[data-id="confirmButton"]').click();
});