import NotificationModal from "../models/NotificationModal.js";



export const getMyNotifications = async (req, res) => {

    const notifications = await NotificationModal.find({
        user: req.user._id
    }).sort({createdAt: -1})
      .limit(20);

    const unreadCount = await NotificationModal.countDocuments({
        user: req.user._id,
        isRead: false,
    });

    return res.json({notifications, unreadCount })
}


export const markAllAsRead = async (req, res) => {
    await NotificationModal.updateMany(
        {user: req.user._id, isRead: false },
        { $set: { isRead: true}}
    )
}