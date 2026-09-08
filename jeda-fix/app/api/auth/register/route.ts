import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, displayName } = await req.json();

    // ==============================
    // VALIDASI INPUT
    // ==============================

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Regex email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Masukkan email yang valid" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password minimal 8 karakter" },
        { status: 400 }
      );
    }

    // ==============================
    // ENV
    // ==============================

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
      console.error("NEXT_PUBLIC_SUPABASE_URL tidak ditemukan");

      return NextResponse.json(
        { error: "Supabase URL belum dikonfigurasi" },
        { status: 500 }
      );
    }

    if (!serviceRoleKey) {
      console.error("SUPABASE_SERVICE_ROLE_KEY tidak ditemukan");

      return NextResponse.json(
        { error: "Supabase Service Role Key belum dikonfigurasi" },
        { status: 500 }
      );
    }

    // ==============================
    // SUPABASE ADMIN
    // ==============================

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // ==============================
    // CREATE USER
    // ==============================

    const { data, error } =
      await supabaseAdmin.auth.admin.createUser({
        email: normalizedEmail,
        password,
        email_confirm: true,

        user_metadata: {
          display_name:
            displayName || normalizedEmail.split("@")[0],

          username:
            normalizedEmail.split("@")[0],
        },
      });

    // ==============================
    // HANDLE ERROR
    // ==============================

    if (error) {
      console.error("Supabase register error:", error);

      const msg = error.message.toLowerCase();

      if (
        msg.includes("already") ||
        msg.includes("exists") ||
        msg.includes("duplicate") ||
        msg.includes("unique")
      ) {
        return NextResponse.json(
          {
            error: "Email sudah terdaftar. Coba login",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    // ==============================
    // SUCCESS
    // ==============================

    return NextResponse.json({
      success: true,
      userId: data.user?.id,
    });
  } catch (error) {
    console.error("Register API error:", error);

    return NextResponse.json(
      {
        error: "Terjadi kesalahan pada server",
      },
      { status: 500 }
    );
  }
}