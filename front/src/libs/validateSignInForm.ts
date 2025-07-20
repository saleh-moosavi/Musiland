export const validateSignInForm = (email: string, password: string) => {
  const newErrors: any = {};
  if (password === "") {
    newErrors.password = "Please Enter Your Password!";
  }
  if (email === "") {
    newErrors.email = "Please Enter Your email!";
  }
  return newErrors;
};
