package com.daycare.daycareparent.ui.dashboard.messenging

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.ListItemChatUiBinding
import com.daycare.daycareparent.model.ChatListData
import com.daycare.daycareparent.utill.BindingAdapters.Companion.loadImage
import com.daycare.daycareparent.utill.PreferenceConnector

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
        loadImage(binding.avatar, data.imagePath)
        binding.name.text = data.listUserName
        val currentUser = PreferenceConnector.readUser(context, PreferenceConnector.USER)?.loginUserID
        if (list[position].senderUserID == currentUser) {
            binding.mylayout.visibility = View.VISIBLE
            binding.theirLayout.visibility = View.GONE
        } else {
            binding.theirLayout.visibility = View.VISIBLE
            binding.mylayout.visibility = View.GONE

        }
    }

    class ChatBindHolder(var binding: ListItemChatUiBinding) : RecyclerView.ViewHolder(binding.chatContainer)

}