import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta = {
  title: "Components/Button/Big Buttons",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "ghost"],
      description: "Gaya tampilan tombol",
    },

    colorState: {
      control: "select",
      options: ["default", "success", "danger"],
      description: "State warna tombol",
    },

    arrow: {
    control: "select",
    options: ["none", "left", "right"],
    description: "Panah pada tombol",
    },  

    loading: {
    control: "boolean",
    description: "Menampilkan loading pada tombol",
    },

    children: {
      control: "text",
      description: "Teks di dalam tombol",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Custom: Story = {
  args: {
    children: "Click Me!",
    variant: "primary",
    colorState: "default",
    arrow: "none",
    loading: false,
  },
};

export const AllButtons: Story = {
  args: {
    children: "Click Me!",
  },

  render: () => (
    <div className="flex flex-col gap-8">
      {/* DEFAULT */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">DEFAULT</h3>

        <div className="flex items-center gap-4">
          <Button variant="primary">Click Me!</Button>
          <Button variant="outline">Click Me!</Button>
          <Button variant="ghost">Click Me!</Button>
        </div>
      </div>

      {/* DEFAULT + ARROW */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">DEFAULT + ARROW</h3>

        <div className="flex items-center gap-4">
          <Button variant="primary" arrow="left">Click Me!</Button>
          <Button variant="outline" arrow="left">Click Me!</Button>
          <Button variant="ghost" arrow="left">Click Me!</Button>
          <Button variant="primary" arrow="right">Click Me!</Button>
          <Button variant="outline" arrow="right">Click Me!</Button>
          <Button variant="ghost" arrow="right">Click Me!</Button>
        </div>
      </div>

      {/* SUCCESS */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">SUCCESS</h3>

        <div className="flex items-center gap-4">
          <Button variant="primary" colorState="success">Click Me!</Button>
          <Button variant="outline" colorState="success">Click Me!</Button>
          <Button variant="ghost" colorState="success">Click Me!</Button>
        </div>
      </div>

      {/* SUCCESS + ARROW */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">SUCCESS + ARROW</h3>

        <div className="flex items-center gap-4">
          <Button variant="primary" colorState="success" arrow="left">Click Me!</Button>
          <Button variant="outline" colorState="success" arrow="left">Click Me!</Button>
          <Button variant="ghost" colorState="success" arrow="left">Click Me!</Button>
          <Button variant="primary" colorState="success" arrow="right">Click Me!</Button>
          <Button variant="outline" colorState="success" arrow="right">Click Me!</Button>
          <Button variant="ghost" colorState="success" arrow="right">Click Me!</Button>
        </div>
      </div>

      {/* DANGER */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">DANGER</h3>

        <div className="flex items-center gap-4">
          <Button variant="primary" colorState="danger">Click Me!</Button>
          <Button variant="outline" colorState="danger">Click Me!</Button>
          <Button variant="ghost" colorState="danger">Click Me!</Button>
        </div>
      </div>

      {/* DANGER + ARROW */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">DANGER + ARROW</h3>

        <div className="flex items-center gap-4">
          <Button variant="primary" colorState="danger" arrow="left">Click Me!</Button>
          <Button variant="outline" colorState="danger" arrow="left">Click Me!</Button>
          <Button variant="ghost" colorState="danger" arrow="left">Click Me!</Button>
          <Button variant="primary" colorState="danger" arrow="right">Click Me!</Button>
          <Button variant="outline" colorState="danger" arrow="right">Click Me!</Button>
          <Button variant="ghost" colorState="danger" arrow="right">Click Me!</Button>
        </div>
      </div>
      {/* LOADING */}
        <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold"> LOADING </h3>

        <div className="flex items-center gap-4">
            <Button variant="primary" loading > Click Me! </Button>
            <Button variant="outline" loading > Click Me! </Button>
            <Button variant="ghost" loading > Click Me! </Button>
        </div>
        </div>
    </div>
  ),
};
