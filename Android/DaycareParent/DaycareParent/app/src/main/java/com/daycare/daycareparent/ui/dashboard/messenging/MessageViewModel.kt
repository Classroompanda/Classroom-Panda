package com.daycare.daycareparent.ui.dashboard.messenging

import android.annotation.SuppressLint
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Context
import android.util.Log
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.model.ChatHistoryModel
import com.daycare.daycareparent.model.ChatListData
import com.daycare.daycareparent.model.ParentData
import com.daycare.daycareparent.model.TeacherChatList
import com.daycare.daycareparent.repository.ApiUtilis
import com.daycare.daycareparent.repository.ErrorModel
import com.daycare.daycareparent.repository.NetworkManager
import com.daycare.daycareparent.repository.ServiceListener
import com.daycare.daycareparent.utill.PreferenceConnector
import com.daycare.daycareparent.utill.showDialog

class MessageViewModel : ViewModel() {
    val isLoading = MutableLiveData<Boolean>()
    val teacherList = MutableLiveData<TeacherChatList>()
    val chatHistory = MutableLiveData<ChatHistoryModel>()

    fun getTeacherList(view: View) {
//        getTeacherListForChat
        if (isLoading.value != true) {
            isLoading.value = true
            val user = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)
            val info = TeacherChatList()
            info.agencyID = user?.agencyID
            info.parentID = user?.releventUserID
            info.roleID = 3
            val manager = NetworkManager()
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).getListForChat(info), object :
                ServiceListener<TeacherChatList> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: TeacherChatList, requestcode: Int) {
                    isLoading.value = false
                    teacherList.value = response
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showDialog(view.context, view.context.getString(R.string.app_name), error.error_message)
                    isLoading.value = false

                }
            })
        }
    }

    fun getChatHistory(context: Context, otherUser: ChatListData) {
        if (isLoading.value != true) {
            isLoading.value = true
            val user = PreferenceConnector.readUser(context, PreferenceConnector.USER)
            val info = ChatData()
            info.senderuserid = user?.loginUserID
            info.receiveruserid = otherUser.listUserId

            val manager = NetworkManager()
            manager.createApiRequest(ApiUtilis.getAPIService(context).getChatHistory(info), object :
                ServiceListener<ChatHistoryModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: ChatHistoryModel, requestcode: Int) {
                    isLoading.value = false
                    chatHistory.value = response
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showDialog(context, context.getString(R.string.app_name), error.error_message)
                    isLoading.value = false

                }
            })
        }
    }
}