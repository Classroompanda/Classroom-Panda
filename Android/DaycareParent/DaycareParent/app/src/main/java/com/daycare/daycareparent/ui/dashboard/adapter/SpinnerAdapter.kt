package com.daycare.daycareparent.ui.dashboard.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView
import com.bumptech.glide.Glide
import com.daycare.daycareparent.R
import com.daycare.daycareparent.model.ParentChild
import de.hdodenhof.circleimageview.CircleImageView

class SpinnerAdapter(val context: Context, var listItemsTxt: ArrayList<ParentChild>) : BaseAdapter() {


    val mInflater: LayoutInflater = LayoutInflater.from(context)

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        val view: View
        val vh: ItemRowHolder
        if (convertView == null) {
            view = mInflater.inflate(R.layout.custom_spinner_std, parent, false)
            vh = ItemRowHolder(view)
            view?.tag = vh
        } else {
            view = convertView
            vh = view.tag as ItemRowHolder
        }

        vh.label.text = listItemsTxt[position].firstName+" "+listItemsTxt[position].lastName
        Glide.with(view.context)
            .load(listItemsTxt[position].imagePath)
            .asBitmap()
            .placeholder(R.drawable.ic_placeholder)
            .into(vh.profile)

        return view
    }

    override fun getItem(position: Int): Any? {

        return null

    }

    override fun getItemId(position: Int): Long {

        return 0

    }

    override fun getCount(): Int {
        return listItemsTxt.size
    }

    private class ItemRowHolder(row: View?) {

        val label: TextView = row?.findViewById(R.id.text1) as TextView
        val profile: CircleImageView = row?.findViewById(R.id.stdImage) as CircleImageView
    }
}