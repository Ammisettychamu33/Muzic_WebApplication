const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= MongoDB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// ================= Schemas =================
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

const AlbumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  {timestamps: true}
);

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {timestamps: true}
);

// ================= Models =================
const User = mongoose.model('User', UserSchema);
const Album = mongoose.model('Album', AlbumSchema);
const Contact = mongoose.model('Contact', ContactSchema);

// ================= Health Check =================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎵 Music Vibes Backend Running',
  });
});

// ================= Register =================
app.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters.',
      });
    }

    const existingUser = await User.findOne({email});

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal Server Error.',
    });
  }
});

// ================= Login =================
app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and Password are required.',
      });
    }

    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials.',
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal Server Error.',
    });
  }
});

// ================= Contact =================
app.post('/contact', async (req, res) => {
  try {
    const {name, email, message} = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'All fields are required.',
      });
    }

    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();

    res.status(201).json({
      message: 'Message sent successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal Server Error.',
    });
  }
});

// ================= Get Albums =================
app.get('/albums', async (req, res) => {
  try {
    const albums = await Album.find().sort({createdAt: -1});

    res.json(albums);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal Server Error.',
    });
  }
});

// ================= Add Album =================
app.post('/albums', async (req, res) => {
  try {
    const {title, artist, year} = req.body;

    if (!title || !artist || !year) {
      return res.status(400).json({
        message: 'All fields are required.',
      });
    }

    const album = new Album({
      title,
      artist,
      year,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal Server Error.',
    });
  }
});

// ================= Update Album =================
app.put('/albums/:id', async (req, res) => {
  try {
    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAlbum) {
      return res.status(404).json({
        message: 'Album not found.',
      });
    }

    res.json(updatedAlbum);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal Server Error.',
    });
  }
});

// ================= Delete Album =================
app.delete('/albums/:id', async (req, res) => {
  try {
    const deletedAlbum = await Album.findByIdAndDelete(req.params.id);

    if (!deletedAlbum) {
      return res.status(404).json({
        message: 'Album not found.',
      });
    }

    res.json({
      message: 'Album deleted successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal Server Error.',
    });
  }
});

// ================= Start Server =================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});