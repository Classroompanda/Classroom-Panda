package com.daycare.daycareteacher.ui.dashboard.messenging

import android.content.Context
import android.util.Log
import android.view.View
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.model.ChatHistoryModel
import com.daycare.daycareteacher.model.ChatListData
import com.daycare.daycareteacher.model.TeacherChatList
import com.daycare.daycareteacher.repository.ApiUtilis
import com.daycare.daycareteacher.repository.ErrorModel
import com.daycare.daycareteacher.repository.NetworkManager
import com.daycare.daycareteacher.repository.ServiceListener
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.showDialog

class MessageViewModel : ViewModel() {
    val isLoading = MutableLiveData<Boolean>()
    val teacherList = MutableLiveData<TeacherChatList>()
    val chatHistory = MutableLiveData<ChatHistoryModel>()

    fun getTeacherList(view: View) {
        if (isLoading.value != true) {
            isLoading.value = true
            val info = TeacherChatList()
            info.agencyID = AppInstance.getUser(view.context)?.agencyID
            info.teacherID =  AppInstance.getUser(view.context)?.releventUserID
            info.roleID = 4
            info.userID =   AppInstance.getUser(view.context)?.loginUserID
            val manager = NetworkManager()
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).getListForChat(info), object :
                ServiceListener<TeacherChatList> {
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
            val info = ChatData()
            info.senderuserid = AppInstance.getUser(context)?.loginUserID
            info.receiveruserid = otherUser.listUserId

            val manager = NetworkManager()
            manager.createApiRequest(ApiUtilis.getAPIService(context).getChatHistory(info), object :
                ServiceListener<ChatHistoryModel> {
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