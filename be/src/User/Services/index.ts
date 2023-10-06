import { listUsers } from "../Repository";

const findUser = async () => {
  try {
    const allUsers = await listUsers.find();
  } catch (error) {}
};
