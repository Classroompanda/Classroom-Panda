package com.daycare.daycareteacher.ui.dashboard.messenging

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.ListItemChatUiBinding
import com.daycare.daycareteacher.model.ChatListData
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.BindingAdapters.Companion.loadImage

class ChatAdapter(
    var context: Context,
    private var list: List<ChatHistoryData>,
    var data: ChatListData
) :
    RecyclerView.Adapter<ChatAdapter.ChatBindHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ChatBindHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: ListItemChatUiBinding = ListItemChatUiBinding.inflate(layoutInflater, parent, false)
        return ChatBindHolder(binding)
    }

    override fun getItemCount(): Int {
        return list.size
    }

    override fun onBindViewHolder(holder: ChatBindHolder, position: Int) {
        val binding = holder.binding
        binding.model = list[position]
        if(data.imagePath!=null){
            data.imagePath?.let { loadImage(binding.avatar, it) }
        }

        binding.name.text = data.listUserName
        val currentUser = AppInstance.loginResponse?.data//PreferenceConnector.readUser(context, PreferenceConnector.USER)?.loginUserID
        if (list[position].senderUserID == currentUser?.loginUserID) {
            binding.mylayout.visibility = View.VISIBLE
            binding.theirLayout.visibility = View.GONE
        } else {
            binding.theirLayout.visibility = View.VISIBLE
            binding.mylayout.visibility = View.GONE

        }
    }

    class ChatBindHolder(var binding: ListItemChatUiBinding) : RecyclerView.ViewHolder(binding.chatContainer)

}