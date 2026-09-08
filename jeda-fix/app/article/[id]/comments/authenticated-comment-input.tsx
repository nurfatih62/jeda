"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase/client";
import { CommentInputBox } from "../../../../shared/components/molecule/comment-input-box/comment-input-box";

export function AuthenticatedCommentInput({ articleId }: { articleId: string }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(Boolean(data.session?.user));
    });
  }, []);

  async function submit(content: string) {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return;
    const { error } = await supabase.from("comments").insert({ article_id: articleId, author_id: user.id, content });
    if (error) {
      throw new Error(error.message);
    }
    router.refresh();
  }

  return <CommentInputBox placeholder="Note" isLoggedIn={isLoggedIn} onSubmit={submit} />;
}
