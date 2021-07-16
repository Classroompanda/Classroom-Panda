package com.daycare.daycareteacher.ui.dashboard.adapter

import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.PostListRowBinding
import com.daycare.daycareteacher.model.PostActivityStudentData
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.PostActivityFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.PostActivityViewModel
import com.daycare.daycareteacher.utill.convertDate
import com.daycare.daycareteacher.utill.otherserverDate
import com.daycare.daycareteacher.utill.postActivityDate
import com.google.android.exoplayer2.ExoPlayerFactory
import com.google.android.exoplayer2.source.ProgressiveMediaSource
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory
import com.google.android.exoplayer2.util.Util

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
        binding.img1.clipToOutline = true
        binding.txtUsername.text=childrenList?.get(position)?.studentName
        binding.txtDate.text= convertDate(childrenList?.get(position)?.postedDate!!, otherserverDate, postActivityDate)
        holder.binding.txtFavouriteCount.text = childrenList?.get(position)?.totalLikes.toString()

        Glide.with(binding.userProfilePic.context)
            .load(childrenList?.get(position)?.imagePath)
            .asBitmap()
            .placeholder(R.drawable.ic_placeholder)
            .into(holder.binding.userProfilePic)

        if(childrenList?.get(position)?.isPublic!!){
            binding.imgWorld.setImageResource(R.drawable.ic_public)
            binding.commentRL.visibility=View.GONE
        } else{
            binding.imgWorld.setImageResource(R.drawable.ic_private)
            //   binding.commentRL.visibility=View.VISIBLE
            binding.txtCommentCount.text = childrenList?.get(position)?.postComment
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
                        try {
                            viewModel.deletePostActivity(
                                it,
                                Integer.valueOf(childrenList?.get(position)?.id!!),
                                position
                            )
                            childrenList!!.removeAt(position)
                            notifyDataSetChanged()
                        }catch (e:Exception){
                            e.printStackTrace()
                        }
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
                Glide.with(binding.img1.context)
                    .load(childrenList?.get(position)?.postActivityImages!![0].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img1)

                binding.img2.visibility=View.VISIBLE

                Glide.with(binding.img2.context)
                    .load(childrenList?.get(position)?.postActivityImages!![1].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img2)

                binding.img3.visibility=View.VISIBLE

                Glide.with(binding.img3.context)
                    .load(childrenList?.get(position)?.postActivityImages!![2].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img3)
            }

            else if(childrenList?.get(position)?.postActivityImages!!.size==2){
                Glide.with(binding.img1.context)
                    .load(childrenList?.get(position)?.postActivityImages!![0].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img1)

                binding.img2.visibility=View.VISIBLE

                Glide.with(binding.img2.context)
                    .load(childrenList?.get(position)?.postActivityImages!![1].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img2)
                binding.img3.visibility=View.GONE
            }
            else if(childrenList?.get(position)?.postActivityImages!!.size==1){
                Glide.with(binding.img1.context)
                    .load(childrenList?.get(position)?.postActivityImages!![0].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img1)

                binding.img3.visibility=View.GONE
                binding.img2.visibility=View.GONE
            }
        }else if(childrenList?.get(position)?.postActivityVideos?.size!! >0){
           // binding.img1.setImageResource(R.mipmap.ic_play)
            binding.img3.visibility=View.GONE
            binding.img2.visibility=View.GONE
            binding.img1.visibility = View.GONE
            binding.videoView.visibility =View.VISIBLE

            // val uri = Uri.fromFile(File(childrenList?.get(position)?.postActivityVideos?.get(0)?.vedioServerPath))
            try {
                // var mExoPlayerHelper: ExoPlayerHelper? = null
                var  simpleExoPlayer = ExoPlayerFactory.newSimpleInstance(binding.videoPlay.context)
                var  mediaDataSourceFactory = DefaultDataSourceFactory(binding.videoPlay.context, Util.getUserAgent(binding.videoView.context, "dayCare"))

                val mediaSource = ProgressiveMediaSource.Factory(mediaDataSourceFactory).createMediaSource(
                    Uri.parse(childrenList?.get(position)?.postActivityVideos?.get(0)?.vedioServerPath))

                simpleExoPlayer.prepare(mediaSource, false, false)
                simpleExoPlayer.playWhenReady = false

               // binding.videoPlay.setShutterBackgroundColor(Color.TRANSPARENT)
                binding.videoPlay.player = simpleExoPlayer
              //  binding.videoPlay.requestFocus()

                binding.frameView.setOnClickListener {
                    viewModel.onClickStudentCard(binding.videoView)
//                    val intent = Intent( binding.videoView.context, PostActivityDetailActivity::class.java)
//                    val data = childrenList?.get(position)
//                    intent.putExtra("data", data)
//                    binding.videoView.context.startActivity(intent)
                }

        }catch (e:Exception){
            e.printStackTrace()
        }
        }else{
            binding.img3.visibility=View.GONE
            binding.img2.visibility=View.GONE
            binding.img1.visibility = View.GONE
            binding.videoView.visibility =View.GONE
            binding.tvApproval.visibility= View.VISIBLE
        }
    }

    class BindingPostHolder(var binding: PostListRowBinding) : RecyclerView.ViewHolder(binding.postContainer)
}