import { z } from 'zod';

import { createForm } from '@/components/form/form';

export const AuthPhoneSchema = createForm({
  phone: z
    .string()
    .transform((val) => val.replaceAll(/\D/g, ''))
    .refine((val) => val.length === 11 && val.startsWith('7'), 'Введите корректный номер'),
});

export const AuthCodeSchema = createForm({
  code: z.string().length(4, 'Введите 4 цифры'),
});

export const AuthPasswordSchema = createForm({
  confirmPassword: z.string().min(6, 'Повторите пароль'),
  newPassword: z
    .string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Пароль должен содержать латинские буквы верхнего и нижнего регистров и цифры',
    ),
});

export const AuthLoginSchema = createForm({
  password: z.string().min(1, 'Обязательное поле').max(255),
  username: z.string().min(1, 'Обязательное поле').max(255),
});

const nameRegex = z
  .string({ error: 'Обязательное поле' })
  .regex(/^[а-яёА-ЯЁ0-9\-]*$/, {
    error: "Поле может содержать только русские буквы, цифры и символ '-'",
  })
  .min(1, 'Обязательное поле');

const usernameRegex = z
  .string({ error: 'Обязательное поле' })
  .regex(/^[a-z0-9_.-]+$/, {
    error: 'Поле должно состоять из маленьких латинских букв, цифр или ".", "_", "-"',
  })
  .min(1, 'Обязательное поле');

const emailRegex = z.string({ error: 'Обязательное поле' }).email('Введите корректный email адрес');

const phoneRegex = z
  .string({ error: 'Обязательное поле' })
  .transform((val) => val.replaceAll(/\D/g, ''))
  .refine((val) => val.length === 11, 'Введите корректный номер');

export const EditEmployeeSchema = createForm({
  assignable: z.boolean().optional().default(false),
  email: emailRegex,
  firstName: nameRegex,
  isAdmin: z.boolean().optional().default(false),
  lastName: nameRegex,
  loanTypesInWork: z.array(z.string()),
  middleName: nameRegex,
  phoneNumber: phoneRegex,
  username: usernameRegex,
});
