# ppm.feature - sample BDD feature to explore Playwright

Feature: Send Invitation
 As a user
 I want to create a new contact
 So that I can send them an invitation to register on the portal

 Scenario: Create new contact and send invitation
   Given I am logged in to the 'Vacancy and Market Rent Approvals' app
   When I open the provider account "Aarangi"
   And I create a new contact
   Then I can create and send an invitation to register on the portal
