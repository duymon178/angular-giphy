export declare type GifID = string | number;

export interface User {
  about_bio: string;
  display_name: string;
  user_type: 'partner' | 'artist' | 'user' | 'anonymous';
  is_public: boolean;
  primary_site?: string;
  twitter: string;
  facebook: string;
  instagram: string;
  tumblr_site: string;
  twitter_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  tumblr_url?: string;
  website_url?: string;
  username: string;
  id: number;
  avatar_url: string;
  is_verified: boolean;
}

interface Rendition {
  width: number;
  height: number;
}

export interface Image extends Rendition {
  url: string;
  size?: string;
}

export interface MP4 extends Rendition {
  mp4: string;
  mp4_size: string;
}

export interface WebP {
  webp: string;
  webp_size: string;
}

export declare type ImageAllTypes = Image & WebP & MP4;

export interface Images {
  fixed_height_still: Image;
  original_still: Image;
  fixed_width: ImageAllTypes;
  fixed_height_small_still: Image;
  fixed_height_downsampled: Image & WebP;
  preview: Image;
  fixed_height_small: ImageAllTypes;
  downsized_still: Image;
  downsized: Image;
  downsized_large: Image;
  fixed_width_small_still: Image;
  preview_webp: Image;
  fixed_width_still: Image;
  fixed_width_small: ImageAllTypes;
  downsized_small: Image & MP4;
  fixed_width_downsampled: Image & WebP;
  downsized_medium: Image;
  original: ImageAllTypes;
  fixed_height: ImageAllTypes;
  looping: MP4;
  original_mp4: MP4;
  preview_gif: Image;
  '480w_still': Image;
}

interface BottleData {
  tid?: string;
  tags?: string[];
}

export interface Gif {
  type: 'video' | 'gif' | 'text';
  id: GifID;
  slug: string;
  url: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_indexable: boolean;
  is_sticker: boolean;
  import_datetime: string;
  trending_datetime: string;
  user: User;
  images: Images;
  title: string;
  is_hidden: boolean;
  is_scheduled: boolean;
  is_removed: boolean;
  tags: string[];
  bottle_data: BottleData;
  analytics_response_payload: string;
  emoji_group_id?: number;
  variation?: string;
  variation_count?: number;
  alt_text?: string;
}
