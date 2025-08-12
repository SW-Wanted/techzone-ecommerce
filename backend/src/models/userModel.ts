import mongoose, { Model} from 'mongoose';
import bcrypt from 'bcryptjs';

// Criar uma interface que descreve as propriedades de um utilizador.
interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

// Criar uma interface que descreve os métodos customizados do nosso schema.
interface IUserMethods {
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Criar um tipo para o nosso Model que combina a estrutura (IUser) e os métodos (IUserMethods).
type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// Adicionar o método 'matchPassword' à interface de métodos
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware 'pre-save' para encriptar a password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Informar que ele usa o tipo 'UserModel'.
const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;