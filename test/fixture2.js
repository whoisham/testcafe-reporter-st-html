import { Selector } from 'testcafe';

fixture`Getting second`
  .page`./testcafe/example/index.html`;

test('My second test 1', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My second test 2', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My second test 3', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My second test 4', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My second test 5', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My second test 6', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My second test 7', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My second test 8', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My second test 9', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My second test 10', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test.skip('My second skip', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('My second error', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith2!');
});
