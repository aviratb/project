const { fetchUserContract, sendTx } = require('../src/transactions')
const { validateAddUser, validateGetUser } = require('../validators/userValidator');


async function addUser(req, res) {
  try {
    const { error, reqObj } = await validateAddUser(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { firstName, lastName, mobile, email, age } = reqObj;
    const txReceipt = await sendTx(firstName, lastName, mobile, email, age)
    res.status(200).json(txReceipt);

  } catch (error) {
    res.status(500).json({ errorssss: error });
  }
}

async function getAllUsers(req, res) {
  try {
    const { contract } = await fetchUserContract()

    contract.methods.getAllUsers().call({}, (error, result) => {
      if (error) {
        res.status(500).json({ error: error });
      }
      else {
        const formattedUserData = result.map(data => ({
          firstName: data[0], lastName: data[1], mobile: data[2],
          email: data[3], age: Number(data[4])
        }));
        res.status(200).json({ users: formattedUserData });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getUser(req, res) {
  try {
    const { error, reqObj } = await validateGetUser(req.params)

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { userId } = reqObj;
    const { contract } = await fetchUserContract()
    const formattedUserData = []

    contract.methods.getUser(userId).call({}, (error, result) => {
      if (error) {
        res.status(500).json({ error: error });
      }
      else {
        if (result.firstName) {
          formattedUserData.push({
            firstName: result[0], lastName: result[1], mobile: result[2],
            email: result[3], age: Number(result[4])
          });
        }
        res.status(200).json({ user: formattedUserData });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}


module.exports = {
  addUser,
  getAllUsers,
  getUser
};
