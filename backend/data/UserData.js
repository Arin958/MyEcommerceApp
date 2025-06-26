const UserData = [
  {
    email: "john.doe@example.com",
    password: "john1234",
    name: "John Doe",
    role: "user",
    lastLogin: "2025-06-21T08:30:00.000Z",
    isVerified: true,
  },
  {
    email: "jane.admin@example.com",
    password: "admin1234",
    name: "Jane Admin",
    role: "admin",
    lastLogin: "2025-06-20T12:00:00.000Z",
    isVerified: true,
  },
  {
    email: "mike.user@example.com",
    password: "mikepass",
    name: "Mike User",
    role: "user",
    lastLogin: "2025-06-18T16:45:00.000Z",
    isVerified: false,
    verificationToken: "abc123xyz",
    verificationTokenExpires: "2025-06-30T23:59:59.000Z",
  },
  {
    email: "sara.verified@example.com",
    password: "sarapass",
    name: "Sara Verified",
    role: "user",
    lastLogin: "2025-06-19T10:15:00.000Z",
    isVerified: true,
  },
  {
    email: "tom.reset@example.com",
    password: "tomreset",
    name: "Tom Reset",
    role: "user",
    lastLogin: "2025-06-15T09:00:00.000Z",
    isVerified: true,
    resetPasswordToken: "resetToken123",
    resetPasswordExpire: "2025-06-25T23:59:59.000Z",
  },
];

module.exports = UserData;