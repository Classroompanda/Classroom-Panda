package com.daycare.daycareteacher.services

import android.annotation.SuppressLint
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.TaskStackBuilder
import android.content.Context
import android.content.Intent
import android.media.RingtoneManager
import android.os.PowerManager
import android.util.Log
import androidx.core.app.NotificationCompat
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.SplashScreen
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class NotificationService : FirebaseMessagingService() {
    val TAG = "Service"

   /* override fun onNewToken(s: String?) {
        super.onNewToken(s)
        s?.let { Log.e("NEW_TOKEN", it) }
    }*/

   /*"notification": {
            "body": "Testing with direct FCM API",
             "title": "Test Message",
             "badge": 4,
             "sound": "default"
           }*/

    @SuppressLint("LogNotTimber")
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        Log.d(TAG, "From: " + remoteMessage!!.from!!)
        showNotification(
            this, SplashScreen::class.java,
            getString(R.string.app_name), remoteMessage.notification?.body.orEmpty(), 123
        )
        //        sendNotification(Objects.requireNonNull(remoteMessage.getNotification()).getTitle(), remoteMessage.getNotification().getBody());

        // Check if message contains a data payload.
        if (remoteMessage.data.isNotEmpty()) {
            Log.d(TAG, "Message data payload: " + remoteMessage.data)
            showNotification(
                this, SplashScreen::class.java,
                getString(R.string.app_name), remoteMessage.data?.get("title").toString(),123)
        }

        // Check if message contains a notification payload.
        if (remoteMessage.notification != null) {
            Log.d(TAG, "Message Notification Body: " + remoteMessage.notification?.title.orEmpty())
        }
    }

    fun showNotification(context: Context, cls: Class<*>, title: String, content: String, remainderId: Int) {
        val screenLock = (context.getSystemService(Context.POWER_SERVICE) as PowerManager).newWakeLock(
            PowerManager.SCREEN_BRIGHT_WAKE_LOCK or PowerManager.ACQUIRE_CAUSES_WAKEUP, "TAG:"
        )
        screenLock.acquire(10 * 60 * 1000L /*10 minutes*/)
        val alarmSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION)
        val notificationIntent = Intent(context, cls)
        notificationIntent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP

        val channelId = "channel-01"
        val channelName = context.getString(R.string.app_name)
        val importance = NotificationManager.IMPORTANCE_HIGH
        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            val mChannel = NotificationChannel(
                channelId, channelName, importance
            )
            notificationManager.createNotificationChannel(mChannel)
        }

        val stackBuilder = TaskStackBuilder.create(context)
        stackBuilder.addParentStack(cls)
        stackBuilder.addNextIntent(notificationIntent)
        val pendingIntent =
            stackBuilder.getPendingIntent(remainderId, PendingIntent.FLAG_UPDATE_CURRENT)

        val builder = NotificationCompat.Builder(context, channelId)
        val notification = builder.setContentTitle(title)
            .setContentText(content)
            .setAutoCancel(true)
            .setSound(alarmSound)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setPriority(NotificationCompat.PRIORITY_MAX)
//            .setContentIntent(pendingIntent)
            .build()

        notificationManager.notify(remainderId, notification)
        screenLock.release()

    }

}
