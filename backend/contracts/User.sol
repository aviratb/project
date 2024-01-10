// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract User {
    struct UserData {
        string firstName;
        string lastName;
        string mobile;
        string email;
        uint256 age;
    }

    mapping(uint256 => UserData) public users;
    uint256 public userId;

    function addUser(string memory firstName, string memory lastName, string memory mobile, string memory email, uint256 age) public {
        users[userId] = UserData(firstName, lastName, mobile, email, age);
        userId++;
    }

    function getUser(uint256 _userId) public view returns (UserData memory) {
        return users[_userId];
    }

    function getAllUsers() public view returns (UserData[] memory) {
        UserData[] memory allUsers = new UserData[](userId);

        for (uint256 i = 0; i < userId; i++) {
            allUsers[i] = users[i];
        }

        return allUsers;
    }
}
