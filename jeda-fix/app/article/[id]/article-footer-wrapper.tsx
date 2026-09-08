"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase/client';
// Ambil langsung dari folder article-footer-actions yang sudah kamu buat
import { ArticleFooterActions } from '../../../shared/components/molecule/article-footer-actions/article-footer-actions';

interface ArticleFooterWrapperProps {
  likes: number;
  comments: number;
}

export function ArticleFooterWrapper({ likes, comments }: ArticleFooterWrapperProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(Boolean(data.session?.user));
    });
  }, []);

  return (
    <ArticleFooterActions
      bookmarked={false}
      comments={comments}
      likes={localLikes}
      liked={liked}
      onBookmarkClick={() => {
        if (!isLoggedIn) window.location.href = '/login';
      }}
      onLikeClick={() => {
        if (!isLoggedIn) {
          window.location.href = '/login';
          return;
        }
        setLiked((value) => !value);
        setLocalLikes((value) => value + (liked ? -1 : 1));
      }}
      onReport={() => {
        if (isLoggedIn) console.log('Report diklik');
      }}
      onShare={() => console.log('Share diklik')}
      isLoggedIn={isLoggedIn}
    />
  );
}