/**
 * Validating user's input data.
 * Using regular expressions to make sure the string is valid.
 *
 * @param {object} target - User's input data.
 * @param {string} reg - Regular expression for a check.
 *
 * @return {object} - Js object with the result of validating.
 */
export const userFormValidator = (target, reg) => {
    const { value } = target;
    console.log(value);
    if (!value) {
        return { status: false, message: 'Заполните поле' };
    }

    const match = new RegExp(reg).test(value);

    if (!match) {
        return { status: false };
    }
    return { status: true };
};
