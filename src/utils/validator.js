export const userFormValidator = (target, reg, helpText) => {
    const { value } = target;
    if (!value) {
        return { status: false, message: 'Заполните поле' };
    }

    const match = new RegExp(reg).test(value);

    if (!match) {
        return { status: false, message: `${helpText}` };
    }
    return { status: true };
};
