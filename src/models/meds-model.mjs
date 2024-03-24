import promisePool from '../utils/database.mjs';

const listAllMedications = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Medications');
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const listAllMedicationsByUserId = async (userId) => {
  try {
    const sql = 'SELECT * FROM Medications WHERE user_id=?';
    const [rows] = await promisePool.query(sql, [userId]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findMedicationById = async (medicationId) => {
  try {
    const sql = 'SELECT * FROM Medications WHERE medication_id = ?';
    const [rows] = await promisePool.query(sql, [medicationId]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addMedication = async (medication, userId) => {
  const sql = `INSERT INTO Medications
               (user_id, name, dosage, frequency, start_date, end_date)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    userId,
    medication.name,
    medication.dosage,
    medication.frequency,
    medication.start_date,
    medication.end_date,
  ];
  try {
    const result = await promisePool.query(sql, params);
    return {medication_id: result[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const updateMedicationById = async (medicationId, medicationData) => {
  try {
    const params = [medicationData, medicationId];
    const sql = promisePool.format(
      `UPDATE Medications SET ?
       WHERE medication_id=?`,
      params,
    );
    const [result] = await promisePool.query(sql, params);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Medication not found'};
    }
    return {message: 'Medication updated', medication_id: medicationId};
  } catch (error) {
    console.error('updateMedicationById', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteMedicationById = async (medicationId) => {
  try {
    const sql = 'DELETE FROM Medications WHERE medication_id=?';
    const [result] = await promisePool.query(sql, [medicationId]);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Medication not found'};
    }
    return {message: 'Medication deleted', medication_id: medicationId};
  } catch (error) {
    console.error('deleteMedicationById', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  listAllMedications,
  listAllMedicationsByUserId,
  findMedicationById,
  addMedication,
  updateMedicationById,
  deleteMedicationById,
};
