import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthorDraftWritingCard } from "./author-draft-writing-card";

const meta = {
  title: "📦componen/molecule/author-draft-writing-card",
  component: AuthorDraftWritingCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["draft", "empty"],
      description: "Pilih varian kartu: draft (ada artikel) atau empty (belum ada tulisan)",
      table: {
        category: "Variations",
      },
    },
    badgeLabel: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    lastEdited: { control: "text" },
    progressPercentage: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    buttonText: { control: "text" },
    imageUrl: { control: "text" },
    onResumeWriting: { action: "onResumeWriting" },
  },
} satisfies Meta<typeof AuthorDraftWritingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Story Interaktif: Coba ubah `variant` di Controls maka teks akan berubah otomatis */
export const Playground: Story = {
  args: {
    variant: "draft",
    badgeLabel: "Draft",
    lastEdited: "Terakhir diedit 2 jam lalu",
    progressPercentage: 60,
  },
  render: ({ variant, title, description, buttonText, imageUrl, ...args }) => {
    const isEmpty = variant === "empty";

    // Ubah teks & gambar secara otomatis berdasarkan varian yang dipilih di panel Controls
    const currentTitle =
      title ||
      (isEmpty
        ? "Belum ada tulisan? Yuk mulai."
        : "Kenapa Aku Berhenti Menulis Diary");

    const currentDescription =
      description ||
      (isEmpty
        ? "Artikel pertamamu nggak harus sempurna. Cukup mulai, dan JEDA akan menyimpan progresmu secara otomatis."
        : "Ada banyak alasan kenapa orang berhenti menulis diary, salah satunya karena merasa tidak ada yang membaca...");

    const currentButtonText =
      buttonText || (isEmpty ? "Tulis artikel pertama" : "Lanjutkan menulis");

    const currentImageUrl =
      imageUrl !== undefined
        ? imageUrl
        : isEmpty
        ? ""
        : "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80";

    return (
      <AuthorDraftWritingCard
        {...args}
        variant={variant}
        title={currentTitle}
        description={currentDescription}
        buttonText={currentButtonText}
        imageUrl={currentImageUrl}
      />
    );
  },
};

/** Varian 1: Ada Artikel / Draft */
export const Draft: Story = {
  args: {
    variant: "draft",
    badgeLabel: "Draft",
    title: "Kenapa Aku Berhenti Menulis Diary",
    description:
      "Ada banyak alasan kenapa orang berhenti menulis diary, salah satunya karena merasa tidak ada yang membaca...",
    lastEdited: "Terakhir diedit 2 jam lalu",
    progressPercentage: 60,
    buttonText: "Lanjutkan menulis",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80",
  },
};

/** Varian 2: Belum Ada Tulisan / Empty State */
export const Empty: Story = {
  args: {
    variant: "empty",
    title: "Belum ada tulisan? Yuk mulai.",
    description:
      "Artikel pertamamu nggak harus sempurna. Cukup mulai, dan JEDA akan menyimpan progresmu secara otomatis.",
    buttonText: "Tulis artikel pertama",
    imageUrl: "",
  },
};