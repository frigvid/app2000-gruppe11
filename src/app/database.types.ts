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
					desc: string | null
					id: string
					name: string
					pgn: Json
					timestamp: string
				}
				Insert: {
					desc?: string | null
					id: string
					name: string
					pgn: Json
					timestamp?: string
				}
				Update: {
					desc?: string | null
					id?: string
					name?: string
					pgn?: Json
					timestamp?: string
				}
				Relationships: [
					{
						foreignKeyName: "openings_id_fkey"
						columns: ["id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			profiles: {
				Row: {
					display_name: string | null
					id: string
					updated_at: string | null
				}
				Insert: {
					display_name?: string | null
					id: string
					updated_at?: string | null
				}
				Update: {
					display_name?: string | null
					id?: string
					updated_at?: string | null
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
			opening_create: {
				Args: {
					opn_name: string
					opn_moves: Json
				}
				Returns: undefined
			}
			opening_delete: {
				Args: {
					opn_name?: string
				}
				Returns: undefined
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
