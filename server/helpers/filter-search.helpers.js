import { Op } from 'sequelize';

export const postingsFiltering = (params) => {
    const { startDate, endDate, employerId, category } = params;

    const filter = {
        where: {
            createdAt: {
                [Op.gte]: startDate ? startDate : '1900-01-01',
                [Op.lte]: endDate ? endDate : '9999-12-31'
            }
        }
    };

    if (employerId) {
        filter.where.employer_id = employerId
    }

    if (category) {
        filter.where.category = category
    }

    console.log(filter);
    return filter;
};