import { test, expect } from '@playwright/test';

test.use({
    storageState: 'auth.json',
    viewport: {
        height: 960,
        width: 1920
    }
});

test('Create new contact and send invitation', async ({ page }) => {

    // Go to landing page for all apps
    await page.goto('https://hudppmpoctest.crm6.dynamics.com/main.aspx?forceUCI=1&pagetype=apps');

    // Open the "Vacancy and Market Rent Approvals" app
    await page.frameLocator('#AppLandingPage').locator('text=Vacancy and Market Rent Approvals').first().click();
    await page.waitForNavigation();

    // Open Providers page
    await page.locator('text=Providers').click();

    // Open Aarangi Motel provider
    await page.locator('text=Aarangi Motel').click();

    // Open related drop-down
    await page.locator('[aria-label="Related"] div[role="presentation"]:has-text("Related")').click();

    // Select contacts tab
    await page.locator('[aria-label="Contacts Related - Common"] >> text=Contacts').click();

    // Open new contact page
    await page.locator('[aria-label="New Contact\\. Add New Contact"]').click();

    // Enter first name
    await page.locator('[aria-label="First Name"]').fill('Bugs');

    // Press Tab
    await page.locator('[aria-label="First Name"]').press('Tab');

    // Enter last name
    await page.locator('[aria-label="Last Name"]').fill('Bunny');

    // Select email textbox
    await page.locator('text=EmailEmail: nullMobile PhoneMobile Phone: nullBusiness PhoneBusiness Phone: n >> [placeholder="Provide an email"]').click();

    // Enter email
    await page.locator('text=EmailEmail: nullMobile PhoneMobile Phone: nullBusiness PhoneBusiness Phone: n >> [placeholder="Provide an email"]').fill('ben.craig@assurity.co.nz');

    // Click Save and close
    await page.locator('[aria-label="Save and Close"]').click();

    // Open created contact
    await page.locator('#entity_control-pcf_grid_control_container >> text=Bugs Bunny').click();

    // Create invitation
    await page.locator('[aria-label="Create Invitation"]').click();

    // Save invitation
    await page.locator('[aria-label="Save \\(CTRL\\+S\\)"]').click();
    await page.waitForFunction('Xrm.Utility.getPageContext().input.entityId !== null');

    // Open Flow drop-down
    await page.locator('[aria-label="Commands"] [aria-label="Flow\\. Run Flow"]').click();

    // Select Send Invitation Flow
    await page.locator('[aria-label="Send Invitation"]').click();

    // Confirm
    await page.locator('[aria-label="OK"]').click();

    // Navigate back to the contact details page
    await page.locator('[aria-label="Press Enter to go back\\."]').click();

    // Click Delete
    await page.locator('button[role="menuitem"]:has-text("Delete")').click();

    // Confirm
    await page.locator('text=DeleteCancel >> [aria-label="Delete"]').click();
    await page.waitForNavigation();
});

