pragma solidity ^0.4.24;

contract Usernames {

  struct Username {
    address owner;
    address delegate;
    bytes32 username;
    bytes datUri;
  }

  mapping(bytes32 => Username) public usernamesMap;

  /**
   * Create a username
   * @param _username - the username for user
   * @param owner - the owner of the username
   * @return void
   */
  function register(bytes32 _username, address owner, bytes datUri) public {
    
    // Must not exists

    confirmUsernameDoesNotExist(_username); // throws exception

    Username memory usernameTmpStruct = Username(
      owner,
      msg.sender,
      _username,
      datUri
    );
    usernamesMap[_username] = usernameTmpStruct;
  }

  /**
   * Confirm the username does not existingUsername
   * @param _username - the username
   * @return bool
   */
  function confirmUsernameDoesNotExist(bytes32 _username) internal view returns (bool) {
    Username memory existingUsername = usernamesMap[_username];  

    require(existingUsername.owner == 0);
    require(existingUsername.username == 0);
  }

  /**
   * Return the owner address of a user
   * @param _username - the username
   * @return address - the owners address
   */
  function getUsernameOwner(bytes32 _username) public view returns (address) {
    Username memory usernameTmpStruct = usernamesMap[_username];  
    return usernameTmpStruct.owner;
  }

  /**
   * Return the data uri for a username
   * @param _username - the username
   * @return bytes
   */
  function getUsernameDatUri(bytes32 _username) public view returns (bytes) {
    Username memory usernameTmpStruct = usernamesMap[_username];  
    return usernameTmpStruct.datUri;
  }

  /**
   * Delete a username
   * @param _username - the username
   */
  function remove(bytes32 _username) public {
    Username memory existingUsername = usernamesMap[_username]; 
    
    require(msg.sender == existingUsername.owner); // Ensure only owner can delete

    delete usernamesMap[_username];
  }

}
