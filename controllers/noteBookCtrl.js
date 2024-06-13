exports.addNoteBook = async (req, res, client) => {
    try {      
      // Création d'un nouveau notebook
      const query = {
        text: 'INSERT INTO notebooks (username, title) VALUES ($1, $2)',
        values: [req.body.username, req.body.title],
      };
  
      await client.query(query);
      res.status(201).json({ message: 'New notebook created successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error creating new notebook' });
    }
  };

  exports.GetAllNoteBook = async (req, res, client) => {
    try {      
        
    const username = req.body.username
      // Récupération de toutes les notebooks
      const query = {
        text: 'SELECT * FROM notebooks WHERE username = $1',
        values: [username]
    };
  
      const result = await client.query(query);
      res.status(200).json({ notebooks: result.rows });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error get all notebooks' });
    }
  };