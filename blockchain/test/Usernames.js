var UsernamesContract = artifacts.require("./Usernames.sol");

contract('Usernames', (accounts) => {
  let usernames;

  beforeEach(async () => {
    usernames = await UsernamesContract.new();
  });

  it("should register a username", async () => {

    let username = 'mark';
    let owner = accounts[0];
    let datUri = '0a69de666238867a69f54acc8ec5dc90422f85772dc64bcb4645042886fc1a5a';

    await usernames.register(username, owner, datUri);

    let ownerAddress = await usernames.getUsernameOwner('mark');
  });

  it ('should not allow a username to be registered twice', async () => {
    let username = 'mark';
    let owner = accounts[0];
    let datUri = '0a69de666238867a69f54acc8ec5dc90422f85772dc64bcb4645042886fc1a5a';

    await usernames.register(username, owner, datUri);

    let errored = false;

    try {
      await usernames.register(username, owner, datUri);
    } catch (err) {
      errored = true;
    }

    assert.equal(errored, true);
  });

  it ('should be able to register a username from a delegate (other address)', async () => {
    let username = 'mark';
    let delegate = accounts[1];
    let owner = accounts[0];
    let datUri = '0a69de666238867a69f54acc8ec5dc90422f85772dc64bcb4645042886fc1a5a';

    await usernames.register(username, owner, datUri, { from: delegate });

    let ownerAddress = await usernames.getUsernameOwner('mark');
    assert.equal(ownerAddress, owner); // should NOT be the degate

  });

  it ('should delete a username if owner', async () => {
    let username = 'mark';
    let owner = accounts[0];
    let datUri = '0a69de666238867a69f54acc8ec5dc90422f85772dc64bcb4645042886fc1a5a';

    await usernames.register(username, owner, datUri);

    await usernames.remove(username);

    // username should now be free
    let ownerAddress = await usernames.getUsernameOwner('mark');
    assert.notEqual(ownerAddress, owner); // should NOT be the degate
  
    // and should be able to register a new one with the same name
    await usernames.register(username, owner, datUri);
  
  });

  it ('should return the datUri for a username', async () => {
    let username = 'mark';
    let owner = accounts[0];
    let datUri = '0a69de666238867a69f54acc8ec5dc90422f85772dc64bcb4645042886fc1a5a';

    await usernames.register(username, owner, datUri);

    let returnedDatUri = await usernames.getUsernameDatUri(username);

    assert.equal(web3.toUtf8(returnedDatUri), datUri);
  });

});
