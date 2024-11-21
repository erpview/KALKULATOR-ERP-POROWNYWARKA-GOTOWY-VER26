export interface Database {
  public: {
    Tables: {
      systems: {
        Row: {
          id: string;
          name: string;
          vendor: string;
          website: string;
          description: string;
          size: string[];
          finance: boolean | null;
          production: boolean | null;
          warehouse: boolean | null;
          crm: boolean | null;
          bi: boolean | null;
          hr: boolean | null;
          cloud: boolean | null;
          onpremise: boolean | null;
          hybrid: boolean | null;
          mobile: boolean | null;
          api: boolean | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['systems']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['systems']['Insert']>;
      };
    };
  };
}