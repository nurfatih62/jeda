import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthTemplate } from "./auth-template";

const meta: Meta<typeof AuthTemplate> = {
  title: "📦componen/template/auth-template",
  component: AuthTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "login",
        "login-error",
        "register",
        "forgot-password",
        "forgot-password-success",
        "forgot-password-error",
        "otp-verification",
        "otp-error",
        "create-new-password",
        "category-selection",
        "terms",
        "privacy",
        "become-author",
      ],
      description: "Pilih varian tampilan auth",
    },
    backgroundColor: {
      control: "color",
      description: "Warna background luar halaman",
    },
    loginProps: { table: { disable: true } },
    registerProps: { table: { disable: true } },
    forgotPasswordProps: { table: { disable: true } },
    otpProps: { table: { disable: true } },
    createNewPasswordProps: { table: { disable: true } },
    categoryProps: { table: { disable: true } },
    termsProps: { table: { disable: true } },
    becomeAuthorProps: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof AuthTemplate>;

export const Login: Story = {
  args: { variant: "login", backgroundColor: "#1B4E46" },
};

export const LoginError: Story = {
  args: { variant: "login-error", backgroundColor: "#1B4E46" },
};

export const Register: Story = {
  args: { variant: "register", backgroundColor: "#1B4E46" },
};

export const ForgotPassword: Story = {
  args: { variant: "forgot-password", backgroundColor: "#1B4E46" },
};

export const ForgotPasswordSuccess: Story = {
  args: { variant: "forgot-password-success", backgroundColor: "#1B4E46" },
};

export const ForgotPasswordError: Story = {
  args: { variant: "forgot-password-error", backgroundColor: "#1B4E46" },
};

export const OtpVerification: Story = {
  args: { variant: "otp-verification", backgroundColor: "#1B4E46" },
};

export const OtpError: Story = {
  args: { variant: "otp-error", backgroundColor: "#1B4E46" },
};

export const CreateNewPassword: Story = {
  args: { variant: "create-new-password", backgroundColor: "#1B4E46" },
};

export const CategorySelection: Story = {
  args: { variant: "category-selection", backgroundColor: "#1B4E46" },
};

export const Terms: Story = {
  args: { variant: "terms", backgroundColor: "#1B4E46" },
};

export const Privacy: Story = {
  args: { variant: "privacy", backgroundColor: "#1B4E46" },
};

export const BecomeAuthor: Story = {
  args: { variant: "become-author", backgroundColor: "#1B4E46" },
};
