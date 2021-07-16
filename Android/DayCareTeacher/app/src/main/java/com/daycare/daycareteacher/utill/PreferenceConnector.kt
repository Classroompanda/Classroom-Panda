package com.daycare.daycareteacher.utill
import android.content.Context
import android.content.SharedPreferences
import com.daycare.daycareteacher.model.LoginResponse
import com.daycare.daycareteacher.model.TeacherClassCheckInModel
import com.google.gson.Gson


/**
 *  this class is  uses for the storage using the Shared prefference class .
 *  It contain all the methods for the fetching and storing the values as per requirement
 */

class PreferenceConnector
{
    companion object {
        val MODE = Context.MODE_PRIVATE
        val PREF_NAME = "DayCare_V11"
        val ACCESS_TOKEN = "accesstoken"
        val isRemember = "remember_login"
        val USER_INFO = "user_info"
        val TEACHER_CHECKIN = "teacher_check_in"
        val TEACHER_ATTENDANCE_ID="teacherAttendanceId"


        fun writeUserInfo(context: Context, Key: String, user: LoginResponse.Data) {
            val gson = Gson()
            val infoData = gson.toJson(user)
            getEditor(context).putString(Key, infoData).commit()
        }

        fun readUser(context: Context, key: String): LoginResponse.Data? {
            val user: LoginResponse.Data
            if (getPreferences(context)?.contains(key)!!) {
                val gson = Gson()
                val lookupJson = getPreferences(context)?.getString(key, null)
                user = gson.fromJson<LoginResponse.Data>(lookupJson, LoginResponse.Data::class.java)
            } else
                return null
            return user
        }


        fun writeTeacherData(context: Context, Key: String, user: TeacherClassCheckInModel) {
            val gson = Gson()
            val infoData = gson.toJson(user)
            getEditor(context).putString(Key, infoData).commit()
        }

        fun readTeacherInfo(context: Context, key: String): TeacherClassCheckInModel? {
            val teacherCheckIn: TeacherClassCheckInModel
            if (getPreferences(context)?.contains(key)!!) {
                val gson = Gson()
                val lookupJson = getPreferences(context)?.getString(key, null)
                teacherCheckIn = gson.fromJson<TeacherClassCheckInModel>(lookupJson, TeacherClassCheckInModel::class.java)
            } else
                return null
            return teacherCheckIn
        }


        fun writeBoolean(context: Context, key: String, value: Boolean) {
            getEditor(context).putBoolean(key, value).commit()
        }

        fun readBoolean(context: Context, key: String, defValue: Boolean): Boolean {
            return getPreferences(context)!!.getBoolean(key, defValue)
        }

        fun writeInteger(context: Context, key: String, value: Int) {
            getEditor(context).putInt(key, value).commit()
        }

        fun readInteger(context: Context, key: String, defValue: Int): Int {
            return getPreferences(context)!!.getInt(key, defValue)
        }

        fun writeString(context: Context, key: String, value: String) {
            getEditor(context).putString(key, value).commit()
        }


        fun readString(context: Context, key: String, defValue: String): String? {
            return getPreferences(context)!!.getString(key, defValue)
        }


        fun writeFloat(context: Context, key: String, value: Float) {
            getEditor(context).putFloat(key, value).commit()
        }

        fun readFloat(context: Context, key: String, defValue: Float): Float {
            return getPreferences(context)!!.getFloat(key, defValue)
        }

        fun writeLong(context: Context, key: String, value: Long) {
            getEditor(context).putLong(key, value).commit()
        }

        fun readLong(context: Context, key: String, defValue: Long): Long {
            return getPreferences(context)!!.getLong(key, defValue)
        }

        fun getPreferences(context: Context?): SharedPreferences? {
            return context?.getSharedPreferences(PREF_NAME, MODE)
        }

        fun getEditor(context: Context): SharedPreferences.Editor {
            return getPreferences(context)!!.edit()
        }

        fun clearSharePreferenceKey(context: Context, key: String) {
            getPreferences(context)!!.edit().remove(key).commit()
        }
    }


}