const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const saleService = require('../services/sales');

const listOne = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await saleService.findOne(id);
    if (sale.err) return res.status(sale.code).json({ message: sale.err });
    return res.status(StatusCodes.OK).json(sale);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const listAll = async (req, res) => {
  const { id, role } = req.user;
  const isUserOrSeller = role === 'customer' ? 'userId' : 'sellerId';
  try {
    const sales = await saleService.listAll(isUserOrSeller, id);
    return res.status(StatusCodes.OK).json(sales);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const updateStatus = async (req, res) => {
  try {
    const sale = await saleService.updateStatus(req.params, req.body);
    if (sale.err) return res.status(sale.code).json({ message: sale.err });
    return res.status(StatusCodes.OK).json(sale);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const create = async (req, res) => {
  try {
    const sale = await saleService.create(req.body);
    if (sale.err) return res.status(sale.code).json({ message: sale.err });
    return res.status(StatusCodes.CREATED).json(sale);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  listAll,
  listOne,
  create,
  updateStatus,
};