import { getDashboardStatsService } from "../services/dashboard.service.js";

export async function getDashboardStats(req,res){
    try{
        const stats = await getDashboardStatsService();
        res.status(200).json({success: true, stats});
    }catch(err){
        res.status(500).json({ error : "Failed to fetch dashboard details"})
    }
}