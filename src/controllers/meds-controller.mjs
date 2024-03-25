import {customError} from '../middlewares/error-handler.mjs';
import {
  findMedicationById,
  addMedication,
  deleteMedicationById,
  updateMedicationById,
  listAllMedicationsByUserId,
} from '../models/meds-model.mjs';

const getMedications = async (req, res, next) => {
  // return only logged in user's own medications
  const result = await listAllMedicationsByUserId(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    next(new Error(result.error));
  }
};

const getMedicationById = async (req, res, next) => {
  const medication = await findMedicationById(req.params.id, req.user.user_id);
  if (medication) {
    res.json(medication);
  } else {
    next(customError('Medication not found', 404));
  }
};

const postMedication = async (req, res, next) => {
  const userId = req.user.user_id;
  const result = await addMedication(req.body, userId);
  if (result.medication_id) {
    res.status(201).json({message: 'New medication added.', ...result});
  } else {
    next(new Error(result.error));
  }
};

const putMedication = async (req, res, next) => {
  const medicationId = req.params.id;
  const result = await updateMedicationById(medicationId, req.body);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.status(200).json({message: 'Medication updated', ...result});
};

const deleteMedication = async (req, res, next) => {
  const result = await deleteMedicationById(req.params.id, req.user.user_id);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.status(200).json({message: 'Medication deleted', ...result});
};

export {getMedications, getMedicationById, postMedication, putMedication, deleteMedication};
