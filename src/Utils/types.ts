export interface Verification {
  id: number;
  model_type: string;
  model_id: string;
  phone: string;
  id_type: string;
  audience_size: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  linked_url: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}
export interface Influencer {
  token: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_is_temporary: boolean;
  account_verfied: string;
  created_at: Date;
  updated_at: Date;
  role: string;
  number_of_tickets_sold: number;
  number_of_raffles_created: number;
  participants_reached: number;
  verification_detail?: Verification;
  account_verification_pending?: boolean;
}

export interface AccountVerification {
  id: 1;
  model_type: string;
  model_id: string;
  phone: string;
  id_type: string;
  audience_size: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  linked_url: string;
  created_at: Date;
  updated_at: Date;
  media: Media[];
}

export interface Media {
  collection_name: string;
  conversions_disk: string;
  created_at: Date;
  custom_properties: [];
  disk: string;
  file_name: string;
  generated_conversions: [];
  id: number;
  manipulations: [];
  mime_type: string;
  model_id: string;
  model_type: string;
  name: string;
  order_column: string;
  original_url: string;
  preview_url: string;
  responsive_images: [];
  size: string;
  updated_at: Date;
  uuid: string;
}

export interface Ticket {
  campaign_id: string;
  created_at: Date;
  id: number;
  status: string;
  ticket_prize: string;
  ticket_sale_cap: string;
  updated_at: Date;
}
export interface Campaign {
  id: number;
  title: string;
  user_id: string;
  number_of_winners: string;
  draw_type: string;
  description: string;
  recurent: string | null;
  start_date: Date;
  end_date: Date;
  brand_colors: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  media: Media[];
  influencer: Influencer;
  ticket: Ticket | null;
  tickets_sold: number;
  amount_raised: number;
  participants: any[];
  participants_count: string;
}

export interface Draws {
  id: number;
  title: string;
  user_id: string;
  number_of_winners: string;
  draw_type: string;
  description: string;
  recurent: string;
  start_date: Date;
  end_date: Date;
  brand_colors: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  participants_count: string;
  tickets_sold: number;
  amount_raised: number;
  ticket: Ticket | null;
  media: Media[];
}
