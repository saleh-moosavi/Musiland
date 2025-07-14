export const validateSignUpForm = (
  name: string,
  email: string,
  password: string
) => {
  const newErrors: any = {};
  if (name === "") {
    newErrors.name = "Please Enter Your Name!";
  }
  if (password === "") {
    newErrors.password = "Please Enter Your Password!";
  }
  if (email === "") {
    newErrors.email = "Please Enter Your email!";
  }
  return newErrors;
};
