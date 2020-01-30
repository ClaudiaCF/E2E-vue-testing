import { Selector, ClientFunction } from 'testcafe';

// the fixture declares what we are testing
fixture `Second route`// declare the fixture
    .page `http://localhost:8080/#/secondRoute`;  // specify the start page

// we can define a client function, those functions will run on the client side
// find the url of the current document
const getLocation = ClientFunction(() => document.location.href);
const validationInput = Selector('input[name=input-validation]');

test('Look for the select placeholder and watch the inputs autofill', async t => {
    const select = Selector('select');
    const option = Selector('option');
    const inputOne = Selector('.inheritInputOne');
    const inputTwo = Selector('.inheritInputTwo');

    await t
    .expect(select.value).eql('Choose one!')
    .expect(inputOne.value).eql('')
    .expect(inputTwo.value).eql('')
    .click(select)
    .click(option.withText('Option 1'))
    .expect(select.value).eql('Option 1')
    .expect(inputOne.value).eql('Option 1')
    .expect(inputTwo.value).eql('Option 1')
    .click(select)
    .click(option.withText('Option 3'))
    .expect(inputOne.value).eql('Option 3')
    .expect(inputTwo.value).eql('Option 3')
});

test('Launch and close modal', async t => {
    const btnModal = Selector('.btn-launchModal');
    const circleModal = Selector('.circle-launchModal');

    await t
        .click(btnModal)
        .expect(Selector('html').textContent).contains('Click!')
        .click(circleModal)
        .expect(Selector('html').textContent).notContains('learning_items')
});

test('Click on radiobuttons', async t => {
    const radioCarolina = Selector('[id="carolina"]');
    const radioBarney = Selector('[id="barney"]');
    const radioMoe = Selector('[id="moe"]');

    await t
        .click(radioCarolina)
        .expect(radioCarolina.checked).ok()
        .expect(radioBarney.checked).notOk()
        .expect(radioBarney.checked).notOk()
        .click(radioBarney)
        .expect(radioBarney.checked).ok()
        .expect(radioMoe.checked).notOk()
        .expect(radioMoe.checked).notOk()
});

test('Click on checkboxes', async t => {
    const checkboxNico = Selector('[id="nico"]');
    const checkboxTaco = Selector('[id="taco"]');
    const checkboxClaudia = Selector('[id="claudia"]');

    await t
        .click(checkboxNico)
        .expect(checkboxNico.checked).ok()
        .click(checkboxTaco)
        .expect(checkboxTaco.checked).ok()
        .click(checkboxClaudia)
        .expect(checkboxClaudia.checked).ok()
});

test('Check input validation', async t => {
    await t
        .typeText(validationInput, '12')
        .expect(Selector('p').withText('Not validated').exists).ok()
        .typeText(validationInput, '345')
        .expect(Selector('p').withText('Not validated').exists).ok()
        .typeText(validationInput, '6789')
        .expect(Selector('p').withText('Not validated').exists).ok()
        .selectText(validationInput)
        .pressKey('delete')
        .typeText(validationInput, '12345678D')
        .expect(Selector('p').withText('Validation ok').exists).ok()
});

test('Go to the first route and come back', async t => {
    const getLocation = ClientFunction(() => document.location.href.toString());
    const goBack = ClientFunction(() => window.history.back())

    await t
        .click(Selector('a').withText('Home'))
        .expect(getLocation()).notContains('secondRoute');
    await goBack();
    await t
        .expect(getLocation()).contains('secondRoute');

});
