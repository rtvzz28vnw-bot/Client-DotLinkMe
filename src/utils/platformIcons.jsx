import React from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Globe,
  Link as LinkIcon,
  Music,
} from "lucide-react";

export const getPlatformIcon = (platform) => {
  const iconClass = "w-6 h-6 text-white";

  const icons = {
    phone: <Phone className={iconClass} />,
    email: <Mail className={iconClass} />,
    whatsapp: <MessageCircle className={iconClass} />,
    facebook: <Facebook className={iconClass} />,
    twitter: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: <Linkedin className={iconClass} />,
    instagram: <Instagram className={iconClass} />,
    youtube: <Youtube className={iconClass} />,
    github: <Github className={iconClass} />,
    website: <Globe className={iconClass} />,
    tiktok: <Music className={iconClass} />,
    snapchat: <MessageCircle className={iconClass} />,
    telegram: <MessageCircle className={iconClass} />,
    pinterest: <LinkIcon className={iconClass} />,
    reddit: <LinkIcon className={iconClass} />,
    discord: <MessageCircle className={iconClass} />,
    twitch: <Youtube className={iconClass} />,
    spotify: <Music className={iconClass} />,
  };

  return icons[platform] || <LinkIcon className={iconClass} />;
};
