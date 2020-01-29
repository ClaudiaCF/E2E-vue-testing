import { Selector, ClientFunction } from 'testcafe';

// the fixture declares what we are testing
fixture `Home`// declare the fixture
    .page `http://localhost:8080`;  // specify the start page

// we can define a client function, those functions will run on the client side
// find the url of the current document
const getLocation = ClientFunction(() => document.location.href);
const filterInput = Selector('input[name=input-filter]');

//then create a test and place your code there
test('Types in the filter and sees result', async t => {
    await t
        .expect(Selector('.filter-label').innerText).eql('Filter by username')
        .typeText(filterInput, 'Clau')
        .pressKey('enter')
        .expect(Selector('td').withText('Claudia').exists).ok()
        .expect(Selector('td').withText('Jose').exists).notOk()
});

test('Reset filter', async t => {
    await t
        .expect(Selector('.filter-label').innerText).eql('Filter by username')
        .typeText(filterInput, 'Clau')
        .pressKey('enter')
        .expect(Selector('td').withText('Claudia').exists).ok()
        .expect(Selector('td').withText('Jose').exists).notOk()
        .click(Selector('.resetFilter'))
        .expect(Selector('td').withText('Jose').exists).ok()
});


test('Remove an item', async t => {
    await t
        .click(Selector('tbody tr td:last-child button'))
        .expect(Selector('td').withText('Nico').exists).notOk()
});

test('Clone an item', async t => {
    await t
        .click(Selector('tbody tr td:nth-child(n + 2) button'))
        .expect(Selector('td').withText('Articulo 1 copy (2)').exists).ok()
        .click(Selector('tbody tr td:nth-child(n + 2) button'))
        .expect(Selector('td').withText('Articulo 1 copy (3)').exists).ok()
});

test('Clone an object and remove it', async t => {
    await t
        .click(Selector('tbody tr td:nth-child(n + 2) button'))
        .expect(Selector('td').withText('Articulo 1 copy (2)').exists).ok()

        .click(Selector('tbody tr:last-child td:last-child button'))
        .expect(Selector('td').withText('Articulo 1 copy (2)').exists).notOk()
        
});

test('Go to the second route and come back', async t => {
    const getLocation = ClientFunction(() => document.location.href.toString());
    const goBack = ClientFunction(() => window.history.back())

    await t
        .click(Selector('a').withText('Second Route'))
        .expect(getLocation()).contains('secondRoute');
    await goBack();
    await t
        .expect(getLocation()).notContains('secondRoute');

});