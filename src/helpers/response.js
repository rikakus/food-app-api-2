module.exports = {
  success: (res, data, status, message, pagination) => {
    if (pagination) {
      return res.json({
        code: 200,
        status,
        data,
        message,
        pagination,
      });
    }
    res.json({
      code: 200,
      status,
      data,
      message,
    });
  },
  failed: (res, error, status, message) => {
    res.json({
      code: 404,
      status,
      error,
      data: null,
      message,
    });
  },
  successWithToken: (res, token, status, message) => {
    res.json({
      status,
      token,
      message,
    });
  },
};
