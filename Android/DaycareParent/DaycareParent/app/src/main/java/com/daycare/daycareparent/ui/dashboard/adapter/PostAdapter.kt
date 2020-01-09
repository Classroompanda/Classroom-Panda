package com.daycare.daycareparent.ui.dashboard.adapter

import android.support.v7.app.AlertDialog
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.PostListRowBinding
import com.daycare.daycareparent.model.PostActivityStudentData
import com.daycare.daycareparent.ui.dashboard.fragments.postactivity.PostActivityFragment
import com.daycare.daycareparent.ui.dashboard.fragments.postactivity.PostActivityViewModel
import com.daycare.daycareparent.utill.*

class PostAdapter( var context: PostActivityFragment,
                   var childrenList: ArrayList<PostActivityStudentData>?,
                   var date: String) : RecyclerView.Adapter<PostAdapter.BindingPostHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindingPostHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: PostListRowBinding = PostListRowBinding.inflate(layoutInflater, parent, false)
        return BindingPostHolder(binding)
    }

    override fun getItemCount(): Int {
        return childrenList?.size!!
    }

    override fun onBindViewHolder(holder: BindingPostHolder, position: Int) {
        val binding = holder.binding


        val viewModel = PostActivityViewModel(childrenList?.get(position)!!, position)
        binding.viewModel = viewModel
        binding.img1.setClipToOutline(true)
        binding.txtUsername.text=childrenList?.get(position)?.studentName
        binding.txtDate.text= convertDate(childrenList?.get(position)?.postedDate!!, otherserverDate, postActivityDate)
        Glide.with(context).load(WebServices.IMAGE_URL +""+childrenList?.get(position)?.imagePath)
            .thumbnail(0.5f)
            .crossFade()
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .fitCenter()
            .error(R.drawable.ic_placeholder)
            .into(binding.userProfilePic)
        if(childrenList?.get(position)?.isPublic!!){
            binding.imgWorld.setImageResource(R.drawable.ic_public)
            binding.commentRL.visibility=View.GONE
        }
        else{
            binding.imgWorld.setImageResource(R.drawable.ic_private)
            binding.commentRL.visibility=View.VISIBLE
        }


        binding.imgOptionDelete.setOnClickListener {
            AlertDialog.Builder(it.context)
                .setTitle("Delete Activity")
                .setMessage("Are you sure you want to Delete?")
                .setPositiveButton(
                    "Yes"
                ) { dialog, id ->
                    run {
                        dialog.cancel()
                        //calenderViewModel.deleteEvent(eventList[position].id)
                        viewModel.deletePostActivity(it, Integer.valueOf(childrenList?.get(position)?.id!!), position)
                        childrenList!!.removeAt(position)
                      /*  if(AppInstance.postActivityDetailData?.size!!>1) {
                            AppInstance.postActivityDetailData?.removeAt(position)
                        }*/
                        notifyItemRemoved(position)
                    }
                }
                .setNegativeButton(
                    "No"
                ) { dialog, id -> dialog.cancel() }
                .show()

        }




        binding.txtShortDescription.text=childrenList?.get(position)?.postTitle
        binding.txtLongDescription.text=childrenList?.get(position)?.postDescription
        if(childrenList?.get(position)?.postActivityImages?.size!! >0){
            if(childrenList?.get(position)?.postActivityImages!!.size>2){
                Glide.with(context).load(childrenList?.get(position)?.postActivityImages!![0].imageServerPath)
                    .thumbnail(0.5f)
                    .crossFade()
                    .diskCacheStrategy(DiskCacheStrategy.ALL)
                    .fitCenter()
                    .error(R.drawable.ic_placeholder)
                    .into(binding.img1)

                binding.img2.visibility=View.VISIBLE

                Glide.with(context).load(childrenList?.get(position)?.postActivityImages!![1].imageServerPath)
                    .thumbnail(0.5f)
                    .crossFade()
                    .diskCacheStrategy(DiskCacheStrategy.ALL)
                    .fitCenter()
                    .error(R.drawable.ic_placeholder)
                    .into(binding.img2)
                binding.viewMoreBtn.text= (childrenList?.get(position)?.postActivityImages!!.size-2).toString()
            }

           else if(childrenList?.get(position)?.postActivityImages!!.size==2){
                Glide.with(context).load(childrenList?.get(position)?.postActivityImages!![0].imageServerPath)
                    .thumbnail(0.5f)
                    .crossFade()
                    .diskCacheStrategy(DiskCacheStrategy.ALL)
                    .fitCenter()
                    .error(R.drawable.ic_placeholder)
                    .into(binding.img1)

                binding.img2.visibility=View.VISIBLE

                Glide.with(context).load(childrenList?.get(position)?.postActivityImages!![1].imageServerPath)
                    .thumbnail(0.5f)
                    .crossFade()
                    .diskCacheStrategy(DiskCacheStrategy.ALL)
                    .fitCenter()
                    .error(R.drawable.ic_placeholder)
                    .into(binding.img2)
                binding.viewMoreBtn.visibility=View.GONE
            }
            else   if(childrenList?.get(position)?.postActivityImages!!.size==1){
                Glide.with(context).load(childrenList?.get(position)?.postActivityImages!![0].imageServerPath)
                    .thumbnail(0.5f)
                    .crossFade()
                    .diskCacheStrategy(DiskCacheStrategy.ALL)
                    .fitCenter()
                    .error(R.drawable.ic_placeholder)
                    .into(binding.img1)
                binding.viewMoreBtn.visibility=View.GONE

                binding.img2.visibility=View.GONE
            }
        }else{
            binding.img1.setImageResource(R.mipmap.ic_play)

            binding.viewMoreBtn.visibility=View.GONE

            binding.img2.visibility=View.GONE

        }



    }

    class BindingPostHolder(var binding: PostListRowBinding) : RecyclerView.ViewHolder(binding.postContainer)
}