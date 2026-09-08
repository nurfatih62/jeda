import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OtpVerificationModal } from "./otp-verification-modal";

const meta: Meta<typeof OtpVerificationModal> = {
  title: "📦componen/organism/auth/otp-verification-modal",
  component: OtpVerificationModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    length: { control: "number" },
    isError: { control: "boolean" },
    onVerify: { action: "verified" },
    onResend: { action: "resend clicked" },
    onClose: { action: "closed" },
  },
};

export default meta;
type Story = StoryObj<typeof OtpVerificationModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    email: "a*****@gmail.com",
    length: 4,
    isError: false,
  },
};

export const WithError: Story = {
  args: {
    isOpen: true,
    email: "a*****@gmail.com",
    length: 4,
    isError: true,
    errorMessage: "Kode salah, coba lagi",
  },
};