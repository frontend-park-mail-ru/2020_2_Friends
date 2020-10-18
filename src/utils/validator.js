export const userFormValidator = (target, reg) => {
    const { value } = target;
    if (!value) {
        return { status: false, message: 'Заполните поле' };
    }

    const match = new RegExp(reg).test(value);

    if (!match) {
        return { status: false };
    }
    return { status: true };
};
