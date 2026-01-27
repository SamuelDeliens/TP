import moment from "moment";


function boolValidator(value) {
    return value === true || value === false || value === 'true' || value === 'false' || value === 1 || value === 0 || value === '1' || value === '0';
}
function dateValidator(date) {
    const isISO = moment(date, moment.ISO_8601, true).isValid();
    const isRFC2822 = moment(date, 'ddd, DD MMM YYYY HH:mm:ss ZZ', true).isValid();
    return isISO || isRFC2822;
}


function validateFields(fields) {
    for (const field of fields) {
        if (field.type === Boolean) {
            if (!boolValidator(field.value)) {
                if (field.value === "" && field.default === undefined) {
                    return 'Invalid field ' + field.name;
                }
            }
            continue;
        }
        if (field.type === Date) {
            if (!dateValidator(field.value)) {
                if (field.value === "" && field.default === undefined) {
                    return 'Invalid field' + field.name;
                }
            }
            continue;
        }
        if (!field.value && field.default !== undefined) {
            continue;
        }
        if (!field.value) {
            return 'Missing field' + field.name;
        }

        if (typeof field.value !== field.type) {
            try {
                field.value = field.type(field.value);
            } catch (_e) {
                return 'Invalid field' + field.name;
            }
        }
        else if (field.type === Boolean) {
            if (field.value !== true && field.value !== false) {
                return 'Invalid field' + field.name;
            }
        }
        if (field.type === Number) {
            if (isNaN(field.value)) {
                return 'Invalid field' + field.name;
            }
        }

        if (field.constraint) {
            if (field.type === Number) {
                if (field.constraint.min !== undefined && field.value < field.constraint.min) {
                    return 'Invalid field ' + field.name + ' is inferior to ' + field.constraint.min;
                }
                if (field.constraint.max !== undefined  && field.value > field.constraint.max) {
                    return 'Invalid field ' + field.name + ' is superior to ' + field.constraint.max;
                }
            }
            if (field.type === String) {
                if (!field.constraint.includes(field.value)) {
                    return 'Invalid field ' + field.name
                }
            }
        }
    }
}


export { validateFields, dateValidator }