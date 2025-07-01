const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/User");

module.exports.register = asyncHandler(async (req, res, next) => {
  const { names, email, username, password, role } = req.body;

  const userWithEmail = await User.findOne({ email });
  if (userWithEmail) {
    return next(
      new ErrorResponse(`User with email ${email} already exists`, 400)
    );
  }

  const userWithUsername = await User.findOne({ username });
  if (userWithUsername) {
    return next(
      new ErrorResponse(`User with username ${username} already exists`, 400)
    );
  }

  if (!["student", "admin", "trainer"].includes(role)) {
    return next(new ErrorResponse("Invalid role specified", 400));
  }

  let user = await User.create({
    names,
    email,
    username,
    password,
    role
  });

  if (user) {
    return res.status(201).json({
      success: true,
      data: user,
    });
  } else {
    return next(new ErrorResponse("Error creating user", 500));
  }
});


// module.exports.activity = asyncHandler(async (req, res, next) => {
//   const { names, email, username, password, role } = req.body;

//   const userWithEmail = await User.findOne({ email });
//   if (userWithEmail) {
//     return next(
//       new ErrorResponse(`User with email ${email} already exists`, 400)
//     );
//   }

//   const userWithUsername = await User.findOne({ username });
//   if (userWithUsername) {
//     return next(
//       new ErrorResponse(`User with username ${username} already exists`, 400)
//     );
//   }

//   if (!["student", "admin", "trainer"].includes(role)) {
//     return next(new ErrorResponse("Invalid role specified", 400));
//   }

//   let user = await User.create({
//     names,
//     email,
//     username,
//     password,
//     role
//   });

//   if (user) {
//     return res.status(201).json({
//       success: true,
//       data: user,
//     });
//   } else {
//     return next(new ErrorResponse("Error creating user", 500));
//   }
// });

// // join request
// module.exports.joinRequest = asyncHandler(async (req, res, next) => {
//   const { activityId, studentId } = req.body;

//   const joinRequest = await JoinRequest.create({
//     activityId,
//     studentId
//   });

//   if (joinRequest) {
//     return res.status(201).json({
//       success: true,
//       data: joinRequest,
//     });
//   } else {
//     return next(new ErrorResponse("Error creating join request", 500));
//   }
// });
// // withdraw request
// module.exports.withdrawRequest = asyncHandler(async (req, res, next) => {
//   const { enrollmentId, activityId, studentId } = req.body;

//   const withdrawRequest = await WithdrawRequest.create({
//     enrollmentId,
//     activityId,
//     studentId
//   });

//   if (withdrawRequest) {
//     return res.status(201).json({
//       success: true,
//       data: withdrawRequest,
//     });
//   } else {
//     return next(new ErrorResponse("Error creating withdraw request", 500));
//   }
// });

// // enrollment
// module.exports.enrollment = asyncHandler(async (req, res, next) => {
//   const { activityId, studentId } = req.body;

//   const enrollment = await Enrollment.create({
//     activityId,
//     studentId
//   });

//   if (enrollment) {
//     return res.status(201).json({
//       success: true,
//       data: enrollment,
//     });
//   } else {
//     return next(new ErrorResponse("Error creating enrollment", 500));
//   }
// });


module.exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new ErrorResponse(`User with email ${email} does not exist`, 400)
    );
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  const token = user.getSignedJwtToken();
  return res.status(200).json({
    success: true,
    token,
    data: user,
  });
});
