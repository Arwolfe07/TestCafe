import { Selector } from 'testcafe';

const usernameInput = Selector('#username');
const passwordInput = Selector('#password');
const loginButton = Selector('#login');
const dashboard = Selector('.page-dashboard');
const loginError = Selector('#login-error-notify');


fixture`Automation tests for Login page`
    .page('https://dev.deepthought.education/login')

test('Test_Case: Login with valid credentials', async (t) => {
    await t
        .maximizeWindow()
        .typeText(usernameInput, 'Arwolfe')
        .typeText(passwordInput, 'adityaaditya')
        .click(loginButton)
        .wait(2000);

    await t.expect(dashboard.exists).ok('User is not Logged In');
});

test('Test_Case: Login with Invalid credentials', async (t) => {
    await t
        .maximizeWindow()
        .typeText(usernameInput, 'Arwolfe')
        .typeText(passwordInput, 'adaaditya')
        .click(loginButton)
        .wait(2000);

    await t.expect(loginError.exists).ok('Error message must be displayed.');
});

test('Test_Case: Validate that appropriate test messages are displayed', async (t) => {
    // Clicking empty login button
    await t.click(loginButton);
    // Check for custom blank input error
    await t.expect(loginError.innerText).contains('both a username and password');
    // Invalid credentials login
    await t
        .typeText(usernameInput, 'Arwolfe')
        .typeText(passwordInput, 'adaaditya')
        .click(loginButton);
        
    // Check for custom invalid credentials input
    await t.expect(loginError.innerText).contains('Invalid login credentials');

    // Throws error - CHEKING...
    // // Password Length too short
    // await t
    // .typeText(usernameInput,'Arwolfe')
    // .typeText(passwordInput, 'asd');
    
    // // Check for custom short password error
    // await t.expect(loginError.innerText).contains('too short');

    // Check if error message is displayed or not
    await t.expect(loginError.exists).ok('Error message must be displayed.')
});


test('Test_Case: User is redirected to dashboard', async (t) => {
    await t
        .maximizeWindow()
        .typeText(usernameInput, 'Arwolfe')
        .typeText(passwordInput, 'adityaaditya')
        .click(loginButton)
        .wait(2000);

    // Check for dashboard
    await t.expect(dashboard.exists).ok('User is not redirected to the dashboard.');
});

