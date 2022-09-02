# Playwright PPM PoC Evaluation

This project contains a sample test case using cucumber to run a BDD test where the
step bindings are implemented using Playwright javascript code.

Working Cucumber test and standard Playwright test
Testcase opens up an existing provider, creates a contact, sends out an
invitation to register on the portal, then deletes the contact.

To run the ppm feature file from the command line, navigate to the project folder 
and run the test:e2e script:  
`npm run test:e2e tests/acceptance/features/ppm.feature`

To display the report after the test run, run the following from the project folder:  
`npx playwright show-report`

There is also an example of the same test without using Cucumber in ppm_poc.spec.ts
To run this, type:  
`npx playwright test`  
or  
`npm run test`
