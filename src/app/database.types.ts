export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      friend_requests: {
        Row: {
          accepted: boolean | null
          by_user: string
          created_at: string | null
          id: string
          to_user: string
        }
        Insert: {
          accepted?: boolean | null
          by_user: string
          created_at?: string | null
          id?: string
          to_user: string
        }
        Update: {
          accepted?: boolean | null
          by_user?: string
          created_at?: string | null
          id?: string
          to_user?: string
        }
        Relationships: [
          {
            foreignKeyName: "friend_requests_by_user_fkey"
            columns: ["by_user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      friends: {
        Row: {
          friends_since: string | null
          id: string
          user1: string
          user2: string
        }
        Insert: {
          friends_since?: string | null
          id?: string
          user1: string
          user2: string
        }
        Update: {
          friends_since?: string | null
          id?: string
          user1?: string
          user2?: string
        }
        Relationships: [
          {
            foreignKeyName: "friends_user1_fkey"
            columns: ["user1"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friends_user2_fkey"
            columns: ["user2"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      gamedata: {
        Row: {
          draws: number | null
          losses: number | null
          userid: string
          wins: number | null
        }
        Insert: {
          draws?: number | null
          losses?: number | null
          userid: string
          wins?: number | null
        }
        Update: {
          draws?: number | null
          losses?: number | null
          userid?: string
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gamedata_userid_fkey"
            columns: ["userid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      history: {
        Row: {
          datetime: string
          fen: Json
          id: string
          player: string
          score: number
        }
        Insert: {
          datetime?: string
          fen: Json
          id?: string
          player: string
          score: number
        }
        Update: {
          datetime?: string
          fen?: Json
          id?: string
          player?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "history_player_fkey"
            columns: ["player"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          content: string | null
          created_by: string
          id: string
          is_published: boolean | null
          summary: string | null
          title: string
        }
        Insert: {
          content?: string | null
          created_by: string
          id: string
          is_published?: boolean | null
          summary?: string | null
          title: string
        }
        Update: {
          content?: string | null
          created_by?: string
          id?: string
          is_published?: boolean | null
          summary?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      openings: {
        Row: {
          created_by: string | null
          description: string
          id: string
          pgn: Json
          timestamp: string
          title: string
        }
        Insert: {
          created_by?: string | null
          description: string
          id?: string
          pgn: Json
          timestamp?: string
          title: string
        }
        Update: {
          created_by?: string | null
          description?: string
          id?: string
          pgn?: Json
          timestamp?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "openings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          about_me: string | null
          avatar_url: string | null
          display_name: string | null
          elo_rank: number | null
          id: string
          nationality: string | null
          updated_at: string | null
          visibility: boolean
          visibility_friends: boolean
        }
        Insert: {
          about_me?: string | null
          avatar_url?: string | null
          display_name?: string | null
          elo_rank?: number | null
          id: string
          nationality?: string | null
          updated_at?: string | null
          visibility?: boolean
          visibility_friends?: boolean
        }
        Update: {
          about_me?: string | null
          avatar_url?: string | null
          display_name?: string | null
          elo_rank?: number | null
          id?: string
          nationality?: string | null
          updated_at?: string | null
          visibility?: boolean
          visibility_friends?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          country: string | null
          id: string
          profile_is_public: boolean | null
          user_image: string | null
        }
        Insert: {
          country?: string | null
          id: string
          profile_is_public?: boolean | null
          user_image?: string | null
        }
        Update: {
          country?: string | null
          id?: string
          profile_is_public?: boolean | null
          user_image?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "settings_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      friend_get_all_friends: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          display_name: string
          elo_rank: number
          avatar_url: string
          nationality: string
        }[]
      }
      friend_is_friend: {
        Args: {
          other_user: string
        }
        Returns: boolean
      }
      friend_request_do_with: {
        Args: {
          from_user: string
          accept_request: boolean
        }
        Returns: undefined
      }
      friend_request_get_all: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          display_name: string
          avatar_url: string
        }[]
      }
      friend_request_send: {
        Args: {
          other_user: string
        }
        Returns: undefined
      }
      friend_request_status: {
        Args: {
          other_user: string
        }
        Returns: boolean
      }
      get_all_users: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          display_name: string
        }[]
      }
      opening_create: {
        Args: {
          opn_title: string
          opn_moves: Json
        }
        Returns: undefined
      }
      opening_delete: {
        Args: {
          opn_id?: string
        }
        Returns: undefined
      }
      opening_get: {
        Args: {
          opening_id: string
        }
        Returns: {
          opn_id: string
          opn_name: string
          opn_description: string
          opn_pgn: Json
          opn_timestamp: string
        }[]
      }
      profile_get: {
        Args: {
          usr_id: string
        }
        Returns: {
          display_name: string
          elo_rank: number
          avatar_url: string
          about_me: string
          nationality: string
          visibility: boolean
          visibility_friends: boolean
          wins: number
          losses: number
          draws: number
        }[]
      }
      profile_modify: {
        Args: {
          usr_avatar_url: string
          usr_display_name: string
          usr_about_me: string
          usr_nationality: string
          usr_visibility: boolean
        }
        Returns: undefined
      }
      search_user: {
        Args: {
          search_term: string
        }
        Returns: {
          id: string
          display_name: string
          avatar_url: string
        }[]
      }
      user_create: {
        Args: {
          email: string
          password: string
          isadmin: boolean
        }
        Returns: undefined
      }
      user_delete: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      user_gamedata_get: {
        Args: Record<PropertyKey, never>
        Returns: {
          draws: number | null
          losses: number | null
          userid: string
          wins: number | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
