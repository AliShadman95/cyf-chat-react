"use strict";
var mongoose = require("mongoose"),
  Message = mongoose.model("Message", "Messages");
exports.list_all_messages = (req, res) => {
  Message.find({}, function(err, message) {
    if (err) {
      return res.send(err);
    }
    res.json(message);
  });
};
exports.create_a_message = (req, res) => {
  var new_message = new Message(req.body);
  new_message.save(function(err, message) {
    if (err) {
      return res.send(err);
    }
    res.json(message);
  });
};
exports.get_a_message_by_id = (req, res) => {
  Message.findById(req.params.messageId, function(err, message) {
    if (err) {
      return res.send(err);
    }
    res.json(message);
  });
};

exports.search_messages_by_text = (req, res) => {
  Message.find(
    { message: { $regex: req.params.searchValue, $options: "i" } },
    function(err, message) {
      if (err) {
        return res.send(err);
      }
      res.json(message);
    }
  );
};

exports.get_messages_by_room = (req, res) => {
  Message.find({ room: req.params.roomName }, function(err, message) {
    if (err) {
      return res.send(err);
    }
    res.json(message);
  });
};
exports.edit_a_message = (req, res) => {
  Message.findOneAndUpdate(
    { _id: req.params.messageId },
    req.body,
    {
      new: true
    },
    function(err, message) {
      if (err) {
        return res.send(err);
      }

      res.json(message);
    }
  );
};
exports.delete_a_message = (req, res) => {
  Message.deleteOne(
    {
      _id: req.params.messageId
    },
    function(err, message) {
      if (err) {
        return res.send(err);
      }

      if (message.deletedCount > 0)
        res.json({ message: "Message successfully deleted" });
      else res.json({ message: "Message to delete not found" });
    }
  );
};

exports.get_latest_by_room = (req, res) => {
  Message.find({ room: req.params.roomName }, function(err, message) {
    if (err) {
      return res.send(err);
    }
    res.json(message);
  })
    .sort({ _id: -1 })
    .limit(10);
};

exports.search_messages_by_room = (req, res) => {
  Message.find(
    {
      message: { $regex: req.params.searchValue, $options: "i" },
      room: req.params.roomName
    },
    function(err, message) {
      if (err) {
        return res.send(err);
      }

      res.json(message);
    }
  );
};
