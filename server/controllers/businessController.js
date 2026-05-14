import BusinessInfo from '../models/BusinessInfo.js';

// GET /api/business
export const getBusinessInfo = async (req, res, next) => {
  try {
    let info = await BusinessInfo.findOne();
    if (!info) {
      info = await BusinessInfo.create({});
    }
    res.json(info);
  } catch (error) {
    next(error);
  }
};

// PUT /api/business
export const updateBusinessInfo = async (req, res, next) => {
  try {
    let info = await BusinessInfo.findOne();
    if (!info) {
      info = await BusinessInfo.create(req.body);
    } else {
      Object.assign(info, req.body);
      await info.save();
    }
    res.json(info);
  } catch (error) {
    next(error);
  }
};
