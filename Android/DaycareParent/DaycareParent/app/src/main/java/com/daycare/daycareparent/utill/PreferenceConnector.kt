package com.daycare.daycareparent.utill
import android.content.Context
import android.content.SharedPreferences
import com.daycare.daycareparent.model.Data
import com.daycare.daycareparent.model.LoginResponse
import com.daycare.daycareparent.model.ParentChild
import com.google.gson.Gson


/**
 *  this class is  uses for the storage using the Shared prefference class .
 *  It contain all the methods for the fetching and storing the values as per requirement
 */

class PreferenceConnector
{
    companion object {
        val MODE = Context.MODE_PRIVATE
        val PREF_NAME = "DocsInk_V31"
        val ACCESS_TOKEN = "accesstoken"
        val isRemember = "remember_login"
        val USER ="user_data"
        val CHILD="child_data"


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
        fun writeUserInfo(context: Context, Key: String, user: Data) {
            val gson = Gson()
            val infoData = gson.toJson(user)
            getEditor(context).putString(Key, infoData).commit()
        }

        fun readUser(context: Context, key: String): Data? {
            val user: Data
            if (getPreferences(context)?.contains(key)!!) {
                val gson = Gson()
                val lookupJson = getPreferences(context)?.getString(key, null)
                user = gson.fromJson<Data>(lookupJson, Data::class.java)
            } else
                return null
            return user
        }
        fun writeChildInfo(context: Context, Key: String, user: ParentChild) {
            val gson = Gson()
            val infoData = gson.toJson(user)
            getEditor(context).putString(Key, infoData).commit()
        }

        fun readChild(context: Context, key: String): ParentChild? {
            val user: ParentChild
            if (getPreferences(context)?.contains(key)!!) {
                val gson = Gson()
                val lookupJson = getPreferences(context)?.getString(key, null)
                user = gson.fromJson<ParentChild>(lookupJson, ParentChild::class.java)
            } else
                return null
            return user
        }
    }


}