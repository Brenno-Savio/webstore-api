import { Op } from 'sequelize';

type ParamsObj = {
  where?: object;
};

const filterSystem = (filters: string[]) => {
  console.log(filters);

  const paramsObj: ParamsObj = {};
  const filterArray = [];

  const operator = filters[0];
  filters.shift();
  console.log(operator);

  console.log(filters);

  for (const filter of filters) {
    let query: Array<any> = filter.split(':');
    console.log(query);

    if (query[0] === 'admin') {
      query[1] === 'true' ? (query[1] = true) : (query[1] = false);
    }

    if (operator === 'equal') {
      if (typeof paramsObj.where !== 'undefined') {
        paramsObj.where = {
          ...paramsObj.where,
          [query[0]]: {
            [Op.eq]: query[1],
          },
        };
      } else {
        paramsObj.where = {
          [query[0]]: {
            [Op.eq]: query[1],
          },
        };
      }
    }
    if (operator === 'not') {
      if (typeof paramsObj.where !== 'undefined') {
        paramsObj.where = {
          ...paramsObj.where,
          [query[0]]: {
            [Op.ne]: query[1],
          },
        };
      } else {
        paramsObj.where = {
          [query[0]]: {
            [Op.ne]: query[1],
          },
        };
      }
    }
    if (operator === 'or') {
      filterArray.push({
        [query[0]]: query[1],
      });
      paramsObj.where = {
        [Op.or]: filterArray,
      };
    }
    if (operator === 'and') {
      filterArray.push({
        [query[0]]: query[1],
      });
      paramsObj.where = {
        [Op.and]: filterArray,
      };
    }
  }
  console.log(paramsObj);

  return paramsObj.where;
};

export default filterSystem;
