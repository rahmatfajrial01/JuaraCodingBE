class Error404 extends Error {
    constructor(message) {
      super(message);
      this.name = "Error404";
    }
  }
  
  class Error403 extends Error {
    constructor(message) {
      super(message);
      this.name = "Error403";
    }
  }
  
  class Error401 extends Error {
    constructor(message) {
      super(message);
      this.name = "Error401";
    }
  }
  
  class Error400 extends Error {
    constructor(message) {
      super(message);
      this.name = "Error400";
    }
  }
  
  const exceptionHandler = (error, res) => {
    switch (error.name) {
      case "CastError":
        return res.status(400).json({ detail: "Casting id is error" });
      case "Error404":
        return res.status(404).json({ detail: "Resource not found" });
      case "Error400":
        return res.status(400).json({ detail: "Invalid data request" });
      case "Error401":
        return res.status(404).json({ detail: "Authentication required" });
      case "Error403":
        return res
          .status(404)
          .json({ detail: "Access denied (forbidden resource)" });
      case "ValidationError":
        return res.status(404).json({ detail: "Invalid data request" });
      default:
        return res.status(500).json({ detail: "Server error" });
    }
  };
  
  module.exports = {
    Error400,
    Error401,
    Error403,
    Error404,
    exceptionHandler,
  };
  