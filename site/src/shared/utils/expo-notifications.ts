//import { sendPushNotifications } from 'api/expo'


export const sendExpoPushNotifications = (
    expoPushTokens: string[], 
    title: string, 
    message: string
) => {
    var notifications: any[] = [];
    
    expoPushTokens.map((expoPushToken) => notifications.push({ 
            "to": expoPushToken, 
            "title": title, 
            "body": message, 
            "sound": "default" 
        })
    );
    
    //sendPushNotifications(notifications);
}