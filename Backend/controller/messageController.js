const Message = require('../models/message');

exports.getMessages = (async (req, res) => {
    try {
      const messages = await Message.find({ roomId: req.params.roomId }).sort({ timestamp: 1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving messages", error });
    }
})