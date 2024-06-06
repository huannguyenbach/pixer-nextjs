import supabase from "@/utils/supabase/supabaseClient";
import { NextApiRequest, NextApiResponse } from 'next';
import { API_ENDPOINTS } from "@/data/client/endpoints";

const viewCountTable = API_ENDPOINTS.VIEWS_COUNT_TABLE;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { productId } = req.body;
  
    // Check if the product is already in the view-count table
    let { data: viewCountData, error } = await supabase
      .from(viewCountTable)
      .select('*')
      .eq('product_id', productId);
  
    if (!viewCountData || viewCountData.length === 0) {
      // If the product is not in the table, insert a new record
      ({ data: viewCountData, error } = await supabase
        .from(viewCountTable)
        .insert([{ product_id: productId, views: 1 }]));
    } else {
      // If the product is in the table, increase the view count
      const newViews = (viewCountData[0] as any).views + 1;
      ({ data: viewCountData, error } = await supabase
        .from(viewCountTable)
        .update({ views: newViews })
        .eq('product_id', productId));
    }
  
    if (error) {
      console.error('Error updating view count:', error);
      return res.status(500).json({ error: 'Error updating view count' });
    }
  
    // Ensure viewCountData is not null before accessing its properties
    res.json({ views: viewCountData ? (viewCountData[0] as any).views : 0 });
  }
  