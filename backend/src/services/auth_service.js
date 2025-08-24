exports.registerUser = async (password, username) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username: username,
      password: hashedPassword,
    });

    user.password = undefined;
    return user;
  } catch (error) {
    throw new Error(error.message || "Gagal mendaftar pengguna");
  }
};

exports.loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error("User not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { user, token };
  } catch (error) {
    throw new Error(error.message || "Gagal masuk pengguna");
  }
};
