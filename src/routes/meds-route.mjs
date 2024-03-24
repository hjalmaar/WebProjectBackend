import express from 'express';
import {body, param} from 'express-validator';
import {
  getMedications,
  getMedicationById,
  postMedication,
  putMedication,
  deleteMedication,
} from '../controllers/meds-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';

const medicationRouter = express.Router();

medicationRouter
  .route('/')
  .get(authenticateToken, getMedications)
  .post(
    authenticateToken,
    body('name').notEmpty().withMessage('Name is required'),
    body('dosage').optional().isString(),
    body('frequency').optional().isString(),
    body('start_date').optional().isDate(),
    body('end_date').optional().isDate(),
    validationErrorHandler,
    postMedication,
  );

medicationRouter
  .route('/:id')
  .get(
    authenticateToken,
    param('id').isInt().withMessage('ID must be an integer'),
    validationErrorHandler,
    getMedicationById,
  )
  .put(
    authenticateToken,
    param('id').isInt().withMessage('ID must be an integer'),
    body('name').optional().isString(),
    body('dosage').optional().isString(),
    body('frequency').optional().isString(),
    body('start_date').optional().isDate(),
    body('end_date').optional().isDate(),
    // Make sure user_id cannot be updated through this endpoint
    body('user_id').not().exists().withMessage('Updating user_id is not allowed'),
    validationErrorHandler,
    putMedication,
  )
  .delete(
    authenticateToken,
    param('id').isInt().withMessage('ID must be an integer'),
    validationErrorHandler,
    deleteMedication,
  );

export default medicationRouter;

