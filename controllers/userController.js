const User = require('../models/user'); // Import the User model

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { email, location } = req.body;
    // Validate input data here if needed

    const newUser = new User({ email, location });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user's location by ID
exports.updateUserLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;
    // Validate input data here if needed

    const updatedUser = await User.findByIdAndUpdate(id, { location }, { new: true });
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user location:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error retrieving user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
