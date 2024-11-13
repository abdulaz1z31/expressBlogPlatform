import { User } from "../database/models/index.model.js";
import { loginUserService, registerUserService } from "../service/index.service.js";
import { ApiError, errorMessages, statusCodes } from "../utils/index.js";

export const registerUser = async (req, res, next) => {
  try {
    const result = await registerUserService(req.body)
    const {success, error} = result
    if (success) {
      return res.status(statusCodes.CREATED).send("created");
    } else {
      return res.status(statusCodes.CONFLICT).send({ message : error.message});
    }
  } catch (error) {
    console.log(error);
    next(new ApiError(error.statusCode, error.message));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password, otp } = req.body;
    const result = await loginUserService({ email, password, otp })
    const {success, error} = result;
    if (success) {
      const {token} = result;
      res.status(statusCodes.OK).json({ message: "User logged in", token });
    } else {
      res.status(statusCodes.BAD_REQUEST).send(error.message)
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const userProfileController = async (req, res, next) => {
  try {
    const payload = req.user;
    const currentUser = await User.findOne({ email: payload.email }).select({
      password: 0,
    });
    if (!currentUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.USER_NOT_FOUND);
    }
    return res.send(currentUser);
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      const user = new User(req.body);
      await user.save();
      return res.status(statusCodes.CREATED).send("created");
    }
    return res
      .status(statusCodes.CONFLICT)
      .send(errorMessages.EMAIL_ALREADY_EXISTS);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getAllUsers = async (req, res, next) => {
  try { 
    const searchQuery = req.query.search ? { name: new RegExp(req.query.search, 'i') } : {}; 
    const users = await User.find(searchQuery)
      .skip(req.pagination.skip)
      .limit(req.pagination.limit);

    const totalUsers = await User.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalUsers / req.pagination.limit);

    res.status(statusCodes.OK).send({
      users,
      currentPage: req.pagination.page,
      totalPages,
      totalUsers,
    });
  } catch (error) {
    next(new ApiError(error.statusCodes || 500, error.message || 'Server Error'));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(statusCodes.NOT_FOUND).send({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const { role } = req.user;
    const updateData = { ...req.body, role };

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(statusCodes.NOT_FOUND).send({ message: "user not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
//1
export async function forgetPassword(req, res, next) {
  try {
    const { email } = req.body;
    const userData = await User.findOne({email})
    if (!userData) {
      return res.status(404).send({
        messgae:"user not found"
      })
    }    

    const newPassword = v4()
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user:process.env.USER_EMAIL,
        pass:process.env.SMTP_PASSWORD
      }
    })
  
    await transporter.sendMail({
      from:process.env.USER_EMAIL,
      to: email,
      subject: "Yangi parol",
      html: `
      <h1>
        Siznign yangi parolingiz: ${newPassword}
      </h1>
      `
    })

    await User.updateOne(
      {_id: userData._id},
      {newPassword}
    )
    res.status(200).send(`password changed to : ${hashPassword}`)
  } catch (error) {
    next(error);
  }
}