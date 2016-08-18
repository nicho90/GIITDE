/**
 * Trash bin model
 * @type {Object}
 */
module.exports = {
    "properties": {
        "description": {
            "type": "string",
            "minLength": 2
        },
        "filling_height": {
            "type": "number",
            "greaterThan": 6
        },
        "capacity": {
            "type": "number",
            "greaterThan": 6
        },
        "lat": {
            "type": "number",
            "minimum": -90,
            "maximum": 90
        },
        "lng": {
            "type": "number",
            "minimum": -180,
            "maximum": 180
        }
    },
    "required": [
        "description",
        "filling_height",
        "capacity",
        "lat",
        "lng"
    ]
};
