import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Por favor, insira o seu nome.'],
		},
		email: {
			type: String,
			required: [true, 'Por favor, insira o seu email.'],
			unique: true,
			trime: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, 'Por favor, isnira a sua password.'],
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		// createdAt & updateAt
		timestamps: true,
	}
);

// 2. Adicionar o middleware "pre-save"
// Esta função será executada automaticamente ANTES de um documento ser guardado.

userSchema.pre('save', async function (next) {
  // Apenas encripta a password se ela foi modificada (ou é nova)
  if (!this.isModified('password')) {
    return next();
  }

  // Gera um "salt" - uma string aleatória para tornar o hash mais seguro
  const salt = await bcrypt.genSalt(10);
  // Substitui a password em texto simples pela password encriptada (hashed)
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;

