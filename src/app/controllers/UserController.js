import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      last_name: Yup.string().required(),
      nick_name: Yup.string().required(),
      lanes: Yup.string().required(),
      champion_pool: Yup.string().required(),
      elo: Yup.string().required(),
      date_birth: Yup.string().required(),
      cell_phone: Yup.string().required(),
      genre: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const {
      id,
      name,
      last_name,
      nick_name,
      lanes,
      champion_pool,
      elo,
      date_birth,
      cell_phone,
      genre,
      email,
      representative,
    } = await User.create(req.body);

    return res.json({
      id,
      name,
      last_name,
      nick_name,
      lanes,
      champion_pool,
      elo,
      date_birth,
      cell_phone,
      genre,
      email,
      representative,
    });
  }

  // Edicao do usuario
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      last_name: Yup.string(),
      nick_name: Yup.string(),
      lanes: Yup.string(),
      champion_pool: Yup.string(),
      elo: Yup.string(),
      date_birth: Yup.string(),
      cell_phone: Yup.string(),
      genre: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id,
      name,
      last_name,
      nick_name,
      lanes,
      champion_pool,
      elo,
      date_birth,
      cell_phone,
      genre,
      representative,
    } = await user.update(req.body);
    return res.json({
      id,
      name,
      last_name,
      nick_name,
      lanes,
      champion_pool,
      elo,
      date_birth,
      cell_phone,
      genre,
      email,
      representative,
    });
  }
}
export default new UserController();
