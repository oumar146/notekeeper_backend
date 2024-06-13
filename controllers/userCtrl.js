const bcrypt = require('bcrypt');

exports.signup = async (req, res, client) => {
  try {
    console.log(req.body.password)
    // Hachage du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
    
    // Création d'un nouveau utilisateur
    const query = {
      text: 'INSERT INTO users(username, password) VALUES ($1, $2)',
      values: [req.body.username, hashedPassword],
    };

    await client.query(query);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ error: 'Error inserting user' });
  }
};

exports.login = async (req, res, client) => {
  try {
    const { username, password } = req.body;

    // Rechercher l'utilisateur par nom d'utilisateur
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };
    
    const result = await client.query(query);

    if (result.rows.length === 0) {
      // Si l'utilisateur n'est pas trouvé
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    // Comparer le mot de passe fourni avec le mot de passe haché en base de données
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      // Si le mot de passe n'est pas valide
      return res.status(401).json({ error: 'Invalid password' });
    }
    // Si l'utilisateur est trouvé et le mot de passe est correct
    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
