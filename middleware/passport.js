const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Debug: Print out env variables to make sure they're loaded
console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID);
console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET ? '***' : undefined);
console.log('CALLBACK_URL:', process.env.CALLBACK_URL);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    console.log('\n=== GITHUB STRATEGY CALLBACK ===');
    console.log('Access token received:', !!accessToken);
    console.log('Profile ID:', profile.id);
    console.log('Profile username:', profile.username);
    console.log('Profile emails:', profile.emails);
    
    try {
      const db = mongodb.getDatabase();
      const usersCollection = db.collection('users');
      
      // Try to find existing user by GitHub ID
      let user = await usersCollection.findOne({ githubId: profile.id });
      
      if (!user) {
        console.log('Creating new user for GitHub ID:', profile.id);
        
        // Create new user
        const newUser = {
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          profileUrl: profile.profileUrl,
          email: profile.emails && profile.emails[0] && profile.emails[0].value,
          createdAt: new Date()
        };
        
        const result = await usersCollection.insertOne(newUser);
        user = { ...newUser, _id: result.insertedId };
        console.log('New user created with ID:', result.insertedId);
      } else {
        console.log('Found existing user:', user._id);
      }
      
      console.log('GitHub authentication successful for user:', user.username);
      return done(null, user);
      
    } catch (err) {
      console.error('Error in GitHub strategy:', err);
      return done(err, null);
    }
  }
));

passport.serializeUser(function(user, done) {
  console.log('Serializing user:', user._id);
  done(null, user._id.toString());
});

passport.deserializeUser(async function(id, done) {
  console.log('Deserializing user ID:', id);
  try {
    const db = mongodb.getDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    console.log('Deserialized user:', user ? user.username : 'not found');
    done(null, user);
  } catch (err) {
    console.error('Error deserializing user:', err);
    done(err, null);
  }
});

module.exports = passport;