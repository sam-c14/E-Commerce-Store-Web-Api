const findUserByEmail = async (email, User) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

module.exports = findUserByEmail;
