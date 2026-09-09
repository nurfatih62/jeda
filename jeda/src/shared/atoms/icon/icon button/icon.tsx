"use client";

import {
  ThumbsUp,
  Save,
  MessageSquare,
  Share2,
  Flag,
  Menu,
  Eye,
  EyeOff,
  Search,
  User,
  BookOpen,
  Pencil,
  ArrowLeft,
  Home,
  Heart,
  XCircle,
  Minus,
  ArrowLeftRight,
  Bell,
  ShieldAlert,
  MoreHorizontal,
  LayoutGrid,
  List,
  Quote,
  Check,
  Link,
  BarChart2,
  X,
  Image as ImageIcon,
  Plus,
} from "lucide-react";

export type IconVariant =
  | "like"
  | "save"
  | "comment"
  | "share"
  | "report"
  | "menu"
  | "eye"
  | "eyeOff"
  | "search"
  | "user"
  | "bookOpen"
  | "pencil"
  | "arrowLeft"
  | "home"
  | "heart"
  | "xCircle"
  | "minus"
  | "back"
  | "bell"
  | "shield"
  | "more"
  | "layoutGrid"
  | "list"
  | "quote"
  | "check"
  | "link"
  | "barChart"
  | "close"
  | "image"
  | "plus";

interface IconButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  variant?: IconVariant;
}

export function IconButton({
  active = false,
  disabled = false,
  onClick,
  ariaLabel = "IconButton",
  variant = "like",
}: IconButtonProps) {
  const isSaveVariant = variant === "save";
  const isReportVariant = variant === "report";
  
  // Varian yang mendukung state aktif/klik permanen hanyalah 'like' dan 'save'
  const hasActiveState = variant === "like" || variant === "save";

  // Penentuan kelas warna dengan hover 50% (/50)
  let defaultStroke = "stroke-icon-default";
  let hoverStroke = "group-hover:stroke-icon-default/50";
  let activeStroke = "";
  let activeFill = "";

  if (isSaveVariant) {
    defaultStroke = "stroke-icon-save-default";
    hoverStroke = "group-hover:stroke-icon-save-default/50";
    activeStroke = "stroke-icon-save-active";
    activeFill = "fill-icon-save-active-fill";
  } else if (isReportVariant) {
    defaultStroke = "stroke-icon-report-default";
    hoverStroke = "group-hover:stroke-icon-report-default/50";
    activeStroke = "stroke-icon-report-active";
    activeFill = "fill-icon-report-active-fill";
  } else if (variant === "like") {
    activeStroke = "stroke-icon-active";
    activeFill = "fill-icon-active-fill";
  }

  // Render ikon yang sesuai berdasarkan varian
  const renderIcon = () => {
    const props = {
      size: 24,
      strokeWidth: 2,
      className: `transition-colors duration-150 ${
        active && hasActiveState
          ? `${activeStroke} ${activeFill || "fill-transparent"}`
          : `${defaultStroke} fill-transparent`
      } ${hoverStroke}`,
    };

    switch (variant) {
      case "save":
        return <Save {...props} />;
      case "comment":
        return <MessageSquare {...props} />;
      case "share":
        return <Share2 {...props} />;
      case "report":
        return <Flag {...props} />;
      case "menu":
        return <Menu {...props} />;
      case "eye":
        return <Eye {...props} />;
      case "eyeOff":
        return <EyeOff {...props} />;
      case "search":
        return <Search {...props} />;
      case "user":
        return <User {...props} />;
      case "bookOpen":
        return <BookOpen {...props} />;
      case "pencil":
        return <Pencil {...props} />;
      case "arrowLeft":
        return <ArrowLeft {...props} />;
      case "home":
        return <Home {...props} />;
      case "heart":
        return <Heart {...props} />;
      case "xCircle":
        return <XCircle {...props} />;
      case "minus":
        return <Minus {...props} />;
      case "back":
        return <ArrowLeftRight {...props} />;
      case "bell":
        return <Bell {...props} />;
      case "shield":
        return <ShieldAlert {...props} />;
      case "more":
        return <MoreHorizontal {...props} />;
      case "layoutGrid":
        return <LayoutGrid {...props} />;
      case "list":
        return <List {...props} />;
      case "quote":
        return <Quote {...props} />;
      case "check":
        return <Check {...props} />;
      case "link":
        return <Link {...props} />;
      case "barChart":
        return <BarChart2 {...props} />;
      case "close":
        return <X {...props} />;
      case "image":
        return <ImageIcon {...props} />;
      case "plus":
        return <Plus {...props} />;
      case "like":
      default:
        return <ThumbsUp {...props} />;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={hasActiveState ? active : undefined}
      className="
        group
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-md
        p-2
        transition-all
        duration-150
        cursor-pointer
        hover:scale-105
        active:scale-95
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-icon-default
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {renderIcon()}
    </button>
  );
}