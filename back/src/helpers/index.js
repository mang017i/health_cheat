exports.successResponse = (req, res, data, successMessage, code = 200) => {
  res.send({
    code,
    data,
    // accessToken: data.accessToken,
    successMessage,
    success: true,
  });
};

exports.errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500
) =>
  res.status(code).send({
    code,
    errorMessage,
    data: null,
    success: false,
  });

exports.successLoginResponse = (req, res, token, successMessage, code = 200) => {
  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  res.send({
    code,
    accessToken: token,
    successMessage,
    success: true,
  });
};
