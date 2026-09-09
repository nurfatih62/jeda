export const adminApi = {
  async getStats() {
    const res = await fetch("/api/admin/stats");
    if (!res.ok) throw new Error("Gagal memuat statistik admin");
    return res.json();
  },
  async listUsers(qs: string) {
    const res = await fetch(`/api/admin/users?${qs}`);
    if (!res.ok) throw new Error("Gagal memuat pengguna");
    return res.json();
  },
};
