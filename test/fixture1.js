import { Selector } from 'testcafe';

fixture`Getting Started`
  .page`./testcafe/example/index.html`;

test('My first test 1', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My first test 2', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My first test 3', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My first test 4', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My first test 5', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My first test 6', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My first test 7', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My first test 8', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My first test 9', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My first test 10', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My first test screenshot', async t => {
  await t.takeScreenshot();
});

test('My first test 1s', async t => {
  await t.wait(1000);
});

test.skip('My first skip', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My first error', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith2!');
});

test('My first warning', async t => {
  await t
    .maximizeWindow();
});
