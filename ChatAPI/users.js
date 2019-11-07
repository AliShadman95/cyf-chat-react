const users = [];

const addUser = ({ id, name, avatar, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(user => user.name === name);

  if (existingUser) {
    return { error: "Username is taken.." };
  }

  const user = { id, name, avatar, room };

  users.push(user);
  console.log("we pushed in this user", user);
  return { user };
};

const updateUserRoom = (id, room) => {
  room = room.trim().toLowerCase();
  console.log("id before changing user", id, users);
  const user = users.find(user => user.id === id);
  console.log("user isnide helper function", user);
  let prevRoom = user.room;

  user.room = room;
  user.prevRoom = prevRoom;
  users.push(user);

  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  } else {
    return { error: "Server error!!" };
  }
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);
  console.log("removed user");
  users.splice(index, 1)[0];
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = {
  addUser,
  updateUserRoom,
  removeUser,
  getUser,
  getUsersInRoom
};
