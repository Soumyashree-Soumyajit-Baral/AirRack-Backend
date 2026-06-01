import Warehouse from '../models/Warehouse.model.js';
import { sendSuccess, sendError } from '../utils/response.utils.js';

export const getAllWarehouses = async (req, res) => {
  const warehouses = await Warehouse.find().sort({ createdAt: 1 });
  return sendSuccess(res, { warehouses, total: warehouses.length });
};

export const createWarehouse = async (req, res) => {
  const warehouse = await Warehouse.create(req.body);
  return sendSuccess(res, { warehouse }, 201);
};

export const updateWarehouse = async (req, res) => {
  const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!warehouse) return sendError(res, 'Warehouse not found', 404);
  return sendSuccess(res, { warehouse });
};

export const deleteWarehouse = async (req, res) => {
  const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
  if (!warehouse) return sendError(res, 'Warehouse not found', 404);
  return sendSuccess(res, { message: 'Warehouse deleted successfully' });
};
