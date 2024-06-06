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
      main_column: {
        Row: {
          category: string | null
          id: number
          iddd: number
          name: string | null
          price: number | null
          sku: number | null
          slug: string | null
        }
        Insert: {
          category?: string | null
          id?: number
          iddd?: number
          name?: string | null
          price?: number | null
          sku?: number | null
          slug?: string | null
        }
        Update: {
          category?: string | null
          id?: number
          iddd?: number
          name?: string | null
          price?: number | null
          sku?: number | null
          slug?: string | null
        }
        Relationships: []
      }
      sage_biook: {
        Row: {
          Author: string | null
          "Category 1": string | null
          "Category 2": string | null
          "Category 3": string | null
          Copyright: number | null
          Edition: string | null
          "Full Title": string | null
          "Full Title with Edition": string | null
          "image-src": string | null
          Price: number | null
          "Print ISBN-13": number
          Publisher: string | null
          Upsells: string | null
        }
        Insert: {
          Author?: string | null
          "Category 1"?: string | null
          "Category 2"?: string | null
          "Category 3"?: string | null
          Copyright?: number | null
          Edition?: string | null
          "Full Title"?: string | null
          "Full Title with Edition"?: string | null
          "image-src"?: string | null
          Price?: number | null
          "Print ISBN-13"?: number
          Publisher?: string | null
          Upsells?: string | null
        }
        Update: {
          Author?: string | null
          "Category 1"?: string | null
          "Category 2"?: string | null
          "Category 3"?: string | null
          Copyright?: number | null
          Edition?: string | null
          "Full Title"?: string | null
          "Full Title with Edition"?: string | null
          "image-src"?: string | null
          Price?: number | null
          "Print ISBN-13"?: number
          Publisher?: string | null
          Upsells?: string | null
        }
        Relationships: []
      }
      test_table: {
        Row: {
          active: boolean | null
          author: string | null
          description: string | null
          edition: string | null
          etext_isbn: number | null
          id: number
          image: string | null
          name: string | null
          price: number | null
          print_isbn: number | null
          publisher: string | null
          slug: string | null
          year: number | null
        }
        Insert: {
          active?: boolean | null
          author?: string | null
          description?: string | null
          edition?: string | null
          etext_isbn?: number | null
          id: number
          image?: string | null
          name?: string | null
          price?: number | null
          print_isbn?: number | null
          publisher?: string | null
          slug?: string | null
          year?: number | null
        }
        Update: {
          active?: boolean | null
          author?: string | null
          description?: string | null
          edition?: string | null
          etext_isbn?: number | null
          id?: number
          image?: string | null
          name?: string | null
          price?: number | null
          print_isbn?: number | null
          publisher?: string | null
          slug?: string | null
          year?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      main_column_view: {
        Row: {
          id: number | null
          name: string | null
          price: number | null
          sku: number | null
        }
        Insert: {
          id?: number | null
          name?: string | null
          price?: number | null
          sku?: number | null
        }
        Update: {
          id?: number | null
          name?: string | null
          price?: number | null
          sku?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
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
