import Promotion from '../models/Promotion.js';

// GET /api/promotions
export const getPromotions = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    const promotions = await Promotion.find(filter).sort({ createdAt: -1 });
    res.json(promotions);
  } catch (error) {
    next(error);
  }
};

// POST /api/promotions
export const createPromotion = async (req, res, next) => {
  try {
    const promoData = { ...req.body };
    if (req.file) {
      promoData.image = `/uploads/${req.file.filename}`;
    }
    const promotion = await Promotion.create(promoData);
    res.status(201).json(promotion);
  } catch (error) {
    next(error);
  }
};

// PUT /api/promotions/:id
export const updatePromotion = async (req, res, next) => {
  try {
    const promoData = { ...req.body };
    if (req.file) {
      promoData.image = `/uploads/${req.file.filename}`;
    }
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, promoData, {
      new: true,
      runValidators: true,
    });
    if (!promotion) return res.status(404).json({ message: 'Promoción no encontrada' });
    res.json(promotion);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/promotions/:id
export const deletePromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) return res.status(404).json({ message: 'Promoción no encontrada' });
    res.json({ message: 'Promoción eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};
