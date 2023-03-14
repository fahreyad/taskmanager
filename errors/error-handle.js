class CustomErrorAPI extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    //this.msg = message;
  }
}

const CustomError = (msg, status) => {
  return new CustomErrorAPI(msg, status);
};
module.exports = { CustomError, CustomErrorAPI };
