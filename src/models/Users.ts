import bcryptjs, { hash } from 'bcryptjs';
import cep from 'cep-promise';
import { isMasked, mask, validate } from 'node-cpf';
import { DataTypes, Model } from 'sequelize';
import { CepObject } from '../@types';
import { sequelize } from '../config/database';

class Users extends Model {
  declare id: number;
  declare name: string;
  declare lastname: string;
  declare cpf: string;
  declare cep: number;
  declare email: string;
  declare password: string;
  declare password_hash: string;
  declare admin: boolean;

  async passwordValidator(password: string): Promise<boolean> {
    const valiadation = await bcryptjs.compare(password, this.password_hash);

    return valiadation;
  }
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /[a-zA-ZÀ-ÿ ]+$/,
          msg: 'Name field cannot have numbers or symbols',
        },
        len: {
          args: [3, 20],
          msg: 'Last name must be between 2 and 20 letters',
        },
        notNull: {
          msg: 'Name field cannot be null',
        },
      },
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /[a-zA-ZÀ-ÿ ]+$/,
          msg: 'Last name field cannot have numbers or symbols',
        },
        len: {
          args: [3, 20],
          msg: 'Last name must be between 2 and 20 letters',
        },
        notNull: {
          msg: 'Last name field cannot be null',
        },
      },
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        validateCpf: (cpf: string) => {
          if (!validate(cpf)) {
            throw new Error('This CPF is not valid');
          }
        },
        notNull: {
          msg: 'CPF field cannot be null',
        },
      },
      unique: true,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      validate: {
        validateCep: async (userCep: string) => {
          const cepObject: CepObject = await cep(userCep);
          if ('name' in cepObject && cepObject.name === 'CepPromiseError') {
            throw new Error('This CEP is not valid');
          }
        },
        notNull: {
          msg: 'CEP field cannot be null',
        },
      },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'This email is not valid',
        },
        notNull: {
          msg: 'Email field cannot be null',
        },
      },
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.VIRTUAL,
      defaultValue: '',
      validate: {
        validatePassword: (password: string) => {
          if (
            !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/.test(
              password,
            )
          ) {
            throw new Error(
              'The password must contain at least 8 and maximum 16 characters including at least 1 uppercase, 1 lowercase, one number and one special character.',
            );
          }
        },
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      unique: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      validate: {
        notNull: {
          msg: 'Admin field cannot be null',
        },
      },
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    sequelize,
  },
);

Users.addHook('beforeSave', async (user: Users) => {
  if (user.password) {
    user.password_hash = await hash(user.password, 8);
  }
});

Users.addHook('beforeSave', (user: Users) => {
  if (!isMasked(user.cpf)) {
    user.cpf = mask(user.cpf);
  }
});

export default Users;
