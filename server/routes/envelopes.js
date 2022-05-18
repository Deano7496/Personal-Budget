const express = require("express");
const router = express.Router();

const {
  getEnvelopes,
  addEnvelope,
  getEnvelopeById,
  deleteEnvelope,
	updateEnvelope,
	transfer,
} = require("../controllers/envelopes");

/**
 * @swagger
 * /api/v1/envelopes:
 *    get:
 *      summary: Get all envelopes
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      responses:
 *        "200":
 *          description: Returns a list of all envelopes
 *
 */
router.get("/", getEnvelopes);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *    get:
 *      summary: Get an envelope by ID
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns a an envelope along with its data
 *        "404":
 *          description: User not found
 *        "500":
 *          description: Internal server error
 */
router.get("/:id", getEnvelopeById);

/**
 * @swagger
 * /api/v1/envelopes:
 *    post:
 *      summary: Creates a new envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: Scuba lessons
 *                budget: 300
 *      responses:
 *        "201":
 *          description: Returns created envelope
 *        "500":
 *          description: Internal server error
 */
router.post("/", addEnvelope);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *    put:
 *      summary: Updates an existing envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope ID
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: Scuba lessons
 *                budget: 300
 *      responses:
 *        "201":
 *          description: Returns updated envelope
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 */
router.put("/:id", updateEnvelope);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *    delete:
 *      summary: Deletes an individual envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Envelope ID to delete
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: Envelope deleted
 *        "500":
 *          description: Internal server error
 *        "404":
 *          description: Envelope not found
 */
router.delete("/:id", deleteEnvelope);

/**
 * @swagger
 * /api/v1/envelopes/{fromId}/transfer/{toId}:
 *    post:
 *      summary: Transfers budget from one envelope to another
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
*      parameters:
 *        - in: path
 *          name: fromId
 *          description: Origin envelope id
 *          type: integer
 *          required: true
 *          example: 1
 *        - in: path
 *          name: toId
 *          description: Destination envelope id
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Amount of money to transfer
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                amount:
 *                  type: integer
 *              example:
 *                amount: 300
 *      responses:
 *        "201":
 *          description: Returns created envelope
 *        "400":
 *          description: Bad request
 *        "500":
 *          description: Internal server error
 */
router.post('/:fromId/transfer/:toId', transfer);

module.exports = router;
