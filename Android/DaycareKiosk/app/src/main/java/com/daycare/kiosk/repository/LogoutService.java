package com.daycare.kiosk.repository;


import android.app.Service;
import android.content.Intent;
import android.os.CountDownTimer;
import android.os.IBinder;
import android.util.Log;

public class LogoutService extends Service {
    public static CountDownTimer timer;
    @Override
    public void onCreate(){
        super.onCreate();
        timer = new CountDownTimer(1 *60 * 1000, 1000) {
            public void onTick(long millisUntilFinished) {
                //Some code
                Log.v("SERVICE START", "Service Started");
            }

            public void onFinish() {
                Log.v("SERVICE END", "Call Logout by Service");
                // Code for Logout
                stopSelf();
            }
        };
    }
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
