const express = require('express');
const router = express.Router();
const UsersModel = require('../models/UserSchema');
const authenticateJWT = require('../middleware/authMiddleware');
router.get('/userData', authenticateJWT, async (req, res) => {
    try {
              if (res.locals.isAuthenticated) {
                const userId = req.user.ID;
             
                const user = await UsersModel.findById(userId);
          
                if (!user) {
                  return res.status(404).json({ error: 'User not found' });
                }
               else {
                res.json({ success: true, user });
               }
             
              } else {
                res.status(401).json({ error: 'Unauthorized' });
              }
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Internal server error' });
            }
});

module.exports = router;
