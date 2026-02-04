// import cron from "node-cron";
// import MembershipModel from "../models/MembershipModel.js";


// export const startMembershipCleanupJob = () => {
    
//     cron.schedule("0 2 * * *", async () => {
//         try{
//             const result = await MembershipModel.deleteMany({
//                 expairesAt: {$lt: new Date() },
//             });

//             console.log(
//                        `[CRON] Deleted ${result.deletedCount} expired memberships at ${new Date().toISOString()}`
 
//             );
//         } catch(error){
//            console.error("[CRON] Error cleaning memberships:", err);
//         }
//     })
// };