import mongoose from 'mongoose';

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

const User = mongoose.model('User', userSchema);

export default User;

