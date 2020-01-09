package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Intent
import android.net.Uri
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.PostDetailRowBinding
import com.daycare.daycareteacher.model.PostActivityStudentData
import com.daycare.daycareteacher.ui.dashboard.activities.PostActivityDetailActivity
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.LargeImageActivity
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.PostActivityViewModel

class PostActivityDetailAdapter(var context: PostActivityDetailActivity,
                                var parentPostition:Int,
                  var childrenList: ArrayList<PostActivityStudentData>?) : RecyclerView.Adapter<PostActivityDetailAdapter.BindPostActivityDetailHolder>() {


    override fun onBindViewHolder(holder: BindPostActivityDetailHolder, position: Int) {
        val binding = holder.binding


        val viewModel = PostActivityViewModel(childrenList?.get(parentPostition)!!, position)
        binding.viewModel = viewModel


        if(childrenList?.get(parentPostition)?.postActivityImages!!.size>0){
            binding.img1.visibility=View.VISIBLE
            binding.videoView.visibility=View.GONE
            binding.img1.clipToOutline = true
            Glide.with(context).load(childrenList?.get(parentPostition)?.postActivityImages!!.get(position).imageServerPath)
                .thumbnail(0.5f)
                .crossFade()
                .diskCacheStrategy(DiskCacheStrategy.ALL)
                .fitCenter()
                .placeholder(R.drawable.ic_menu_gallery)
                .into(binding.img1)

            binding.img1.setOnClickListener {
                val intent = Intent(it.context, LargeImageActivity::class.java)
                intent.putExtra("url", childrenList?.get(parentPostition)?.postActivityImages!!.get(position).imageServerPath)
                intent.putExtra("type", true)
                it.context.startActivity(intent)
            }
        }
        else if(childrenList!!.get(parentPostition).postActivityVideos?.size!! >0){
            binding.img1.visibility=View.GONE
//            binding.videoView.visibility=View.VISIBLE
//            binding.videoView.setVideoURI(Uri.parse(childrenList?.get(parentPostition)?.postActivityVideos!!.get(position).vedioServerPath));
        }


    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindPostActivityDetailHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: PostDetailRowBinding = PostDetailRowBinding.inflate(layoutInflater, parent, false)
        return BindPostActivityDetailHolder(binding)
    }

    override fun getItemCount(): Int {
        var listSize=0
        if(childrenList?.get(parentPostition)?.postActivityImages?.size!! >0) {
            listSize= childrenList?.get(parentPostition)?.postActivityImages?.size!!
        }
        else if(childrenList?.get(parentPostition)?.postActivityVideos?.size!! >0) {
            listSize= childrenList?.get(parentPostition)?.postActivityVideos?.size!!
        }
        return listSize
    }

    

    class BindPostActivityDetailHolder(var binding: PostDetailRowBinding) : RecyclerView.ViewHolder(binding.postContainer)
}


