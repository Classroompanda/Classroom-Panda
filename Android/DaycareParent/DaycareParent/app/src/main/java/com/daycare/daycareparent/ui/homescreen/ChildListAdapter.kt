package com.daycare.daycareparent.ui.homescreen

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.ListItemChildBinding
import com.daycare.daycareparent.model.ParentChild
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareparent.utill.ADD_CHILD
import com.daycare.daycareparent.utill.OptionConstant.EDIT
import com.daycare.daycareparent.utill.PARENT_HOME
import com.daycare.daycareparent.utill.PreferenceConnector

class ChildListAdapter(
    var mNoOfchilds: ArrayList<ParentChild>,
    var context: Context,
    var state: Int

) : RecyclerView.Adapter<ChildListAdapter.ChildListBindingHolder>() {

    lateinit var item:ItemListener

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ChildListBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: ListItemChildBinding = ListItemChildBinding.inflate(layoutInflater, parent, false)
        return ChildListBindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return mNoOfchilds.size
    }

    override fun onBindViewHolder(holder: ChildListBindingHolder, position: Int) {
        val binding = holder.binding
        binding.model = mNoOfchilds[position]
        val parent = PreferenceConnector.readUser(context,PreferenceConnector.USER)
        binding.ChildC.setOnClickListener {
            if (state == PARENT_HOME) {
                PreferenceConnector.writeChildInfo(context, PreferenceConnector.CHILD, mNoOfchilds[position])
                context.startActivity(Intent(context, DashboardActivity::class.java))
                (context as Activity).finish()
            }else if(state == ADD_CHILD && !parent?.isGaurdian!!){
                item.onClickItem(mNoOfchilds[position])
            }
        }
    }

    fun listner(itemListener: ItemListener){
        item=itemListener
    }

    class ChildListBindingHolder(var binding: ListItemChildBinding) : RecyclerView.ViewHolder(binding.ChildC)

    interface ItemListener{
        fun onClickItem(item:ParentChild)
    }
}