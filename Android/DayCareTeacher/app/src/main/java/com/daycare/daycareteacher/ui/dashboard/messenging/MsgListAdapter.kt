package com.daycare.daycareteacher.ui.dashboard.messenging

import android.content.Intent
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.FragmentMsgListBinding
import com.daycare.daycareteacher.databinding.ListItmMsgBinding
import com.daycare.daycareteacher.model.ChatListData
import com.daycare.daycareteacher.utill.BindingAdapters
import java.util.*
import kotlin.collections.ArrayList

class MsgListAdapter(var view: View, list: ArrayList<ChatListData>) :
    RecyclerView.Adapter<MsgListAdapter.MsgListBindHolder>() {

    val myList: ArrayList<ChatListData>? = list// for loading main list
    var arraylist: ArrayList<ChatListData>? = null  // for loading  filter data

    init {
        this.arraylist = ArrayList()
        myList?.let { this.arraylist!!.addAll(it) }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MsgListBindHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: ListItmMsgBinding = ListItmMsgBinding.inflate(layoutInflater, parent, false)
        return MsgListBindHolder(binding)
    }

    override fun getItemCount(): Int {
        return myList?.size!!
    }

    override fun onBindViewHolder(holder: MsgListBindHolder, position: Int) {
        val binding = holder.binding
        binding.model = myList?.get(position)
        if (position == myList?.size!! - 1) {
            binding.bottonLine.visibility = View.GONE
        } else {
            binding.bottonLine.visibility = View.VISIBLE
        }

        if(myList.get(position).count!! >0 ){
            binding.count.visibility = View.VISIBLE
            binding.count.text = myList.get(position).count.toString()

        }else{
            binding.count.visibility = View.GONE
        }

        if (myList.get(position).imagePath != null) {
            myList[position].imagePath?.let { BindingAdapters.loadImage(binding.profileImage, it) }
        }
        binding.container.setOnClickListener {
            val intent = Intent(view.context, MessageActivity::class.java)
            intent.putExtra("user", myList?.get(position))
            view.context.startActivity(intent)
        }
    }

    fun filter(charText: String) {
        val text = charText.toLowerCase(Locale.getDefault())

        myList?.clear()
        if (charText.isEmpty()) {
            arraylist?.let { myList?.addAll(it) }
        } else {
            if (arraylist != null) {
                for (wp in arraylist!!) {

                    if (wp.listUserName?.toLowerCase(Locale.getDefault())?.contains(text)!!) {
                        myList?.add(wp)
                    }

                }
            }
        }
        notifyDataSetChanged()
    }

    class MsgListBindHolder(var binding: ListItmMsgBinding) : RecyclerView.ViewHolder(binding.container)

}