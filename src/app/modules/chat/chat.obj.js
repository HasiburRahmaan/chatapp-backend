let chat = {
  name: {
    type: String,
  },
  isGroupChat: {
    type: Boolean,
    default: false,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  latestMessage: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  },
  groupAdmins: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  chatAvatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dq7l8216n/image/upload/v1610225195/default-avatar.jpg",
  },
};
