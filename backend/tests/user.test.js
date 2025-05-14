const sinon = require("sinon");
const userModel = require("../User-service/Models/User");
const jwt = require("jsonwebtoken");
const { expect } = require("chai");
const bcrypt = require("bcrypt");
const {
  loginUser,
  createToken,
  registerUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../User-service/Controller/UserController");
const { default: mongoose } = require("mongoose");
describe("FLIGHT RESERVATION CONTROLLER UNIT TESTS", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("loginUser() returns 200", async () => {
    const id = new mongoose.Types.ObjectId();
    const req = {
      body: { email: "test1@gmail.com", password: "abc123" },
    };
    const user = {
      _id: id.toString(),
      email: "test1@gmail.com",
    };
    const fakeToken = "44qdigf";

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(userModel, "findOne").resolves(user);
    const jwtStub = sinon.stub(jwt, "sign").returns(fakeToken);
    await createToken(user._id);

    sinon.stub(bcrypt, "compare").resolves(true);

    await loginUser(req, res);

    console.log(res.status.args);
    console.log(res.json.args);
    expect(
      jwtStub.calledWithMatch(
        sinon.match.has("id", id.toString()),
        sinon.match.string
      )
    ).to.be.true;

    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: true,
        message: "Welcome Back",
        token: fakeToken,
      })
    ).to.be.true;
  });
  it("loginUser() returns 404 valid credentials", async () => {
    const req = {
      body: { email: "test1@gmail.com", password: "abc123" },
    };
    const user = {
      _id: "123",
      email: "test1@gmail.com",
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(userModel, "findOne").resolves(user);

    sinon.stub(bcrypt, "compare").resolves(false);
    await loginUser(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: false,
        message: "Invalid credentials",
      })
    ).to.be.true;
  });
  it("loginUser() returns 404 user not found", async () => {
    const req = {
      body: { email: "test1@gmail.com", password: "abc123" },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(userModel, "findOne").resolves(null);

    await loginUser(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: false,
        message: "User doesn't exist",
      })
    ).to.be.true;
  });
  it("registerUser() returns 400 user already exists", async () => {
    const req = {
      body: {
        email: "abc123@gmail.com",
        password: "",
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        phone: "",
        address: "",
        city: "",
        country: "",
      },
    };

    const user = {
      email: "abc123@gmail.com",
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const findOneStub = sinon.stub(userModel, "findOne").resolves(user);

    await registerUser(req, res); // [ [ { success: false, message: 'User already exists' } ] ]

    expect(findOneStub.calledWith({ email: req.body.email })).to.be.true; // ✅
    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: false,
        message: "User already exists",
      })
    ).to.be.true;
  });
  it("registerUser() returns 400 Please enter a valid email", async () => {
    const req = {
      body: {
        email: "abcgmail.com",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const findOneStub = sinon.stub(userModel, "findOne").resolves(null);

    await registerUser(req, res);

    expect(findOneStub.calledWith({ email: req.body.email })).to.be.true; // ✅
    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: false,
        message: "Please enter a valid email",
      })
    ).to.be.true;
  });
  it("registerUser() returns 400 Please enter a strong password", async () => {
    const req = {
      body: {
        email: "abc@gmail.com",
        password: "1547a",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const findOneStub = sinon.stub(userModel, "findOne").resolves(null);

    await registerUser(req, res);
    expect(findOneStub.calledWith({ email: req.body.email })).to.be.true; // ✅
    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: false,
        message: "Please enter a strong password",
      })
    ).to.be.true;
  });
  it("signup() returns 200", async () => {
    const req = {
      body: { email: "test1@gmail.com", password: "abc12347" },
    };
    const user = {
      _id: "152",
    };
    const fakeToken = "44qdigf";
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(userModel, "findOne").resolves(null);
    sinon.stub(userModel.prototype, "save").resolves(user);
    const jwtStub = sinon.stub(jwt, "sign").returns(fakeToken);
    await createToken(user._id);
    await registerUser(req, res);

    console.log(res.status.args);
    console.log(res.json.args);

    expect(jwtStub.calledOnceWith({ id: "152" }, sinon.match.string)).to.be
      .true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: true,
        message: "Account Created",
        token: fakeToken,
      })
    ).to.be.true;
  });

  it("getUser() returns 200", async () => {
    const req = {
      params: { id: "152" },
    };
    const user = {
      _id: "152",
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const findStub = sinon.stub(userModel, "findById").resolves(user);
    7;
    await getUser(req, res);
    expect(findStub.calledWith("152")).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ success: true, user })).to.be.true;
    findStub.restore();
  });

  it("getUser() returns 404 user not found", async () => {
    const req = {
      params: { id: "152" },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const findStub = sinon.stub(userModel, "findById").resolves(null);
    await getUser(req, res);
    expect(findStub.calledWith("152")).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWithMatch({ success: false, message: "User not found" })
    ).to.be.true;
    findStub.restore();
  });
  it("updateUser() returns 200 user updated", async () => {
    const req = {
      params: { id: "152" },
      body: { email: "abc@gmail.com" },
    };

    const updated = {
      _id: "152",
      email: "abc@gmail.com",
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Stub correct avec `new: true`
    const findByIdAndUpdateStub = sinon
      .stub(userModel, "findByIdAndUpdate")
      .resolves(updated);

    await updateUser(req, res);

    // ❗ Il manquait `.to.be.true`
    expect(
      findByIdAndUpdateStub.calledWith(
        "152",
        { email: "abc@gmail.com" },
        { new: true }
      )
    ).to.be.true;

    // ✅ OK
    expect(res.status.calledWith(200)).to.be.true;

    // ❗ Correction ici : `calledWithMatch` prend UN objet
    expect(
      res.json.calledWithMatch({
        success: true,
        updatedUser: updated,
      })
    ).to.be.true;

    // Nettoyage
    findByIdAndUpdateStub.restore();
  });

  it("updateUser() returns 404 user not found", async () => {
    const req = {
      params: { id: "152" },
      body: {
        email: "abc@gmail.com",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const findByIdAndUpdateStub = sinon
      .stub(userModel, "findByIdAndUpdate")
      .resolves(null);
    await updateUser(req, res);

    expect(findByIdAndUpdateStub.calledWith("152", req.body, { new: true }));
    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWithMatch({ success: false, message: "User not found" })
    ).to.be.true;
  });
  it("deleteUser() returns 200", async () => {
    const id = new mongoose.Types.ObjectId();
    const req = {
      body: {
        id: id.toString(),
      },
    };
    const user = {
      _id: "125",
      fullname: "abcd",
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findByIdStub = sinon
      .stub(userModel, "findByIdAndDelete")
      .resolves(user);
    await deleteUser(req, res);
    console.log(res.status.args);
    console.log(res.json.args);

    expect(findByIdStub.calledWith(id.toString())).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: true,
        message: "User deleted successfully",
      })
    ).to.be.true;
  });
  it("deleteUser() returns 404", async () => {
    const id = new mongoose.Types.ObjectId();
    const req = {
      body: {
        id: id.toString(),
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findByIdStub = sinon
      .stub(userModel, "findByIdAndDelete")
      .resolves(null);
    await deleteUser(req, res);
    console.log(res.status.args);
    console.log(res.json.args);

    expect(findByIdStub.calledWith(id.toString())).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWithMatch({ success: false, message: "User not found" })
    ).to.be.true;
  });
  it("getAllUsers() returns 200", async () => {
    const req = {};
    const users = [{ _id: "125" }, { _id: "147" }];
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findStub = sinon.stub(userModel, "find").resolves(users);
    await getAllUsers(req, res);

    expect(findStub.called).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ success: true, users })).to.be.true;
  });
  it("getAllUsers() returns 404", async () => {
    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findStub = sinon.stub(userModel, "find").resolves(null);
    await getAllUsers(req, res);

    expect(findStub.called).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWithMatch({ success: false, message: "No users found" })
    ).to.be.true;
  });
});
